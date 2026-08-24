# Life-Line-Trainingen - projectoverdracht

Laatst bijgewerkt: 24 augustus 2026

Dit document is het vaste startpunt voor een nieuwe Codex-taak. Lees daarnaast
altijd de actuele repository voordat je wijzigingen maakt. Bij verschil tussen
dit document en de code is de huidige code leidend; meld belangrijke afwijkingen.

## 1. Project en werkwijze

- Klant: Life-Line-Trainingen.
- Doel: de oude WordPress-site vervangen door een snelle, veilige en goed
  beheerbare website met sterke UX, conversie, SEO en performance.
- Stack: Astro, Keystatic, GitHub en Vercel Pro.
- Repository: `baarsie81-cloud/life-line-trainingen-astro-keystatic`.
- Lokale repository:
  `/Users/janbaars/Documents/New project/life-line-trainingen-astro-keystatic`.
- Hoofdbranch: `main`.
- Vercel is gekoppeld aan GitHub en bouwt na een push opnieuw.
- De map `/Users/janbaars/Documents/ChatGPT/website lifeline trainingen` was op
  24 augustus 2026 leeg en is niet de codebasis.
- Laatst gecontroleerde commit: `33275bc Update home.json`.
- Werkmap was bij deze controle schoon.

Lokale commando's:

```bash
pnpm install
pnpm dev
pnpm build
```

- Website lokaal: `http://localhost:4321/`.
- Keystatic lokaal: `http://localhost:4321/keystatic`.
- Node-versie in `package.json`: `24.x`.
- De gebruiker pusht meestal zelf via GitHub Desktop nadat Codex heeft gemeld
  dat de wijziging getest is.

## 2. Samenwerkingsafspraken

- Communiceer in het Nederlands, direct en begrijpelijk.
- De gebruiker is geen professionele softwaredeveloper.
- Analyseer eerst en wijzig daarna alleen wat voor de opdracht nodig is.
- Laat bestaande werkende onderdelen intact.
- Geen nieuwe libraries of grote architectuurwijzigingen zonder duidelijke noodzaak.
- Gebruik bestaande Astro-, CSS- en Keystatic-patronen.
- Controleer frontendwerk op desktop en mobiel en let extra op tekstoverlap,
  kaartuitlijning, lange titels, zoomniveaus en horizontale overflow.
- Draai minimaal `pnpm build` en `git diff --check` na codewijzigingen.
- Gebruik bij grotere visuele wijzigingen een lokale devserver en browsercheck.
- De klant beoordeelt later alle pagina's en teksten en krijgt aanpassingsrondes.
- Voor de uiteindelijke livegang is afgesproken een volledige A-tot-Z-controle
  uit te voeren met de hoogste beschikbare kwaliteits-/redeneermodus.

## 3. Visuele en inhoudelijke richting

- Kernpositionering: Life-Line zorgt dat mensen durven handelen wanneer het telt.
- Stijl: professioneel, menselijk, praktijkgericht, rustig en modern.
- Kleuren: bestaand Life-Line donkerblauw, actie-oranje, wit/licht en fris blauw.
- Geen overdaad aan losse kaarten of decoratie.
- Homepage mag beeldend en krachtig zijn; subpagina-hero's zijn bewust compacter.
- CTA's moeten duidelijk en mobiel goed bedienbaar zijn.
- Layout, kleuren, spacing en componentvolgorde worden niet vrij bewerkbaar in CMS.
- De klant beheert alleen afgebakende velden zoals teksten, foto's, CTA's,
  zichtbaarheid, volgorde waar toegestaan en nieuwe contentitems.
- Afbeeldingen worden lokaal in de repository opgeslagen; geen hotlinks naar de
  oude WordPress-site.

## 4. Huidige hoofdstructuur

Hoofdnavigatie:

1. Zwembaden
2. Instructeurs
3. Hulpverleners
4. Kennisbank
5. Over ons
6. Contact

Belangrijkste routes:

- `/` - homepage.
- `/zwembaden/` - doelgroep-landingspagina met drie niveaus en een aparte
  swimlane voor Zwemmend Redden Zwembaden.
