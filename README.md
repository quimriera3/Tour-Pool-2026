# MALLORCA FRIENDS TOUR 2026 — LIVE v4 · Dues rutes d'etapa 3

Aquest ZIP és **la web completa** per substituir a `www.grandtourpool.com`, fent servir el mateix projecte Vercel, repositori GitHub i base de dades Supabase. **No és una porra**.

## Canvi v4 · Etapa 3 (12 d'octubre)

Dos GPX nous facilitats per l'organització, amb dos punts de sortida i dos finals diferents:

| Variant | Distància del GPX | D+ sumant increments d'altitud del GPX |
|---|---:|---:|
| Ruta llarga (`TC gay 3.gpx`) | 116,2 km | +1.486 m |
| Ruta furgoneta (`TC gay 3 furgo ride.gpx`) | 79,3 km | +1.416 m |

**Tram compartit en el mateix sentit:** aproximadament km 42,1–99,9 (ruta llarga) / km 7,7–65,5 (ruta furgoneta). Les distàncies i D+ provenen de les coordenades i altituds dels GPX, i poden diferir de Strava per suavitzat i mètode de càlcul.

### Controles puntuables comuns

| Control | Km llarga | Km furgoneta | Categoria i punts 1r |
|---|---:|---:|---|
| Coll des Vent | 47,0 | 12,6 | 3a · 5 pts |
| Es Grau | 64,8 | 30,4 | 3a · 5 pts |
| Coll de sa Gramola | 72,1 | 37,7 | 3a · 5 pts |
| Coll de n'Esteve | 83,4 | 49,0 | 3a · 5 pts |
| Esprint intermedi | 91,5 | 57,1 | 8 pts |
| Meta **puntuable** comuna | 96,5 | 62,1 | 25 pts |

**La meta puntuable no és el final del track**: després, cadascun segueix el seu recorregut en tram neutralitzat. S'ha fet així perquè tots disputin els punts junts. A la web es pot alternar el perfil de les dues rutes. El mapa representa els dos recorreguts i el tram comú en colors diferents. Els controls tenen les dues distàncies.

### Seguretat i reagrupament

La proposta d'esprint es troba en un tram que el GPX mostra com a relativament recte i pla, amb uns +0,5% en 1 km aproximadament. Hi ha 8 km aproximadament des del darrer port. **La geometria del GPX no confirma la seguretat real**: abans de disputar qualsevol control, cal comprovar cruïlles, visibilitat, trànsit i espai. En carreteres obertes amb trànsit, no feu esprints massius; neutralitzeu o traslladeu el control si no és segur. És imprescindible que el grup estigui reagrupat.

### Arxius GPX

- `public/gpx/etapa-3.gpx`: ruta llarga original sense marques
- `public/gpx/etapa-3-controls.gpx`: ruta llarga + 8 waypoints
- `public/gpx/etapa-3-furgoneta.gpx`: ruta furgoneta original
- `public/gpx/etapa-3-furgoneta-controls.gpx`: ruta furgoneta + 8 waypoints

Waypoints de cada GPX: inici del tram comú, 4 ports, esprint, meta puntuable, final del tram comú. Totes les marques són punts sobre les dues traces i en el mateix sentit.

## Publicació: el mètode del Finder de sempre

1. Desa fora de GitHub una còpia de la versió anterior de `tour-pool`.
2. Descomprimeix aquest ZIP fora del repositori.
3. Substitueix **només** `app`, `components`, `lib`, `public` per les carpetes del ZIP. Copia també `README.md` i `mallorca-supabase.sql` si ho desitges.
4. Mantén `.git`, `package.json`, `package-lock.json`, `next.config.mjs`, `.env.local` i la resta de configuracions originals.
5. Al Terminal, des de qualsevol ubicació:

```bash
cd "/Users/quimriera/Desktop/Tour Pool 2026/GitHub/tour-pool" && git add -A app components lib public README.md mallorca-supabase.sql && git commit -m "Mallorca Live v4 - dos recorreguts etapa 3" && git push origin main
```

6. Revisa Vercel → Deployments. **Un `git push` completat no confirma que Vercel hagi publicat la versió**, especialment si el webhook de GitHub no està funcionant. Si no es crea el desplegament, arregla la connexió Git o fes servir el Deploy Hook de producció que hagis creat per a `main` al mateix projecte Vercel.

La taula `mallorca_tour_state` existent no requereix una nova migració. Si la web mostra «Mode local / demo», les dades **no es comparteixen** entre mòbils.

### Com introduir resultats

Obre `https://www.grandtourpool.com/#direccio`. Tria el control de l'etapa 3, indica l'ordre dels vuit corredors, introdueix la contrasenya de Direcció i publica. Els resultats dels ports i esprint puntuen com abans. El final puntuable manté l'ID `e3-finish` perquè les classificacions existents el reconeguin. Els premis Aurímetre i combativitat continuen essent de 6 punts cadascun i es registren al final del dia.

### Informació tècnica

- Next.js i React del repositori existent; no s'afegeixen dependències noves.
- Les categories dels ports són regles internes de la competició, no categories oficials UCI.
- Fonts de contrast dels noms dels ports: MallorcaVelo (Coll des Vent), quaeldich (Es Grau, Gramola i n'Esteve) i OpenStreetMap.
- Altimetries: altitud i pendent derivats dels GPX, amb suavitzat per a la visualització.
- S'han comprovat les dues traces, l'equivalència espacial dels sis controls (separació 0 metres en els punts originals), els GPX amb waypoints i el recompte de puntuacions. **No s'ha executat un `next build` real en aquest entorn**, i Vercel s'ha de verificar després de la publicació.
