# Mallorca Friends Tour 2026 — LIVE v4.1 · dos esprints provisionals

**WEB COMPLETA** per publicar amb el mateix domini, GitHub i Vercel.

## Modificacions respecte de la v4

- Retirat definitivament l'esprint del **km 91,5 / 57,1** (`e3-sprint`).
- Afegit **Esprint 1**, km **59,0** de la ruta llarga / **24,6** de la ruta furgoneta, abans d'Estellencs. Pendent aproximat en 1 km segons GPX: **−1,0 %**.
- Afegit **Esprint 2**, km **88,0** de la ruta llarga / **53,6** de la ruta furgoneta, entre es Capdellà i Calvià. Pendent aproximat en 1 km segons GPX: **0,0 %**.
- Els dos controls estan al mateix lloc geogràfic en els dos GPX i es troben dins del tram comú. Els dos esprints conserven el barem **8/5/3/2/1 punts** (1r–5è) cadascun.
- Conservats els **4 ports** de muntanya, la **meta puntuable comuna**, les classificacions, Aurímetre i combativitat.
- Perfils, mapes, Direcció de cursa i dos GPX d'etapa 3 actualitzats. Els GPX marcats contenen 9 waypoints cadascun (2 de pas, 4 ports, 2 esprints, 1 meta).

### Important: seguretat i validació

**No s'ha verificat in situ cap lloc per fer un esprint de grup.** La pendent i la rectitud són estimades a partir de la geometria del GPS; no permeten certificar absència de trànsit, cruïlles, sortides particulars, males condicions del ferm, amplada suficient ni visibilitat. Tots dos esprints són **candidats provisionals** que cal verificar. A les carreteres obertes al trànsit, **no feu esprints massius**; puntueu sense acceleracions o neutralitzeu-los. Només disputeu esprints si disposeu d'un entorn segregat del trànsit o una via tancada i segura.

### Resultats ja existents

L'ID antic `e3-sprint` deixa de puntuar perquè s'ha eliminat del reglament. Els dos nous IDs són `e3-sprint-1` i `e3-sprint-2`. Els registres antics no s'esborren de Supabase, però deixen de tenir efecte en les classificacions. Els nous s'introdueixen des de `/#direccio` (etapa 3). **No cal cap canvi a Supabase**.

## Publicació habitual amb Finder

1. Desa una còpia de la web anterior fora de GitHub.
2. Descomprimeix aquest ZIP fora del repositori.
3. Substitueix les quatre carpetes `app`, `components`, `lib` i `public` per les del ZIP. Copia també `README.md` i `mallorca-supabase.sql`.
4. No toquis `.git`, `package.json`, `package-lock.json`, `next.config.mjs` ni `.env.local`.
5. Des del Terminal:

```sh
cd "/Users/quimriera/Desktop/Tour Pool 2026/GitHub/tour-pool" && git add -A app components lib public README.md mallorca-supabase.sql && git commit -m "Mallorca Live v4.1 - dos esprints compartits" && git push origin main
```

**Un push de GitHub no implica necessàriament un desplegament a Vercel:** comprova el desplegament al projecte de sempre (ja havies tingut problemes amb l'activació automàtica).

No s'ha executat el build real a Vercel en aquest entorn.