- `/instructeurs/` - keuzehub.
- `/instructeurs/opleiding-reanimatie-instructeur/`.
- `/instructeurs/bijscholing-reanimatie-instructeur/`.
- `/instructeurs/bijscholingsweekend-ehboinstructeurs/`.
- `/hulpverleners/` - keuzehub.
- `/hulpverleners/opleiding-ehbo/`.
- `/hulpverleners/reanimatie-training/`.
- `/hulpverleners/reanimatie-bijscholing/`.
- `/hulpverleners/ehbo-bijscholingen/`.
- `/nieuws/` - visueel gepresenteerd als Kennisbank.
- `/nieuws/[slug]/` - nieuws- en blogartikelen.
- `/over-life-line-trainingen/`.
- `/contact/`.
- `/juridisch/privacy-statement/`.
- `/sitemap.xml`.

De footer toont de partnerlogo's van Reddingsbrigade Nederland, NIBHV, Rode
Kruis en Nederlandse Reanimatie Raad als een vaste horizontale afbeelding. De
logo's zijn momenteel niet afzonderlijk klikbaar.

## 5. Homepage

- Grote praktijkhero met titel, intro, twee CTA's en vertrouwensregel.
- Vertrouwensregel begint met `Al meer dan 20 jaar` in plaats van `Sinds 2003`.
- Vier doelgroepkaarten: Zwembaden, Instructeurs, Hulpverleners en Organisaties.
- De kaart Organisaties verwijst ook naar `/hulpverleners/`, omdat het aanbod
  gelijk is en organisaties via contact een offerte op maat krijgen.
- Positionering: praktijkgericht oefenen, herkenbare situaties en training op maat.
- Uitgelichte trainingen komen uit zichtbare trainingscontent.
- Visuele statementsectie: `In een noodsituatie heb je geen tijd voor twijfel.`
- Google-review-swimlane staat daaronder. Reviews worden handmatig via Keystatic
  beheerd; er is bewust geen live scraping of zware Google API-koppeling.
- Reviewitems kunnen zichtbaar/onzichtbaar worden gezet.
- Laatste conversieblok leidt naar contact/kennismaking.

## 6. Zwembaden

- Compacte subpagina-hero.
- Drie echte niveaus staan als drie losse kaarten naast elkaar:
  1. Workshop drenkelingen en reanimatie.
  2. Veiligheidsdag - onze aanbeveling; label rechtsboven zodat teksten uitlijnen.
  3. Lifesavertraining.
- Alle niveaukaarten starten ingeklapt.
- Zwemmend Redden Zwembaden staat als aparte swimlane/sectie, niet in hetzelfde
  blok als de drie niveaus.
- Zwemmend Redden bestaat uit drie losse, uitklapbare trajecten:
  Training, Opleiding en Hercertificering.
- Velden `Waar` en `Inzet` zijn uit deze kaarten verwijderd.
- Waarschuwingsteksten in de eerste twee kaarten zijn niet vet.
- Er worden op deze pagina geen offerteprijzen gepubliceerd.

## 7. Instructeurs

- Hub met drie gelijkwaardige routes en submenu-items.
- Alle drie subpagina's zijn volwaardig, zichtbaar en indexeerbaar.
- Opleiding reanimatie-instructeur (BIC): prijs EUR 599 exclusief btw en directe
  externe inschrijflink.
- Bijscholing reanimatie-instructeur: prijs EUR 245 exclusief btw en directe
  externe inschrijflink.
- Bijscholingsweekend EHBOinstructeurs.nl: volledige pagina met eigen FAQ en CTA.
- Subpagina's gebruiken Course structured data; FAQ's gebruiken FAQPage data.
- Oude route `/instructeurs/opleiding-reanimatieinstructeur` geeft een 301 naar
  `/instructeurs/opleiding-reanimatie-instructeur/`.

## 8. Hulpverleners

- Hub met twee rubrieken:
  - Een certificaat behalen.
  - Je certificaat verlengen.
- Vier routes en submenu-items:
  - Opleiding EHBO.
  - Reanimatietraining.
  - Reanimatiebijscholing.
  - EHBO-bijscholingen.
- Lifeguard Challenge vervalt en redirect naar Zwembaden.
- Zwemmend Redden Zwembaden blijft uitsluitend bij Zwembaden.
- Alle bestaande inschrijf-/checkoutlinks blijven rechtstreeks in de nieuwe
  website opgeslagen en openen veilig extern.
- De merknaam `Plug&Pay` wordt nergens zichtbaar genoemd. Gebruik natuurlijke
  teksten zoals `inschrijfpagina`, `inschrijfknop` en `actuele informatie`.
