# Life-Line-Trainingen Astro + Keystatic

Nieuwe website voor Life-Line-Trainingen, gebouwd met Astro en Keystatic.

## Lokaal starten

Gebruik Node 24. Met `nvm` wordt de juiste hoofdversie uit `.nvmrc` geladen:

```bash
nvm use
pnpm install
pnpm dev
```

De website draait standaard op `http://localhost:4321`.
Keystatic is bereikbaar via `http://localhost:4321/keystatic`.

## Contentbeheer

- Vaste pagina's: `src/content/pages/*.json`
- Algemene sitegegevens: `src/content/settings/site.json`
- Trainingen en opleidingen: `src/content/trainings/*.json`
- Instructeurs- en hulpverlenerpagina's: `src/content/instructor-pages/*.json` en `src/content/helper-pages/*.json`
- Kennisbankartikelen: `src/content/blogs/*.json`

De layout, kleuren, componentstructuur, technische links, vaste afbeeldingen en volgorde blijven in de code. Sanne en de klant beheren hoofdzakelijk teksten. Alleen bij kennisbankartikelen kan ook de hoofdafbeelding worden toegevoegd of vervangen. Nieuwe kennisbankartikelen zijn standaard niet gepubliceerd.

## Online CMS via GitHub

Gebruik `.env.example` als namenlijst. Stel deze variabelen in Vercel in voor Production en Preview:

```text
PUBLIC_KEYSTATIC_GITHUB_REPO
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
KEYSTATIC_GITHUB_CLIENT_ID
KEYSTATIC_GITHUB_CLIENT_SECRET
KEYSTATIC_SECRET
```

`PUBLIC_KEYSTATIC_GITHUB_REPO` gebruikt de waarde `baarsie81-cloud/life-line-trainingen-astro-keystatic`. De overige waarden worden aangemaakt tijdens het instellen van de Keystatic GitHub App. Plaats geheime waarden nooit in Git of een publiek `PUBLIC_`-veld.

Gebruikers van het online CMS hebben schrijfrechten op deze GitHub-repository nodig. Test na de eerste deployment altijd inloggen, opslaan en opnieuw laden via `/keystatic`.

## Herstel bij een verkeerde CMS-wijziging

Keystatic-content staat in GitHub en iedere opgeslagen wijziging is daardoor via Git te herstellen. Zoek de betreffende contentcommit in GitHub of GitHub Desktop, maak daarvan een `Revert`-commit en laat Vercel deze herstelcommit opnieuw deployen. Gebruik geen force-push of reset op `main`.
