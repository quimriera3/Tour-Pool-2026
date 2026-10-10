# MALLORCA FRIENDS TOUR 2026 — LIVE v3.1 (desnivell revisat)

**Substitució completa de la web a `https://www.grandtourpool.com/`**. Reutilitza el mateix repositori GitHub, projecte Vercel, variables d'entorn i taula `mallorca_tour_state` de Supabase. **No és una porra.**

## Correcció v3.1

- Desnivell de l’etapa 2 corregit de +2.787 m a **+3.061 m**, calculat directament del GPX Strava sense suavitzat; perfil gràfic i punts de control idèntics a la v3. No afecta resultats ni classificacions.

## Canvis de v3

- Nova etapa 2 segons el GPX `Mallorca TC day 2 (1).gpx`: **132,6 km, +3.061 m** (suma dels increments positius d’altitud del GPX original de Strava; xifra coherent amb els ~3.000 m de Strava). La distància total passa a **381,9 km**. Per comparar: suavitzat de 50 m → 2.970 m, de 100 m → 2.888 m i de 200 m → 2.787 m. La xifra visible és la de l’arxiu original, no un valor homologat.
- L'ordre dels controls de l'etapa 2 canvia completament: **esprint al km 11,0** (pendent al voltant del 0,3% a 1 km), **Coll d'Orient (km 27,0 · 2a), Coll d'Honor (km 32,5 · 3a), Coll de Sóller (km 47,8 · 2a), Puig Major (km 72,5 · HC), Coll dels Reis (km 103,2 · HC) i meta a Búger (km 132,6)**. Els km són estimacions del track, les categories són pròpies del joc i poden canviar per acord del grup.
- Primera passada pel Coll dels Reis (km ~82,9) **marcada com a pas sense puntuació perquè és de baixada**. Només puntua la pujada de retorn des de Sa Calobra.
- L'esprint previst de l'etapa 3 s'avança al **km 20,0**, abans de la muntanya, sobre un tram de poc desnivell. El de l'etapa 1 no es modifica perquè la jornada ja s'ha disputat i no s'han de reescriure resultats passats.
- Nous GPX de les etapes 2 i 3 amb **waypoints de ports, esprints, metes i sortida**. L'etapa 2 conserva el GPX original proporcionat com a fitxer `etapa-2.gpx`; `etapa-2-controls.gpx` és la mateixa traça amb marques.
- Mapa interactiu més robust amb **pantalla completa**, moviments de ratolí/tàctils i marcadors de passos no puntuables; protecció d'errors independent de la resta de la web.
- Perfil i punts de control recalculats amb el GPX nou. Colors de pendent en les pujades, vista de cada etapa i font consultable per als ports.
- Panell de Direcció amb selecció inicial del dia actual i **control de versions**: si algú ha desat resultats en un altre dispositiu mentre editaves, evita que els sobreescriguis sense voler (cal actualitzar la pàgina i tornar a entrar-los).
- Textos, gramàtica, navegació, avisos de canvis sense desar, accessibilitat de controls i sumaris de recorregut revisats.

### Com interpretar els sprints

Els llocs estan **proposats geogràficament sobre el GPX; NO és possible confirmar a distància que la carretera sigui segura, recta, lliure de trànsit, sense obstacles o cruïlles**. Abans de l'etapa inspeccioneu el punt i decidiu si el feu, el moveu a un sector segur o el neutralitzeu. No disputeu esprints massius en carreteres obertes amb trànsit ni amb manca de visibilitat. Respecteu les normes de circulació i prioritzeu la seguretat.

### Com publicar resultats

1. Entra a `https://www.grandtourpool.com/#direccio`.
2. Selecciona el port, esprint o meta. Tria els corredors en ordre d'arribada en els desplegables.
3. Escriu la contrasenya de Direcció que ja tenies a Vercel (`ADMIN_PASSWORD`).
4. Prem **Publicar al directe**. Si és correcte, les altres pantalles rebran el canvi aproximadament en 20 segons quan estan obertes.
5. Després de cada jornada, publiqueu els dos premis votats: combativitat i Aurímetre (6 punts cadascun a la general).
6. Si la web avisa que hi ha una versió nova dels resultats, **no forcis la publicació**: refresca i torna a introduir el que encara no estava publicat.

La general és **per punts, NO per temps**, com ja es va acordar. Les classificacions són general/groc, punts/verd, muntanya/lunars, joves/blanc (≤26 anys), combativitat i Aurímetre. Les dades compartides es guarden al servidor quan Supabase està configurat; si es mostra «Mode local / demo», **no es comparteixen entre dispositius**.

## Instal·lació al Mac, mateix mètode de sempre

1. **Fes una còpia de seguretat** de tota la carpeta `tour-pool` actual en una ubicació separada.
2. Descomprimeix el ZIP de v3 fora del repositori.
3. Dins la teva carpeta de GitHub `tour-pool`, elimina **només** les carpetes antigues `app`, `components`, `lib`, `public` i substitueix-les per les quatre del ZIP. Copia també `README.md` i `mallorca-supabase.sql` si vols mantenir-los al projecte.
4. **Conserva** `.git`, `package.json`, `package-lock.json`, `next.config.mjs`, `.env.local` i les configuracions ocultes. No enganxis el ZIP com una carpeta interior.
5. Executa al Terminal (tota una sola línia):

```bash
cd "/Users/quimriera/Desktop/Tour Pool 2026/GitHub/tour-pool" && git add -A app components lib public README.md mallorca-supabase.sql && git commit -m "Mallorca Live v3.1 - desnivell etapa 2" && git push origin main
```

6. Revisa l'estat del desplegament a Vercel. No cal canviar ni DNS ni el domini. **No cal tornar a executar SQL** si la taula de Mallorca ja existeix.

## Fitxers i dependències

L'arrel del ZIP té: `app/`, `components/`, `lib/`, `public/`, `README.md`, `mallorca-supabase.sql`. Aquesta versió pressuposa la instal·lació de **Next.js 14 i React** que ja hi ha al repositori: no modifica `package.json`. Mapes sobre rajoles OpenStreetMap, sense dependència de Mapbox, Leaflet ni claus noves. Els fitxers GPX de control estan a `/public/gpx/etapa-N-controls.gpx`.

## Fonts dels ports

El desnivell del perfil i les coordenades de cada control provenen del GPX. Per validar els noms dels ascensos i el vessant de pujada s'han contrastat amb els perfils de MallorcaVelo:
- https://mallorcavelo.com/climbs/coll-d-orient-alaro/
- https://mallorcavelo.com/climbs/coll-d-honor-orient/
- https://mallorcavelo.com/climbs/coll-de-soller-bunyola/
- https://mallorcavelo.com/climbs/puig-major-soller/
- https://mallorcavelo.com/climbs/sa-calobra/

Aquests perfils externs no són resultats oficials UCI i els seus desnivells poden diferir dels calculats sobre el vostre track. Els trams per colors del perfil es calculen amb altituds del vostre GPX, no amb el model oficial de l'IGN.

## Verificació

Comprovats per codi els 3 GPX, la posició dels waypoints, el nombre de punts de control, les ordenacions i la sintaxi dels fitxers JSX/JS. També s'ha provat el càlcul de punts amb resultats ficticis. **No s'ha pogut executar un `next build` real per manca de dependències i accés al registre npm en aquest entorn.** Cal comprovar que el desplegament de Vercel finalitzi sense errors.
