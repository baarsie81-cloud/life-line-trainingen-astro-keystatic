# Life-Line-Trainingen Astro + Keystatic

Nieuwe website voor Life-Line-Trainingen, gebouwd met Astro en Keystatic.

## Lokaal starten

```bash
pnpm install
pnpm dev
```

De website draait standaard op `http://localhost:4321`.
Keystatic is bereikbaar via `http://localhost:4321/keystatic`.

## Contentbeheer

- Homepage: `src/content/pages/home.json`
- Algemene sitegegevens: `src/content/settings/site.json`
- Trainingen en opleidingen: `src/content/trainings/*.json`

De layout, kleuren en volgorde van de homepage staan vast in de code. De klant beheert alleen veilige velden zoals teksten, afbeeldingen, CTA's en zichtbaarheid van trainingen.

## Online CMS via GitHub

Voor Keystatic GitHub mode moet op Vercel de environment variable `PUBLIC_KEYSTATIC_GITHUB_REPO` worden gezet, bijvoorbeeld:

```text
baarsie81-cloud/life-line-trainingen-astro-keystatic
```

Daarnaast moeten de Keystatic GitHub App-variabelen worden ingesteld volgens de Keystatic-instructies.
