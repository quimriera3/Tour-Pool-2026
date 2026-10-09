export default function NotFound() {
  return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#102D2F',color:'#F4F3E9',fontFamily:'Arial,sans-serif',padding:24}}>
    <div style={{textAlign:'center'}}>
      <p style={{letterSpacing:4,color:'#D9FB74',fontSize:12,fontWeight:900}}>MALLORCA FRIENDS TOUR · 2026</p>
      <h1 style={{fontSize:'clamp(42px,8vw,90px)',lineHeight:1,margin:'16px 0'}}>Fora de ruta.</h1>
      <p>Aquest enllaç ja no existeix. La cursa continua a la portada.</p>
      <a href="/" style={{display:'inline-block',padding:'16px 23px',background:'#D9FB74',color:'#102D2F',fontWeight:900,textDecoration:'none',marginTop:20}}>TORNAR A LA CURSA ↗</a>
    </div>
  </main>;
}
