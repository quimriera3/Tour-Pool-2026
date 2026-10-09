## Actualització v2.1 — correcció del mapa interactiu

- S'ha corregit una condició de carrera dels gestos d'arrossegament: les actualitzacions pendents del mapa ja no llegeixen la referència de gest un cop finalitzat.
- S'han limitat les actualitzacions de posició a un fotograma per animació, per reduir càrrega i evitar bloquejos en mòbil.
- El mapa ara té un límit d'errors independent. Si fallés, la resta de la web (resultats, classificacions, direcció, etc.) continua operativa i s'ofereix la descàrrega GPX.
- Evitem actualitzacions de mida redundants que provocaven renderitzats innecessaris.
- No es modifiquen els punts, corredors, etapes, resultats ni la base de dades.

**Instal·lació:** com sempre, desa una còpia de la web, substitueix les carpetes `app`, `components`, `lib` i `public` del repositori mantenint `.git`, `package.json`, `package-lock.json`, `next.config.mjs` i `.env.local`. Puja els canvis amb Git; no cal tornar a executar SQL.

---

# Mallorca Friends Tour 2026 · Live v2

**Lloc:** https://www.grandtourpool.com/ · **mateix domini, repositori GitHub i projecte Vercel que abans.** Aquesta versió *substitueix tota la web*, no crea `/mallorca` ni cap subdomini.

## Què inclou

- **8 corredors, sense sobrenoms:** Martí Álvarez, Albert Balcells, Lucas Iñigo, Jordi Pérez, Jan Álvarez, Víctor Heredero, Quim Riera i Uri.
- **3 etapes, 16 controls puntuables**, extrets dels tres GPX aportats. Tres GPX nous amb **19 waypoints** (16 controls + 3 sortides), a `public/gpx/etapa-{n}-controls.gpx`. El track original de cada etapa s'ha conservat íntegrament.
- **Mapa interactiu sobre carreteres OpenStreetMap:** traçat de l'etapa, categoria de cada port, esprint i meta. Conté botons d'ampliació, arrossegar i informació dels controls al tocar-los. © OpenStreetMap contributors.
- **Perfils de carretera** amb segments colorejats per pendent estimat: verd (0–3 %), groc (3–5 %), taronja (5–7 %), vermell (7–9 %) i granat (≥9 %). Calculats des de les elevacions del GPX amb suavitzat aproximat a 600 metres; no són dades oficials IGN per tram ni classificació UCI.
- Classificació general (mallot groc), punts (verd), muntanya (lunars), joves (blanc, ≤26), premi de la combativitat i **Aurímetre**.
- Combativitat i Aurímetre: **una persona premiada per etapa i categoria, 6 punts per premi a la general**. La votació es fa entre els corredors i Direcció publica el guanyador. No hi ha votació electrònica identificada, ni porra.
- Resultats compartits a Supabase quan està configurat, consulta de novetats cada 20 segons, informació d'etapa i mapa i descàrregues.

## INSTAL·LACIÓ: MATEIX MÈTODE DEL FINDER

1. **Guarda una còpia** de la carpeta actual `tour-pool` en una altra ubicació, fora de GitHub.
2. Descomprimeix aquest ZIP en una carpeta temporal i comprova que a l'arrel hi ha `app`, `components`, `lib`, `public`, `README.md` i `mallorca-supabase.sql`.
3. A la teva carpeta **original** `tour-pool` connectada amb GitHub, **elimina només** les quatre carpetes `app`, `components`, `lib` i `public`.
4. Copia les quatre noves carpetes al projecte. Copia també `README.md` i `mallorca-supabase.sql` substituint-los si ja existeixen.
5. **NO ELIMINIS**: `.git`, `.env.local`, `next.config.mjs`, `package.json`, `package-lock.json`, les configuracions ocultes o les altres dades que vulguis conservar.
6. Terminal: obre la carpeta del repositori i executa:

```bash
cd "/Users/quimriera/Desktop/Tour Pool 2026/GitHub/tour-pool" && git add -A app components lib public README.md mallorca-supabase.sql && git commit -m "Mallorca Live v2 - etapes, perfils i premis" && git push origin main
```

