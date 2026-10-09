# MALLORCA FRIENDS TOUR 2026

**Grand Tour Pool · Edició especial · 10–12 d'octubre de 2026**

Una competició per a vuit amics: 3 etapes reals de Mallorca, mapa de tots els GPX, perfils altimètrics, 16 punts de control, cinc classificacions, vuit pronòstics per jugador i direcció de cursa privada.

**URL quan es publiqui:** `https://www.grandtourpool.com/mallorca`

## 1. Contingut del paquet

- `app/mallorca/page.js` — nova pàgina interactiva, íntegrament en català.
- `app/mallorca/mallorca.css` — identitat visual aïllada de la resta de Grand Tour Pool.
- `app/mallorca/logic.js` — 8 participants i regles de puntuació.
- `app/mallorca/data.json` — geometria reduïda dels 3 GPX, perfils i controls.
- `app/mallorca/api/route.js` — API Next.js per a porres i resultats, connectada a Supabase.
- `app/mallorca/layout.js` — metadades. La ruta no s'indexa a Google (joc privat).
- `public/mallorca/gpx/etapa-{1,2,3}.gpx` — descàrrega dels GPX originals.
- `mallorca-supabase.sql` — dues taules noves, independents de les dades del Mundial.

**No toca cap fitxer ni taula de la competició principal.** El joc es visita en una ruta pròpia `/mallorca`. No cal canviar les variables d'entorn si ja tens `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` i `ADMIN_PASSWORD` configurades a Vercel.

## 2. Pas imprescindible: SQL a Supabase

1. Entra al teu projecte actual de Supabase.
2. Ves a **SQL Editor → New query**.
3. Obre `mallorca-supabase.sql`, copia el text i prem **Run**. És una sola operació.
4. Això crea `mallorca_tour_state` i `mallorca_tour_picks` amb RLS actiu, sense polítiques públiques. Les consultes es fan des del servidor amb `SUPABASE_SERVICE_ROLE_KEY`.

Si et saltes aquest pas, la pàgina es pot obrir, però es mostrarà el **mode local/demostració** i cap resultat o aposta serà compartida entre dispositius.

## 3. Puja-ho a PRODUCCIÓ des del Terminal

Situa't al Terminal **a la carpeta del repositori de Grand Tour Pool**, la que conté `app`, `public`, `package.json` i el directori ocult `.git`.

Amb el ZIP descarregat a la carpeta `Downloads`, copia **AQUESTA ÚNICA LÍNIA**:

```bash
unzip -oq "$HOME/Downloads/mallorca-friends-tour-2026.zip" -d . && git add app/mallorca public/mallorca mallorca-supabase.sql README_MALLORCA.md && git commit -m "Add Mallorca Friends Tour 2026" && git push origin main
```

Aquesta línia **incorpora només** els fitxers de Mallorca i puja els canvis directament a la branca `main` de GitHub, que Vercel desplega a producció. **No sobreescriu `.git` ni la resta de la web.**

Si el Terminal no és dins el projecte, primer hi has d'entrar amb `cd` a la carpeta correcta; la ruta depèn d'on el tinguis al Mac.

La ruta serà `www.grandtourpool.com/mallorca` després que Vercel hagi desplegat el commit.

## 4. Funcionament del joc

### Classificacions

- **General (groc):** suma de tots els punts dels ports, esprints, metes i `6` punts per premi de combativitat.
- **Muntanya (lunars):** punts dels ports.
- **Regularitat (verd):** punts d'esprints intermedis i metes d'etapa.
- **Jove (blanc):** punts de la general entre els corredors de **26 anys o menys (inclosos)**. Elegibles: Martí, Uri, Quim, Albert, Lucas i Jordi. No elegibles: Víctor i Jan.
- **Més combatiu (vermell):** número de premis de combativitat adjudicats (1 per etapa), amb desempats per puntuació general.

Punts per posició:

