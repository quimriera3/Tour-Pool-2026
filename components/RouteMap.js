'use client';
import {Component,useEffect,useMemo,useRef,useState} from 'react';

// Slippy map using OpenStreetMap raster tiles and local GPX coordinates; no extra npm dependency.
const TILE=256, MINZOOM=8, MAXZOOM=16;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const project=([lat,lon],z)=>{const scale=TILE*2**z;const s=Math.sin(lat*Math.PI/180);return [(lon+180)/360*scale,(.5-Math.log((1+s)/(1-s))/(4*Math.PI))*scale];};
const inv=(x,y,z)=>{const scale=TILE*2**z;return [Math.atan(Math.sinh(Math.PI*(1-2*y/scale)))*180/Math.PI, x/scale*360-180]};
const mark=c=>c.kind==='mountain'?c.cat:c.kind==='sprint'?'S':c.kind==='passage'?'·':'M';
const zoomFor=(stage,w,h)=>{const coords=[...stage.route,...stage.checkpoints.map(c=>c.coord),...(stage.landmarks||[]).map(c=>c.coord)];let z=MAXZOOM;for(;z>MINZOOM;z--){const pts=coords.map(p=>project(p,z));const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);if(Math.max(...xs)-Math.min(...xs)<w*.86 && Math.max(...ys)-Math.min(...ys)<h*.78)break;}return z;};
const centerOf=(stage,z)=>{const xy=stage.route.map(p=>project(p,z));return [(Math.min(...xy.map(p=>p[0]))+Math.max(...xy.map(p=>p[0])))/2,(Math.min(...xy.map(p=>p[1]))+Math.max(...xy.map(p=>p[1])))/2];};
/**
 * A route-map rendering error must never take down live results or the race website.
 * Remount the boundary when switching stages, so the next map still works.
 */
class RouteMapBoundary extends Component {
 constructor(props){super(props);this.state={failed:false};}
 static getDerivedStateFromError(){return {failed:true};}
 componentDidCatch(error){console.error('No s’ha pogut mostrar el mapa de Mallorca:',error);}
 render(){return this.state.failed ? <div className="mt-map-fallback" role="alert"><b>El mapa no està disponible ara mateix.</b><p>La resta de la web i les classificacions continuen funcionant. Pots consultar la ruta i els punts de control amb el GPX.</p><a href={`/gpx/etapa-${this.props.stageNumber}-controls.gpx`} download>Descarregar GPX amb ports i esprints</a></div> : this.props.children;}
}

export default function RouteMap({stage}){
 return <RouteMapBoundary key={stage.n} stageNumber={stage.n}><InteractiveRouteMap stage={stage}/></RouteMapBoundary>;
}

