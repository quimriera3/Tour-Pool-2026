import DATA from './data.json';

export const stages = DATA.stages;
export const riders = [
  {id:'martin',name:'Martí Álvarez',age:25,number:'01',short:'MA',color:'#D5FF64'},
  {id:'albert',name:'Albert Balcells',age:26,number:'02',short:'AB',color:'#99DAFF'},
  {id:'lucas',name:'Lucas Iñigo',age:26,number:'03',short:'LI',color:'#FFA77F'},
  {id:'jordi',name:'Jordi Pérez',age:26,number:'04',short:'JP',color:'#D6B6FF'},
  {id:'jan',name:'Jan Álvarez',age:28,number:'05',short:'JA',color:'#FFC876'},
  {id:'victor',name:'Víctor Heredero',age:27,number:'06',short:'VH',color:'#83DBC7'},
  {id:'quim',name:'Quim Riera',age:26,number:'07',short:'QR',color:'#FFA5BD'},
  {id:'uri',name:'Uri',age:25,number:'08',short:'UR',color:'#F4F08C'}
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
export const AURA_POINTS = 6;
export const allCheckpoints = stages.flatMap(s => s.checkpoints.map(c => ({...c,stage:s.n})));
export const defaultState = () => ({results:{},combative:{},aura:{},finalized:false});
export const schedule = cp => pointSchedules[cp.kind==='mountain'?cp.cat:cp.kind] || [];
export function normalizeState(source) {
  const s = source && typeof source === 'object' ? source : {};
  return {results:s.results && typeof s.results === 'object' ? s.results : {},
          combative:s.combative && typeof s.combative === 'object' ? s.combative : {},
          aura:s.aura && typeof s.aura === 'object' ? s.aura : {},
          finalized:s.finalized === true};
}
export function standings(source) {
  const s=normalizeState(source);
  const data=Object.fromEntries(riders.map(r=>[r.id,{...r,total:0,mountain:0,regularity:0,combative:0,aura:0,stageWins:0,mountainWins:0,sprintWins:0,podiums:0}]));
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
  for(const id of Object.values(s.aura)) if(data[id]) {data[id].aura++;data[id].total+=AURA_POINTS;}
  const sort = (key,filter=()=>true,winKey='stageWins')=>Object.values(data).filter(filter).sort((a,b)=>b[key]-a[key]||b[winKey]-a[winKey]||b.total-a.total||a.number.localeCompare(b.number));
  return {general:sort('total'),mountain:sort('mountain',()=>true,'mountainWins'),regularity:sort('regularity',()=>true,'sprintWins'),combative:sort('combative'),aura:sort('aura'),young:sort('total',r=>r.age<=26),byId:data};
}
export function hasResults(state){return allCheckpoints.some(cp=>(state?.results?.[cp.id]||[]).length>0)||Object.keys(state?.combative||{}).length>0||Object.keys(state?.aura||{}).length>0;}
export function completedStage(state,n){return Boolean((state?.results?.[`e${n}-finish`]||[]).length);}

// Classificació específica de cada jornada: només els controls d'aquella etapa.
export function stageStandings(source, stageN) {
  const s = normalizeState(source);
  const scores = Object.fromEntries(riders.map(r => [r.id, {...r,points:0,mountain:0,sprint:0,finish:0,win:0}]));
  const checkpoints = stages.find(st => st.n === stageN)?.checkpoints || [];
  for (const cp of checkpoints) {
    (s.results[cp.id] || []).forEach((id, idx) => {
      const row = scores[id];
      if(!row) return;
      const points = schedule(cp)[idx] || 0;
      row.points += points;
      if (cp.kind === 'mountain') row.mountain += points;
      if (cp.kind === 'sprint') row.sprint += points;
      if (cp.kind === 'finish') {row.finish += points;if(idx === 0)row.win++;}
    });
  }
  const combative = s.combative[stageN];
  if (scores[combative]) scores[combative].points += COMBATIVE_POINTS;
  const aura = s.aura[stageN];
  if (scores[aura]) scores[aura].points += AURA_POINTS;
  return Object.values(scores).sort((a,b) => b.points-a.points || b.win-a.win || b.finish-a.finish || a.number.localeCompare(b.number));
}
