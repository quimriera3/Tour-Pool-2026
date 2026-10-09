import {timingSafeEqual} from 'node:crypto';
import {NextResponse} from 'next/server';
import {riders,stages,allCheckpoints,normalizeState,schedule} from '../../../lib/mallorca/logic';

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
 const combative={},aura={};for(const st of stages){if(validRider(input.combative[st.n]))combative[st.n]=input.combative[st.n];if(validRider(input.aura[st.n]))aura[st.n]=input.aura[st.n];}
 return {results,combative,aura,finalized:input.finalized};
}
export async function GET(){
 if(!isReady())return ok({shared:false,notice:'Mode demostració local. Cal configurar Supabase per compartir resultats en directe.'});
 try{
  const st=await db('mallorca_tour_state?select=state,updated_at&id=eq.2026&limit=1');
  return ok({shared:true,state:st[0]?.state||{},updatedAt:st[0]?.updated_at||null});
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
  return fail('Acció desconeguda.');
 }catch(e){console.error('[mallorca POST]',e.message);return fail('No s’han pogut desar les dades. Revisa la configuració de Supabase.',500);}
}