function InteractiveRouteMap({stage}){
 const container=useRef(null),drag=useRef(null),moveFrame=useRef(0),pendingMove=useRef(null);
 const [size,setSize]=useState([800,480]);const [view,setView]=useState({z:10,x:132000,y:99000});const [selected,setSelected]=useState(null);const [tileError,setTileError]=useState(false);const [expanded,setExpanded]=useState(false);
 useEffect(()=>{
  if(!container.current)return;
  const ro=new ResizeObserver(es=>{
   const r=es[0].contentRect;
   if(r.width>0&&r.height>0)setSize(old=>Math.abs(old[0]-r.width)<1&&Math.abs(old[1]-r.height)<1?old:[r.width,r.height]);
  });
  ro.observe(container.current);
  return ()=>ro.disconnect();
 },[]);
 useEffect(()=>()=>{if(moveFrame.current)cancelAnimationFrame(moveFrame.current);},[]);
 useEffect(()=>{if(!expanded)return;const escape=e=>{if(e.key==='Escape')setExpanded(false);};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape);},[expanded]);
 useEffect(()=>{const z=zoomFor(stage,...size);const [x,y]=centerOf(stage,z);setView({z,x,y});setSelected(null);setTileError(false);},[stage.n,size[0],size[1]]);
 const offset=[size[0]/2-view.x,size[1]/2-view.y];
 const route=useMemo(()=>stage.route.map((p,i)=>{const [x,y]=project(p,view.z);return `${i?'L':'M'}${(x+offset[0]).toFixed(1)},${(y+offset[1]).toFixed(1)}`}).join(' '),[stage,view,size]);
 const tiles=useMemo(()=>{const t=[];const x0=Math.floor((view.x-size[0]/2)/TILE)-1,x1=Math.ceil((view.x+size[0]/2)/TILE)+1,y0=Math.floor((view.y-size[1]/2)/TILE)-1,y1=Math.ceil((view.y+size[1]/2)/TILE)+1,n=2**view.z;
 for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++){if(ty<0||ty>=n)continue;t.push({x:tx,y:ty,src:`https://tile.openstreetmap.org/${view.z}/${((tx%n)+n)%n}/${ty}.png`,left:tx*TILE+offset[0],top:ty*TILE+offset[1]});}return t;},[view,size]);
 const zoom=delta=>{const z=clamp(view.z+delta,MINZOOM,MAXZOOM);if(z===view.z)return;const latlon=inv(view.x,view.y,view.z),[x,y]=project(latlon,z);setView({z,x,y});};
 // Use an immutable snapshot for each gesture. React can execute queued updates
 // after pointerup; reading drag.current from inside setState would then throw.
 const onDown=e=>{
  if(e.button!==0||e.isPrimary===false||e.target.closest?.('button,a'))return;
  drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,ox:view.x,oy:view.y};
  try{e.currentTarget.setPointerCapture(e.pointerId);}catch{/* Unsupported capture: ordinary drag still works. */}
 };
 const flushMove=()=>{
  moveFrame.current=0;
  const next=pendingMove.current;
  pendingMove.current=null;
  if(next)setView(prev=>({...prev,x:next.x,y:next.y}));
 };
 const onMove=e=>{
  const d=drag.current;
  if(!d||d.id!==e.pointerId)return;
  const next={x:d.ox-(e.clientX-d.x),y:d.oy-(e.clientY-d.y)};
  if(!Number.isFinite(next.x)||!Number.isFinite(next.y))return;
  pendingMove.current=next;
  if(!moveFrame.current)moveFrame.current=requestAnimationFrame(flushMove);
 };
 const onUp=e=>{
  const d=drag.current;
  if(!d||d.id!==e.pointerId)return;
  drag.current=null;
  if(moveFrame.current){cancelAnimationFrame(moveFrame.current);moveFrame.current=0;}
  const finalMove=pendingMove.current;
  pendingMove.current=null;
  if(finalMove)setView(prev=>({...prev,x:finalMove.x,y:finalMove.y}));
  try{if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}catch{}
 };
 const reset=()=>{drag.current=null;pendingMove.current=null;if(moveFrame.current){cancelAnimationFrame(moveFrame.current);moveFrame.current=0;}const z=zoomFor(stage,...size);const [x,y]=centerOf(stage,z);setView({z,x,y});};
 return <div className={"mt-osm-wrap"+(expanded?" mt-osm-fullscreen":"")}><div className="mt-osm" ref={container} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onLostPointerCapture={onUp} role="group" aria-label={`Mapa interactiu de l'etapa ${stage.n}, amb carreteres d'OpenStreetMap, recorregut i punts de control`}>
  <div className="mt-osm-background"/>
  {tiles.map(t=><img loading="lazy" draggable="false" key={`${view.z}:${t.x}:${t.y}`} src={t.src} alt="" onError={()=>setTileError(true)} className="mt-osm-tile" style={{left:t.left,top:t.top}}/>)}
  <svg className="mt-osm-overlay" width="100%" height="100%" aria-hidden="true"><path d={route} fill="none" stroke="#ffffff" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round"/><path d={route} fill="none" stroke="#d4ff47" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round"/></svg>
  {(()=>{const [x,y]=project(stage.route[0],view.z);return <div className="mt-osm-start" style={{left:x+offset[0],top:y+offset[1]}} title="Sortida de l’etapa">INICI</div>;})()}
  {[...stage.checkpoints,...(stage.landmarks||[])].map(cp=>{const [x,y]=project(cp.coord,view.z);return <button title={`${cp.name} · km ${cp.km} · ${cp.kind==='mountain'?'categoria '+cp.cat:cp.kind==='sprint'?'esprint':cp.kind==='passage'?'pas sense punts':'meta'}`} key={cp.id} type="button" className={`mt-osm-marker ${cp.kind} ${selected===cp.id?'selected':''}`} style={{left:x+offset[0],top:y+offset[1]}} onPointerDown={e=>e.stopPropagation()} onClick={()=>setSelected(selected===cp.id?null:cp.id)}><span>{mark(cp)}</span></button>;})}
  {(()=>{const cp=[...stage.checkpoints,...(stage.landmarks||[])].find(c=>c.id===selected);if(!cp)return null;const [x,y]=project(cp.coord,view.z);return <div className="mt-osm-tooltip" style={{left:clamp(x+offset[0],130,size[0]-130),top:clamp(y+offset[1]-25,65,size[1]-90)}}><button type="button" aria-label="Tancar el detall" onClick={()=>setSelected(null)}>×</button><b>{cp.name}</b><small>KM {cp.km} · {cp.kind==='mountain'?`PORT ${cp.cat}`:cp.kind==='sprint'?'ESPRINT INTERMEDI':cp.kind==='passage'?'PAS NO PUNTUABLE':'ARRIBADA'} · {cp.ele} M</small>{cp.climb&&<small>{cp.climb.lengthKm} km aprox. · {cp.climb.avgGrade.toFixed(1).replace('.',',')} % mitjà al GPX</small>}</div>;})()}
  {tileError&&<div className="mt-osm-warning">No s'han pogut carregar totes les rajoles del mapa. El recorregut i els controls continuen disponibles.</div>}
  <div className="mt-osm-controls"><button type="button" onPointerDown={e=>e.stopPropagation()} onClick={()=>setExpanded(v=>!v)} aria-label={expanded?'Tancar mapa ampliat':'Ampliar mapa a pantalla completa'} title={expanded?'Tancar pantalla completa (Esc)':'Pantalla completa'}>{expanded?'×':'⛶'}</button><button type="button" onPointerDown={e=>e.stopPropagation()} onClick={()=>zoom(1)} aria-label="Ampliar mapa">+</button><button type="button" onPointerDown={e=>e.stopPropagation()} onClick={()=>zoom(-1)} aria-label="Allunyar mapa">−</button><button type="button" onPointerDown={e=>e.stopPropagation()} onClick={reset} aria-label="Mostrar tot el recorregut">⤢</button></div>
  <div className="mt-osm-attribution">© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors</div>
 </div><div className="mt-osm-legend"><span><i className="mt-map-line"/> Recorregut</span><span><i className="mt-map-dot mountain"/> Ports (categoria)</span><span><i className="mt-map-dot sprint"/> Esprint</span><span><i className="mt-map-dot finish"/> Meta</span>{(stage.landmarks||[]).length>0&&<span><i className="mt-map-dot passage"/> Pas sense punts</span>}<span className="mt-osm-help">Arrossega per moure · +/− per ampliar · Pantalla completa · Prem un control per veure'n el detall</span></div></div>;
}
