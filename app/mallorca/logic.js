import DATA from './data.json';

export const stages = DATA.stages;
export const riders = [
  {id:'martin',name:'Martí Álvarez',age:25,nick:'Martí van der Álvarez',pro:'Mathieu van der Poel',number:'01',short:'MA',color:'#D5FF64',line:'Si veu un forat, hi passa. Si no existeix, el fabrica.'},
  {id:'albert',name:'Albert Balcells',age:26,nick:'Alberto Balcellador',pro:'Alberto Contador',number:'02',short:'AB',color:'#99DAFF',line:'Pistoler del grup. Ataca assegut, dret i, sobretot, sense avisar.'},
  {id:'lucas',name:'Lucas Iñigo',age:26,nick:'Lucas Iñiglič',pro:'Primož Roglič',number:'03',short:'LI',color:'#FFA77F',line:'Expressió impassible. Ningú sap si pateix o prepara una emboscada.'},
  {id:'jordi',name:'Jordi Pérez',age:26,nick:'Jordi Pérezaert',pro:'Wout van Aert',number:'04',short:'JP',color:'#D6B6FF',line:'Puja, esprinta i roda. El problema és que ell també ho sap.'},
  {id:'jan',name:'Jan Álvarez',age:28,nick:'Jan Alaphilvárez',pro:'Julian Alaphilippe',number:'05',short:'JA',color:'#FFC876',line:'El xou està garantit. Que arribi amb forces ja és una altra cosa.'},
  {id:'victor',name:'Víctor Heredero',age:27,nick:'Víctor Heredegaard',pro:'Jonas Vingegaard',number:'06',short:'VH',color:'#83DBC7',line:'Silenci, mirada fixa i el ritme que fa saltar els fusibles.'},
  {id:'quim',name:'Quim Riera',age:26,nick:'Quim Rierapaz',pro:'Richard Carapaz',number:'07',short:'QR',color:'#FFA5BD',line:'Molta prèvia, molts watts promesos. Ara toca demostrar-ho.'},
  {id:'uri',name:'Uri',age:25,nick:'Uri Pogačuri',pro:'Tadej Pogačar',number:'08',short:'UR',color:'#F4F08C',line:'L’últim fitxatge arriba amb somriure i ganes de rebentar el guió.'}
];
export const riderById = id => riders.find(r => r.id === id);
export const youngRiders = riders.filter(r => r.age <= 26);
export const pointSchedules = {
  finish:[25,18,12,8,5,3,2,1],
  sprint:[8,5,3,2,1],
  HC:[15,10,7,5,3,2,1],
  '1a':[12,8,5,3,2,1],
  '2a':[8,5,3,2,1],
  '3a':[5,3,2,1]
};
export const COMBATIVE_POINTS = 6;
export const allCheckpoints = stages.flatMap(s => s.checkpoints.map(c => ({...c,stage:s.n})));
export const defaultState = () => ({results:{},combative:{},locks:{},finalized:false});
export const schedule = cp => pointSchedules[cp.kind==='mountain'?cp.cat:cp.kind] || [];
export function normalizeState(source) {
  const s = source && typeof source === 'object' ? source : {};
  return {results:s.results && typeof s.results === 'object' ? s.results : {},
          combative:s.combative && typeof s.combative === 'object' ? s.combative : {},
          locks:s.locks && typeof s.locks === 'object' ? s.locks : {},finalized:s.finalized === true};
}
export function standings(source) {
  const s=normalizeState(source);
  const data=Object.fromEntries(riders.map(r=>[r.id,{...r,total:0,mountain:0,regularity:0,combative:0,stageWins:0,mountainWins:0,sprintWins:0,podiums:0}]));
  for(const cp of allCheckpoints){
    const ids=Array.isArray(s.results[cp.id])?s.results[cp.id]:[];
    ids.forEach((id,i)=>{
      const r=data[id],p=schedule(cp)[i]||0;
      if(!r)return;
      r.total+=p;
      if(cp.kind==='mountain'){r.mountain+=p;if(i===0)r.mountainWins++;}
      if(cp.kind==='sprint'){r.regularity+=p;if(i===0)r.sprintWins++;}
      if(cp.kind==='finish'){r.regularity+=p;if(i===0)r.stageWins++;if(i<3)r.podiums++;}
    });
  }
  for(const id of Object.values(s.combative)) if(data[id]) {data[id].combative++;data[id].total+=COMBATIVE_POINTS;}
  const sort = (key,filter=()=>true,winKey='stageWins')=>Object.values(data).filter(filter).sort((a,b)=>b[key]-a[key]||b[winKey]-a[winKey]||b.total-a.total||a.number.localeCompare(b.number));
  return {general:sort('total'),mountain:sort('mountain',()=>true,'mountainWins'),regularity:sort('regularity',()=>true,'sprintWins'),combative:sort('combative'),young:sort('total',r=>r.age<=26),byId:data};
}
export function hasResults(state){return allCheckpoints.some(cp=>(state?.results?.[cp.id]||[]).length>0)||Object.keys(state?.combative||{}).length>0;}
export function completedStage(state,n){return Boolean((state?.results?.[`e${n}-finish`]||[]).length);}
export const PICK_PRIZES=[
  {field:'general',key:'general',points:30,label:'Guanyador de la general'},
  {field:'mountain',key:'mountain',points:15,label:'Rei de la muntanya'},
  {field:'regularity',key:'regularity',points:15,label:'Regularitat'},
  {field:'combative',key:'combative',points:10,label:'Més combatiu'},
  {field:'young',key:'young',points:10,label:'Millor jove'}
];
export function pickScore(p,state){
  const s=normalizeState(state), board=standings(s), details=[];let score=0;
  for(const st of stages){const winner=s.results[`e${st.n}-finish`]?.[0];const points=(winner&&p?.[`stage${st.n}`]===winner)?20:0;score+=points;details.push({label:`Etapa ${st.n}`,points,pending:!winner});}
  const finalized=s.finalized && stages.every(st=>completedStage(s,st.n));
  for(const prize of PICK_PRIZES){const winner=finalized && board[prize.key][0]?.[prize.key !== 'general' && prize.key !== 'young' ? prize.key : 'total']>0 ? board[prize.key][0]?.id : null;
    const points=winner&&p?.[prize.field]===winner?prize.points:0;score+=points;details.push({label:prize.label,points,pending:!winner});}
  return {score,details};
}
export function pickLeaderboard(picks,state){return [...(picks||[])].map(p=>({...p,...pickScore(p.picks,state)})).sort((a,b)=>b.score-a.score||a.nickname.localeCompare(b.nickname,'ca'));}