- Er staan geen prijzen op de hulpverlenerspagina's; de externe inschrijfpagina
  is bron voor actuele prijs, voorwaarden en data.
- Trainingskaarten tonen in deze volgorde:
  1. Titel.
  2. Gecombineerde doelgroep- en trainingstekst.
  3. Duur, lesvorm en certificering.
  4. Eventueel `Goed om te weten`.
  5. Inschrijfknop.
- Kaarten zijn centraal uitgelijnd; lange titels mogen geen losse eindletter of
  overflow veroorzaken bij zoomen.
- De oude route `/hulpverleners/reanimatie-training-eh2110p` redirect 301 naar
  `/hulpverleners/reanimatie-training/`.
- `/hulpverleners/lifeguard-challenge-pool` redirect 301 naar `/zwembaden/`.

Lokale hero-afbeeldingen:

- `public/assets/photos/opleiding-ehbo-wondverzorging.jpg`.
- `public/assets/photos/reanimatietraining-aed.jpg`.
- `public/assets/photos/reanimatiebijscholing-aed.jpg`.
- `public/assets/photos/ehbo-bijscholing-wondverzorging.jpg`.

## 9. Kennisbank

- Overzicht op `/nieuws/`, in navigatie `Kennisbank` genoemd.
- Artikelen staan op `/nieuws/[oude-slug]/` met hun oorspronkelijke WordPress-slug.
- Migratie omvat de artikelen uit 2025 en 2026, momenteel twintig JSON-items.
- Tekst en afbeeldingen zijn lokaal overgenomen; er is geen afhankelijkheid van
  de oude site.
- Oudere artikelen kunnen later via Keystatic worden toegevoegd met hun originele
  slug en publicatiedatum, zodat de oude URL behouden blijft.
- Gemigreerde artikelen krijgen geen redirect maar bestaan als echte pagina op
  dezelfde URL.
- BlogPosting structured data en canonicals zijn aanwezig.
- De tekst `20 artikelen uit 2025 en 2026` is bewust uit de overzichtskop verwijderd.
- Kaarttitels en teksten zijn aangepast om niet uit de rechter kaart te lopen.
- Artikelen kunnen zichtbaar/onzichtbaar worden gezet. Verberg bij twijfel eerst;
  verwijder pas definitief nadat SEO- en redirectgevolgen zijn gecontroleerd.

## 10. Over ons, contact en privacy

Over ons:

- Hero: `Wij trainen mensen die moeten kunnen handelen`.
- Secties: ontstaan, aanpak, team, erkenningen/samenwerkingen, doelgroepkeuze en
  nieuwsbrief-CTA.
- Teamfoto's staan lokaal in `public/assets/team`.
- Voor livegang redirects controleren voor onder andere:
  - `/over-ons/` naar `/over-life-line-trainingen/`.
  - `/over-ons/het-team/` naar `/over-life-line-trainingen/#team`.
  - Oude teamprofielen naar de teamsectie, tenzij alsnog losse profielen komen.

Contact:

- Contactgegevens: Life-Line-Trainingen, Sleeg 1, 6905 BH Zevenaar,
  `info@life-line-trainingen.nl`.
- Het formulier gebruikt momenteel JavaScript om een ingevulde `mailto:`-mail te
  openen. Er is nog geen server-side verzending, database of spambeveiliging.
- Voor livegang moet expliciet worden besloten of dit wordt vervangen door een
  professioneel formulier via bijvoorbeeld een Vercel Function en Resend.
- Privacytekst bevat een enkele link naar de lokale privacyverklaring.
- De privacyverklaring van de oude site is lokaal opgenomen en in de nieuwe stijl
  vormgegeven, zodat deze niet verdwijnt met WordPress.
- Juridische tekst moet inhoudelijk door klant/juridisch verantwoordelijke worden
  goedgekeurd; Codex geeft geen juridische garantie.

## 11. Keystatic en beheer

- Keystatic is bereikbaar via `/keystatic`.
- Zonder `PUBLIC_KEYSTATIC_GITHUB_REPO` gebruikt de configuratie lokale opslag.
- Voor GitHub mode moet op Vercel minimaal worden ingesteld:
  `PUBLIC_KEYSTATIC_GITHUB_REPO=baarsie81-cloud/life-line-trainingen-astro-keystatic`.
- Daarnaast zijn de officiële Keystatic GitHub App-/OAuth-variabelen nodig.
- Productie-authenticatie en schrijven naar GitHub zijn nog een verplichte
  livegangtest; niet aannemen dat alleen het dashboard openen voldoende is.
