# Mallorca Friends Tour 2026 — classificacions en directe

Aquesta versió **SUBSTITUEIX TOTA LA WEB** publicada a www.grandtourpool.com, fent servir el mateix repositori de GitHub i el mateix Vercel. Sense porra: només classificacions en directe.

## Instruccions Finder (mateix mètode de sempre)

1. Fes una còpia de seguretat de tota la carpeta local `tour-pool` i guarda-la fora del repositori.
2. A la carpeta ORIGINAL `tour-pool` connectada a GitHub, elimina **només** les quatre carpetes `app`, `components`, `lib`, `public`. **No esborris `.git`, `.env.local`, `package.json`, `package-lock.json`, `next.config.mjs`**.
3. Descomprimeix aquest ZIP en una carpeta a part i arrossega les quatre carpetes noves `app`, `components`, `lib`, `public` a dins de `tour-pool`. Copia també `README.md` i `mallorca-supabase.sql` (substituint-los si ja existeixen).
4. Obre Terminal a la carpeta `tour-pool` i executa `git add -A app components lib public README.md mallorca-supabase.sql && git commit -m "Mallorca live 2026 - web completa" && git push origin main`.
5. Espera el desplegament de Vercel a https://www.grandtourpool.com/.

Les dades de classificació en directe requereixen la taula `mallorca_tour_state` a Supabase i les variables `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD` de Vercel. Si ja has executat `mallorca-supabase.sql` no cal tornar-ho a fer. Sense això només funciona en mode demo local.

És una general A PUNTS (no per temps). La direcció registra qui arriba a cada port, esprint i meta; la web refresca automàticament cada 20 segons. Els GPX no fan cronometratge en viu.

Per recuperar la web antiga, tens la còpia que has fet al Finder i l'historial de Git, sense haver tocat el domini ni el projecte de Vercel.
