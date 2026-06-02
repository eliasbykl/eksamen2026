## Database-løsning (enkelt forklart)

Dette prosjektet bruker Supabase (Postgres) som database for å lagre produkter (tjenester/varer).

- Tabellen heter `products` og inneholder feltene:
	- `id` (uuid, primary key)
	- `created_at` (timestamp)
	- `name` (text)
	- `description` (text)
	- `price` (numeric)
	- `image_url` (text)

- SQL-skriptet som oppretter tabellen og legger inn eksempeldata ligger i `supabase/init.sql`.

Kort om hvordan det fungerer
- Frontend-sidene (`app/page.tsx`, `app/produkter/[id]/page.tsx`) er Server Components som henter data fra Supabase via `lib/supabaseClient.ts`.
- Admin-siden (`app/admin/page.tsx`) bruker Next.js Server Actions for å opprette og slette produkter direkte mot Supabase (ingen egen API-rute nødvendig).

Rask oppstart (lokalt)
1. Kopier `.env.local.example` til `.env.local` og fyll inn dine Supabase-verdier:
	 - `NEXT_PUBLIC_SUPABASE_URL`
	 - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (valgfri)
	 - `SUPABASE_SERVICE_ROLE_KEY` (server-side nøkkel)
2. Kjør SQL-skriptet i Supabase SQL Editor: kopier innholdet fra `supabase/init.sql` og trykk Run.
3. Installer avhengigheter (hvis ikke gjort):
```bash
npm install
```
4. Start dev-server:
```bash
npm run dev
```

Besøk:
- Kundeside: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

Sikkerhet
- Ikke sjekk inn `.env.local` eller Service Role-nøkler i versjonskontroll.
- `SUPABASE_SERVICE_ROLE_KEY` gir full tilgang — bruk kun på server-side.

Feilsøking (vanlige problemer)
- Hvis du får SSL-feil lokalt (`SELF_SIGNED_CERT_IN_CHAIN`), kan det være et lokalt sertifikatproblem. En midlertidig utviklingsløsning er å sette `NODE_TLS_REJECT_UNAUTHORIZED=0` (IKKE bruk dette i produksjon).
- Hvis sider gir en hydration-mismatch, sjekk at `app/layout.tsx` og andre top-level komponenter ikke bruker `Date.now()`, `Math.random()` eller direkte `window` i server-render.

Vil du at jeg legger til deployment- eller sikkerhetsinstrukser for produksjon?