- Vaste pagina's in Keystatic: homepage, Zwembaden, Instructeurs, Hulpverleners,
  Over ons, Contact en algemene sitegegevens.
- Collecties: trainingen, instructeurspagina's, hulpverlenerpagina's en blogs.
- Zichtbaarheid en indexeerbaarheid sturen waar relevant pagina, hub, submenu en
  sitemap aan.
- Layout, styling, kleuren en vaste sectievolgorde blijven in Astro/CSS.
- De klant moet veilig teksten, foto's, CTA's, blogs, trainingen en opleidingen
  kunnen beheren en nieuwe items kunnen toevoegen zonder de layout te wijzigen.

## 12. SEO en techniek die al aanwezig zijn

- Definitieve sitebasis in Astro-config en sitecontent:
  `https://life-line-trainingen.nl`.
- Canonicals worden opgebouwd met de huidige pathname en dit domein.
- Sitemap bevat statische hoofdpagina's, zichtbare trainingen en blogs en alleen
  zichtbare/indexeerbare instructeur- en hulpverlenerpagina's.
- Structured data wordt gebruikt voor onder andere BlogPosting, Course en FAQPage.
- Favicon gebruikt alleen de blauwe reddingsboei, zonder kleine onleesbare tekst:
  SVG, 32x32 PNG en 180x180 Apple Touch Icon.
- Afbeeldingen en partnerlogo's worden lokaal geladen.

## 13. Hosting, domein, DNS en e-mail

Gewenste eindopzet:

- Website/hosting: Vercel Pro.
- Code en Keystatic-content: GitHub.
- E-mail en mailboxen: Google Workspace.
- `.nl`-domeinregistratie: bij een zelfstandige Nederlandse registrar als Vercel
  de transfer niet ondersteunt.
- DNS: bij de registrar of Vercel; voorkeur is een stabiele, onafhankelijke DNS-laag
  waarbij alle Google Workspace-records behouden blijven.
- E-results kan pas worden opgezegd nadat domein, DNS, website en e-mail volledig
  zijn verhuisd en getest.

Te behouden DNS-records omvatten minimaal:

- Google Workspace MX-records.
- SPF.
- DKIM.
- DMARC.
- Google domeinverificatie.
- Eventuele ActiveCampaign- en overige externe verificatierecords.

Controleer ook of Google Workspace rechtstreeks bij Google wordt gefactureerd of
via E-results als reseller. In het laatste geval moet de administratieve relatie
worden overgedragen zonder mailboxen opnieuw aan te maken.

## 14. Verplichte checklist voor livegang

Voer deze checklist pas uit wanneer de klant de laatste inhoudsronde heeft
goedgekeurd. Sla geen onderdeel over.

### A. Inhoud en klantgoedkeuring

- [ ] Alle pagina's, teksten, foto's, teamleden en CTA's door klant goedgekeurd.
- [ ] Namen, adressen, e-mail, data, duur, groepsgroottes en prijzen gecontroleerd.
- [ ] Certificerings- en erkenningsclaims bevestigd door de klant.
- [ ] NRR-, Rode Kruis-, Reddingsbrigade- en NIBHV-vermeldingen gecontroleerd.
- [ ] Alle twintig gemigreerde artikelen gecontroleerd op volledige tekst,
      originele slug, datum, auteur, afbeelding, alt-tekst en interne links.
- [ ] Besloten welke oudere artikelen alsnog worden toegevoegd.
- [ ] Concept-/placeholdertekst en interne notities overal verwijderd.
- [ ] Nederlandse spelling en consistente schrijfwijze gecontroleerd, inclusief
      Life-Line-Trainingen, EHBO, BHV, BLS, PBLS en Zwemmend Redden Zwembaden.

### B. Keystatic productiebeheer

- [ ] Keystatic GitHub mode en alle benodigde Vercel-variabelen ingesteld.
- [ ] Inloggen via `/keystatic` getest met het toekomstige klantaccount.
- [ ] Tekst wijzigen, foto vervangen en opslaan naar GitHub getest.
- [ ] Nieuw blogartikel als test aangemaakt, verborgen en daarna verwijderd.
- [ ] Nieuwe training/opleiding als niet-zichtbaar testitem aangemaakt.
- [ ] Zichtbaar/onzichtbaar en indexeerbaar/niet-indexeerbaar getest.
- [ ] Bevestigd dat de klant layout, kleuren en componentstructuur niet kan wijzigen.
- [ ] Rechten op GitHub, Vercel en Keystatic volgens least privilege ingericht.
- [ ] Herstelprocedure voor een verkeerde CMS-commit vastgelegd.