7. Espera que **Vercel** acabi el desplegament a `www.grandtourpool.com` (el mateix projecte).

## Com introduir i publicar resultats

1. Entra a `https://www.grandtourpool.com/#direccio` des del mòbil (o pestanya **Direcció de cursa**).
2. Tria **l'etapa i punt de control** (port, esprint, meta) i selecciona el nom del primer, segon, tercer, etc. Les places sense punts poden quedar buides.
3. Posa la contrasenya de Direcció (el valor **ADMIN_PASSWORD** ja configurat a Vercel).
4. Prem **PUBLICAR AL DIRECTE**. Els altres navegadors ho veuran al cap d'uns 20 segons com a màxim, si la web està activa i Supabase respon.
5. Després del dia, els **8 corredors voten entre ells** el més combatiu i el guanyador de l'**Aurímetre**. Trieu el guanyador de cada etapa als desplegables de les seccions 02 i 03 de Direcció i torneu a publicar.
6. Si t'equivoques, corregeix l'ordre o el premi i torna a publicar. **No cal entrar a Supabase per carregar resultats.**
7. Després de les tres metes, pots marcar la classificació com a definitiva i publicar.

## Supabase i seguretat

- La versió **reutilitza la mateixa taula** `public.mallorca_tour_state` de la versió anterior. Si ja vas executar `mallorca-supabase.sql` correctament **NO cal tornar-lo a executar**.
- Si encara no existeix la taula, executa `mallorca-supabase.sql` al SQL Editor del mateix projecte de Supabase. El fitxer és idempotent i no elimina dades.
- La web fa la lectura pública del directe a través de `/api/mallorca`, i les escriptures estan protegides per la contrasenya de Direcció al servidor.
- Es requereixen les variables ja existents `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (mai pública) i `ADMIN_PASSWORD` a Vercel. Si falten, la pàgina mostra mode local/demostració i les dades **NO** es comparteixen.
- La general d'aquesta volta és **per punts** i **NO per temps**, malgrat mantenir els noms dels mallots del Tour de França.

## Font de les altimetries

- Distància, recorregut, cotes, waypoints i perfil de les etapes: **GPX del grup**, sense fingir que són registres oficials o trams de l'IGN.
- Els trams acolorits representen la inclinació aproximada derivada del desnivell del GPX en finestres de ~600 m. Els inicis dels ports són estimats d'acord amb el traçat.
- Fitxes de contrast dels ports (no autoritat oficial UCI):
  - Coll de sa Batalla (Caimari): https://mallorcavelo.com/climbs/coll-de-sa-batalla-caimari/
  - Formentor / Coll de la Creueta: https://mallorcavelo.com/climbs/formentor-port-de-pollenca/
  - Sa Calobra, Puig Major i Coll de Sóller: https://www.mallorcacyclingcenter.com/routes/sa-calobra/
  - Coll d'Honor: https://www.mallorcacyclingcenter.com/routes/alcudia-puig-major/
  - Coll de sa Gramola: https://mallorcavelo.com/climbs/coll-de-sa-gramola-estellencs/
  - Coll de sa Creu: https://www.mallorcacyclingcenter.com/routes/sant-elm/
- **Les categories HC, 1a, 2a i 3a són escollides per aquesta volta, no oficials.** En particular, Coll d'en Claret i el Coll de sa Gramola es classifiquen 3a al reglament intern.
- **Esprints intermedis provisionals**: comprova que el punt és segur abans de disputar-lo. En cas de dubte, neutralitza'l i no concedeixis els punts. Respecteu senyals, trànsit i altres usuaris; mai s'ha de competir en baixada ni a les cruïlles.

## Verificació abans de publicar

- Sintaxi dels fitxers JSX/JS comprovada (sense errors de parseig).
- Lògica de punts provada amb resultats ficticis: premi d'etapa, muntanya, verd, combativitat i Aurímetre.
- GPX comprovats: 3 tracks originals i els 19 punts waypoint previstos.
- **No s'ha executat un `next build` real ni un desplegament Vercel en aquest entorn**; comprova l'estat final a Vercel després de fer el push.

Per recuperar la web anterior, tens la còpia guardada al Finder i l'historial de GitHub.