| Tipus | 1r | 2n | 3r | 4t | 5è | 6è | 7è | 8è |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Meta | 25 | 18 | 12 | 8 | 5 | 3 | 2 | 1 |
| Esprint | 8 | 5 | 3 | 2 | 1 | — | — | — |
| Port HC | 15 | 10 | 7 | 5 | 3 | 2 | 1 | — |
| Port 1a | 12 | 8 | 5 | 3 | 2 | 1 | — | — |
| Port 2a | 8 | 5 | 3 | 2 | 1 | — | — | — |
| Port 3a | 5 | 3 | 2 | 1 | — | — | — | — |

**Desempats:** primer victòries d'etapa a la general; a muntanya, victòries als ports; a regularitat, victòries als esprints; després, punts de la general i dorsal. En aquesta edició la general és **a punts, no a temps**.

### Porra

- Guanyador de cadascuna de les 3 etapes: **20 punts** per encert (60 màxims).
- Guanyador de la general: **30**.
- Rei de muntanya: **15**.
- Guanyador de regularitat: **15**.
- Més combatiu: **10**.
- Millor jove: **10**.
- **TOTAL MÀXIM: 140 PUNTS.**

La gent participa sense crear un compte: **nom públic i PIN secret de 4–8 xifres**. Pot recuperar una porra pel nom i editar-la amb el PIN original mentre els pronòstics respectius estiguin oberts. Els PIN mai s'emmagatzemen en clar a Supabase: la API calcula un HMAC SHA-256 al servidor. Si canvies `ADMIN_PASSWORD` després de tenir apostes, els PIN antics deixaran de ser vàlids, perquè és també la clau d'aquest HMAC.

### Direcció

A la pestanya **Direcció**:
1. Selecciona un punt de control (port, esprint o meta) i introdueix els corredors segons l'ordre.
2. Assigna un premi de combativitat per etapa.
3. Tanca les apostes d'etapa i les finals **abans** que comencin els trams corresponents.
4. Introdueix la contrasenya que tens a `ADMIN_PASSWORD` i prem **Publicar resultats**.
5. En finalitzar el viatge, marca **Classificació final homologada** i publica. No es pot homologar abans d'haver introduït un guanyador a cadascuna de les tres metes.

La direcció **no tanca apostes automàticament** perquè els GPX no inclouen hores oficials de sortida. Fes-ho manualment.

### Punt de seguretat

La ubicació dels punts de muntanya es basa en el track i l'altimetria. **Els esprints intermedis proposats són provisionals**: l'organització ha de confirmar un tram adequat en persona abans de fer-los servir. Respecteu normes viàries i prioritat de seguretat. Eviteu esprints a cruïlles, dins de nuclis o amb trànsit; neutralitzeu qualsevol control insegur.

## 5. Distàncies extretes dels GPX

| Dia | Etapa | Distància | Desnivell positiu estimat | Punts de control |
|---|---|---:|---:|---:|
| Dissabte 10 | La primera mossegada | 126,8 km | 1.622 m | 5 |
| Diumenge 11 | El dia dels monstres | 132,0 km | 2.805 m | 6 |
| Dilluns 12 | L'últim assalt | 122,5 km | 1.682 m | 5 |
| **Total** | | **381,3 km** | **6.109 m** | **16** |

Els desnivells són estimacions de l'elevació GPX suavitzada (no mètrica oficial ni mesura d'un altímetre baromètric). L'ordre i els quilòmetres dels ports s'han seleccionat a partir dels perfils del track. Si l'itinerari del dia canvia sobre el terreny, s'ha d'ajustar el punt de control d'acord amb el grup.

## 6. Estat de validació

- Sintaxi validada amb parser JSX/JavaScript per als quatre fitxers JS.
- Full CSS validat amb PostCSS.
- Proves de puntuacions executades: 8 corredors, 6 joves, 3 etapes, 16 controls, bonus de combativitat, càlcul de general i pronòstics fins a 140 punts.
- GPX llegits i analitzats; previsualització visual estàtica comprovada a 1440px i 390px sense desbordament horitzontal.
- **No hi ha hagut una compilació `next build` amb el teu repositori remot exacte:** cal comprovar el desplegament real a Vercel després de pujar-lo.