### C. Contact, privacy en juridische zaken

- [ ] Definitief besluit: mailto-formulier behouden of vervangen door echte verzending.
- [ ] Bij echte verzending: Vercel Function/Resend, afzenderdomein, reply-to,
      foutstatus, succesmelding, spam-/botbescherming en logging testen.
- [ ] Alle formuliervelden, validatie, onderwerpkeuzes en mobiel gebruik testen.
- [ ] Nieuwsbriefcheckbox alleen koppelen als toestemming correct wordt verwerkt.
- [ ] Privacyverklaring inhoudelijk en juridisch laten controleren.
- [ ] Controleren of cookie-informatie en cookiebanner nodig zijn voor gebruikte
      analytics, embeds of marketingtools.
- [ ] Bewaartermijnen, verwerkers en contactgegevens in privacytekst verifiëren.

### D. SEO en migratie vanaf WordPress

- [ ] Volledige export/lijst van alle indexeerbare oude WordPress-URL's maken.
- [ ] Iedere oude URL koppelen aan: dezelfde nieuwe URL, een relevante 301 of 410.
- [ ] Redirectmatrix controleren, implementeren en met echte statuscodes testen.
- [ ] Specifieke bekende redirects voor Over ons/team en oude trainingsroutes testen.
- [ ] Geen redirectketens, loops, tijdelijke 302's of redirects naar irrelevante
      pagina's laten staan.
- [ ] Canonical op iedere paginatype controleren; exact `life-line-trainingen.nl`.
- [ ] Keuze voor `www` of zonder `www` vastleggen en de andere variant 301 redirecten.
- [ ] Alle meta titles en descriptions controleren op inhoud, lengte en uniciteit.
- [ ] Exact een logische H1 per pagina en correcte headinghierarchie controleren.
- [ ] Interne links, breadcrumbs waar nodig en CTA-links controleren.
- [ ] Sitemap controleren op alleen definitieve, indexeerbare canonicals.
- [ ] `robots.txt` toevoegen/controleren en sitemap daarin vermelden.
- [ ] Verborgen/noindex pagina's uit sitemap houden.
- [ ] Structured data valideren: Organization/LocalBusiness waar relevant,
      BlogPosting, Course en FAQPage.
- [ ] Open Graph-titels, beschrijvingen en afbeeldingen controleren.
- [ ] Eigen 404-pagina maken/testen met bruikbare navigatie.
- [ ] Google Search Console instellen, domein verifieren en sitemap indienen.
- [ ] Na livegang indexering, 404's, redirects en canonicals volgen.

### E. Functionaliteit en links

- [ ] Hoofdnavigatie en alle desktop- en mobiele submenu's testen.
- [ ] Alle interne links automatisch en handmatig controleren op 404's.
- [ ] Alle externe links controleren, vooral alle inschrijf-/checkoutlinks.
- [ ] Externe links met `target=_blank` veilig met `rel=noopener` openen.
- [ ] Homepage-doelgroepkaarten en uitgelichte trainingen controleren.
- [ ] Alle accordion/details-elementen ingeklapt en met toetsenbord bruikbaar testen.
- [ ] Reviewswimlane testen op hover/focus, swipe en reduced motion.
- [ ] Contact- en nieuwsbrief-CTA's end-to-end testen.
- [ ] E-mailadressen en mailto-fallbacks controleren.

### F. Design, mobiel en toegankelijkheid

- [ ] Visuele controle op gangbare desktop-, tablet- en mobiele breedtes.
- [ ] Test op browserzoom 80%, 100%, 125%, 150% en 200%.
- [ ] Geen tekstoverlap, losse titelletters, overflow of horizontale scrollbar.
- [ ] Kaarten, labels en CTA's blijven professioneel uitgelijnd.
- [ ] Header, submenu's, footer en formulieren met toetsenbord testen.
- [ ] Zichtbare focusstijlen, semantiek, labels en foutmeldingen controleren.
- [ ] Kleurcontrast en alt-teksten controleren.
- [ ] `prefers-reduced-motion` respecteren.
- [ ] Test in actuele Chrome, Safari en Firefox en op echte telefoon indien mogelijk.

