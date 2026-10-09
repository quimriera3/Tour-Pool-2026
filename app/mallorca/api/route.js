import {createHmac,timingSafeEqual} from 'node:crypto';
import {NextResponse} from 'next/server';
import {riders,stages,allCheckpoints,normalizeState,schedule,youngRiders} from '../logic';

export const dynamic='force-dynamic';
const noCache={'Cache-Control':'no-store'};
const fail=(error,status=400)=>NextResponse.json({ok:false,error},{status,headers:noCache});
const ok=payload=>NextResponse.json({ok:true,...payload},{headers:noCache});
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
const password=process.env.ADMIN_PASSWORD;
const isReady=()=>Boolean(url&&key&&password);
const equal=(a,b)=>{if(typeof a!=='string'||typeof b!=='string')return false;const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y);};
const headers=()=>({'apikey':key,'Authorization':`Bearer ${key}`,'Content-Type':'application/json'});
async function db(path,opts={}) {
 const response=await fetch(`${url.replace(/\/$/,'')}/rest/v1/${path}`,{...opts,headers:{...headers(),...opts.headers},cache:'no-store'});
 if(!response.ok)throw new Error(`Supabase ${response.status}: ${(await response.text()).slice(0,160)}`);
 const str=await response.text();return str?JSON.parse(str):[];
}
const validRider=id=>riders.some(r=>r.id===id);
const cleanPick=src=>{
 if(!src||typeof src!=='object')return {};
 const fields=['stage1','stage2','stage3','general','mountain','regularity','combative','young'];
 return Object.fromEntries(fields.filter(f=>validRider(src[f])&&(f!=='young'||youngRiders.some(r=>r.id===src[f]))).map(f=>[f,src[f]]));
};
function cleanState(src){
 const input=normalizeState(src),results={};
 for(const cp of allCheckpoints){
  const source=Array.isArray(input.results[cp.id])?input.results[cp.id]:[],seen=new Set();
  const order=Array.from({length:schedule(cp).length},(_,i)=>{
   const id=source[i];if(!validRider(id)||seen.has(id))return '';
   seen.add(id);return id;
  });
  while(order.length&&!order[order.length-1])order.pop();
  if(order.length)results[cp.id]=order;
 }
 const combative={};for(const st of stages){if(validRider(input.combative[st.n]))combative[st.n]=input.combative[st.n];}
 const locks={};for(const k of ['stage1','stage2','stage3','final'])locks[k]=input.locks[k]===true;
 return {results,combative,locks,finalized:input.finalized};
}
const safeNick=s=>String(s||'').normalize('NFKC').trim().replace(/\s+/g,' ').slice(0,26);
const pinHash=(name,pin)=>createHmac('sha256',password).update(`mallorca-v1|${name.toLocaleLowerCase('ca')}|${pin}`).digest('hex');

export async function GET(){
 if(!isReady())return ok({shared:false,notice:'Mode demostració local. Configura Supabase i executa la migració SQL.'});
 try{
  const [st,ps]=await Promise.all([db('mallorca_tour_state?select=state&id=eq.2026&limit=1'),db('mallorca_tour_picks?select=nickname,picks,updated_at&order=nickname.asc')]);
  return ok({shared:true,state:st[0]?.state||{},picks:ps||[]});
 }catch(e){console.error('[mallorca GET]',e.message);return ok({shared:false,notice:'La base de dades no està preparada. Executa la migració SQL.'});}
}

export async function POST(request){
 if(!isReady())return fail('Cal configurar Supabase, ADMIN_PASSWORD i les taules SQL.',503);
 let body;
 try{const raw=await request.text();if(raw.length>25000)return fail('La petició és massa gran.',413);body=JSON.parse(raw);}catch{return fail('Dades no vàlides.');}
 try{
  if(body?.action==='admin'){
   if(!equal(body.password,password))return fail('Contrasenya de direcció incorrecta.',401);
   const state=cleanState(body.state);
   if(state.finalized&&!stages.every(st=>state.results[`e${st.n}-finish`]?.[0]))return fail('No es pot homologar la general sense completar les tres metes.');
   await db('mallorca_tour_state?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify([{id:'2026',state,updated_at:new Date().toISOString()}])});
   return ok({state});
  }
  if(body?.action==='pick'){
   const nickname=safeNick(body.nickname),pin=String(body.pin||'');
   if(nickname.length<2||nickname.length>26)return fail('El nom ha de tenir entre 2 i 26 caràcters.');
   if(!/^\d{4,8}$/.test(pin))return fail('Introdueix un PIN numèric de 4 a 8 xifres.');
   const pick=cleanPick(body.picks),hash=pinHash(nickname,pin);
   const [rows,previous]=await Promise.all([
    db('mallorca_tour_state?select=state&id=eq.2026&limit=1'),
    db(`mallorca_tour_picks?select=nickname,pin_hash,picks&nickname=eq.${encodeURIComponent(nickname)}&limit=1`)
   ]);
   const state=normalizeState(rows[0]?.state),prior=previous[0];
   if(prior&&!equal(prior.pin_hash,hash))return fail('Nom ocupat o PIN incorrecte. Utilitza el PIN original.',403);
   if(state.finalized)return fail('La porra final ja està tancada.',403);
   for(const st of stages){const field=`stage${st.n}`;if(state.locks[field]&&pick[field]!==prior?.picks?.[field])return fail(`Les apostes de l’etapa ${st.n} estan tancades.`,403);}
   if(state.locks.final&&['general','mountain','regularity','combative','young'].some(f=>pick[f]!==prior?.picks?.[f]))return fail('Els pronòstics finals estan tancats.',403);
   await db('mallorca_tour_picks?on_conflict=nickname',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify([{nickname,pin_hash:hash,picks:pick,updated_at:new Date().toISOString()}])});
   return ok({nickname,picks:pick});
  }
  return fail('Acció desconeguda.');
 }catch(e){console.error('[mallorca POST]',e.message);return fail('No s’han pogut desar les dades. Revisa la configuració de Supabase.',500);}
}