### G. Performance en technische kwaliteit

- [ ] Schone installatie en `pnpm build` met Node 24 uitvoeren.
- [ ] `git diff --check`, TypeScript/Astro-fouten en consolefouten oplossen.
- [ ] Lighthouse/PageSpeed controleren op performance, SEO, toegankelijkheid en
      best practices, minimaal homepage en belangrijke landingspagina's.
- [ ] Core Web Vitals controleren: LCP, CLS en INP.
- [ ] Afbeeldingsformaten, afmetingen, compressie en lazy-loading controleren.
- [ ] Geen hotlinks of afhankelijkheid van de oude WordPress-server.
- [ ] Geen onnodige JavaScript-bundels of zware externe scripts.
- [ ] Vercel build- en runtime-logs controleren.
- [ ] Dependencies en bekende beveiligingsproblemen controleren.
- [ ] Passende security headers beoordelen: CSP, HSTS na stabiele HTTPS,
      X-Content-Type-Options, Referrer-Policy en frame-beleid.
- [ ] SSL-certificaat, HTTPS en mixed content controleren.

### H. GitHub en Vercel

- [ ] Git-werkmap schoon en alle definitieve wijzigingen op `main`.
- [ ] Definitieve releasecommit/tag of herkenbaar herstelpunt maken.
- [ ] GitHub-repo, Vercel-project, teamleden en eigenaarschap overdraagbaar inrichten.
- [ ] Productiedomein aan het juiste Vercel-project koppelen.
- [ ] Preview- en productie-environmentvariabelen controleren.
- [ ] Deployment protection zo instellen dat previews veilig zijn maar productie
      publiek bereikbaar is.
- [ ] Vercel Analytics/Speed Insights alleen activeren na privacy-/cookiebesluit.
- [ ] Rollback naar vorige succesvolle deployment testen of documenteren.

### I. Domein, DNS en Google Workspace

- [ ] Bevestigen dat de klant officieel houder is van het `.nl`-domein.
- [ ] Volledige DNS-zone bij E-results exporteren en veilig bewaren.
- [ ] Verhuistoken opvragen en nieuwe registrar kiezen.
- [ ] DNSSEC-status en verhuismethode controleren.
- [ ] TTL ruim voor omschakeling verlagen waar dat zinvol is.
- [ ] Alle MX-, SPF-, DKIM-, DMARC-, verificatie- en ActiveCampaign-records exact
      overnemen voordat nameservers wijzigen.
- [ ] Website-A/AAAA/ALIAS/CNAME-records volgens Vercel instellen.
- [ ] Controleren dat er geen conflicterende oude webrecords achterblijven.
- [ ] Inkomende en uitgaande Google Workspace-mail testen met externe adressen.
- [ ] SPF, DKIM en DMARC na DNS-propagatie opnieuw valideren.
- [ ] Google Workspace reseller-/facturatiestatus bij E-results controleren.
- [ ] E-results pas opzeggen nadat website, DNS en e-mail meerdere dagen stabiel zijn.
- [ ] Oude hosting en WordPress tijdelijk als back-up behouden en daarna veilig
      archiveren/verwijderen volgens afspraak en privacyregels.

### J. Direct na livegang

- [ ] Homepage, belangrijkste landingspagina's, checkoutlinks en contactflow opnieuw testen.
- [ ] Vercel logs, Search Console, 404's en redirects dagelijks volgen in de eerste week.
- [ ] DNS en e-mailbezorging controleren.
- [ ] Sitemap opnieuw laten verwerken en belangrijke URL's inspecteren.
- [ ] Back-up van oude WordPress-content, media, DNS-zone en definitieve Git-release bewaren.
- [ ] Klant korte beheerinstructie geven voor Keystatic en herstel bij fouten.

## 15. Startinstructie voor een nieuwe Codex-taak

Gebruik desgewenst deze tekst als eerste bericht:

> Lees eerst `AGENTS.md` en `PROJECT_HANDOFF.md` in de repository. Controleer
> daarna `git status`, de actuele code en de laatste commits. Werk verder in de
> bestaande Astro/Keystatic-stijl, behoud alle CMS- en SEO-afspraken en voer nog
> geen livegang uit. De klant heeft nieuwe feedback; analyseer die eerst en maak
> alleen de benodigde, kleine wijzigingen. Herinner ons aan de volledige
> livegang-checklist zodra we aangeven dat de website definitief live mag.

