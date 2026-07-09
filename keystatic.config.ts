import { collection, config, fields, singleton } from "@keystatic/core";

const githubRepo = import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO;

const linkFields = {
  label: fields.text({
    label: "Knoptekst",
    validation: { isRequired: true },
  }),
  href: fields.text({
    label: "Link",
    description: "Gebruik bijvoorbeeld /contact/ of /trainingen/.",
    validation: { isRequired: true },
  }),
};

const navigationItemFields = {
  ...linkFields,
  children: fields.array(fields.object(linkFields, { label: "Submenu-item" }), {
    label: "Submenu-items",
    description: "Optioneel. Gebruik dit alleen voor een klein dropdownmenu, zoals bij Instructeurs.",
    itemLabel: (props) => props.fields.label.value || "Submenu-item",
  }),
};

const imageField = (label: string) =>
  fields.image({
    label,
    directory: "public/assets/photos",
    publicPath: "/assets/photos",
    validation: { isRequired: true },
  });

const contactImageField = (label: string) =>
  fields.image({
    label,
    directory: "public/assets/contact",
    publicPath: "/assets/contact",
    validation: { isRequired: true },
  });

const teamImageField = (label: string) =>
  fields.image({
    label,
    directory: "public/assets/team",
    publicPath: "/assets/team",
    validation: { isRequired: true },
  });

export default config({
  storage: githubRepo
    ? {
        kind: "github",
        repo: githubRepo,
      }
    : {
        kind: "local",
      },
  ui: {
    brand: {
      name: "Life-Line-Trainingen CMS",
    },
    navigation: {
      "Vaste pagina's": ["home", "zwembaden", "instructeurs", "over", "contact", "site"],
      Content: ["trainings", "instructorPages", "blogs"],
    },
  },
  singletons: {
    site: singleton({
      label: "Algemene sitegegevens",
      path: "src/content/settings/site",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Bedrijfsnaam", validation: { isRequired: true } }),
        url: fields.url({ label: "Website URL", validation: { isRequired: true } }),
        email: fields.text({ label: "E-mailadres", validation: { isRequired: true } }),
        address: fields.array(fields.text({ label: "Adresregel" }), {
          label: "Adres",
          itemLabel: (props) => props.value || "Adresregel",
        }),
        description: fields.text({ label: "Korte omschrijving", multiline: true }),
        headerCta: fields.object(linkFields, { label: "Knop rechtsboven" }),
        footerText: fields.text({ label: "Footertekst", multiline: true }),
        logos: fields.object(
          {
            blue: fields.image({
              label: "Logo blauw",
              directory: "public/assets/brand",
              publicPath: "/assets/brand",
              validation: { isRequired: true },
            }),
            white: fields.image({
              label: "Logo wit",
              directory: "public/assets/brand",
              publicPath: "/assets/brand",
              validation: { isRequired: true },
            }),
          },
          { label: "Logo's" }
        ),
        navigation: fields.array(fields.object(navigationItemFields, { label: "Menu-item" }), {
          label: "Navigatie",
          itemLabel: (props) => props.fields.label.value || "Menu-item",
        }),
        footerPartners: fields.array(fields.object(
          {
            label: fields.text({ label: "Naam", validation: { isRequired: true } }),
            href: fields.url({ label: "Link", validation: { isRequired: true } }),
            logo: fields.image({
              label: "Logo",
              directory: "public/assets/partners",
              publicPath: "/assets/partners",
              validation: { isRequired: true },
            }),
            alt: fields.text({ label: "Alt-tekst", validation: { isRequired: true } }),
          },
          { label: "Footer logo/link" }
        ), {
          label: "Footer logo-links",
          itemLabel: (props) => props.fields.label.value || "Footer logo/link",
        }),
      },
    }),
    home: singleton({
      label: "Homepage",
      path: "src/content/pages/home",
      format: { data: "json" },
      schema: {
        seoTitle: fields.text({ label: "SEO titel", validation: { isRequired: true } }),
        seoDescription: fields.text({
          label: "SEO omschrijving",
          multiline: true,
          validation: { isRequired: true },
        }),
        hero: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Hoofdtitel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            image: imageField("Hero foto"),
            imageAlt: fields.text({ label: "Alt-tekst hero foto", validation: { isRequired: true } }),
            primaryCta: fields.object(linkFields, { label: "Primaire knop" }),
            secondaryCta: fields.object(linkFields, { label: "Tweede knop" }),
            trust: fields.text({ label: "Vertrouwensregel", validation: { isRequired: true } }),
          },
          { label: "Hero" }
        ),
        audiences: fields.array(
          fields.object(
            {
              label: fields.text({ label: "Klein label", validation: { isRequired: true } }),
              title: fields.text({ label: "Titel", validation: { isRequired: true } }),
              text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
              href: fields.text({ label: "Link", validation: { isRequired: true } }),
            },
            { label: "Doelgroepkaart" }
          ),
          {
            label: "Doelgroepkaarten",
            itemLabel: (props) => props.fields.title.value || "Doelgroep",
          }
        ),
        positioning: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            items: fields.array(
              fields.object(
                {
                  title: fields.text({ label: "Titel", validation: { isRequired: true } }),
                  text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
                },
                { label: "Pijler" }
              ),
              {
                label: "Pijlers",
                itemLabel: (props) => props.fields.title.value || "Pijler",
              }
            ),
          },
          { label: "Positionering" }
        ),
        featuredTrainingSlugs: fields.array(fields.text({ label: "Training slug" }), {
          label: "Uitgelichte trainingen",
          description: "Gebruik slugs uit de trainingcollectie, bijvoorbeeld bls of waterveiligheid.",
          itemLabel: (props) => props.value || "Training",
        }),
        visualStatement: fields.object(
          {
            quote: fields.text({ label: "Statement", validation: { isRequired: true } }),
            text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
            images: fields.array(
              fields.object(
                {
                  src: imageField("Foto"),
                  alt: fields.text({ label: "Alt-tekst", validation: { isRequired: true } }),
                },
                { label: "Praktijkbeeld" }
              ),
              {
                label: "Praktijkbeelden",
                itemLabel: (props) => props.fields.alt.value || "Praktijkbeeld",
              }
            ),
          },
          { label: "Visueel statement" }
        ),
        reviewSwimlane: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            sourceLabel: fields.text({ label: "Google linktekst", validation: { isRequired: true } }),
            sourceHref: fields.text({
              label: "Google link",
              description: "Plak hier de link naar de Google reviews of het Google bedrijfsprofiel.",
              validation: { isRequired: true },
            }),
            reviews: fields.array(
              fields.object(
                {
                  author: fields.text({ label: "Naam reviewer", validation: { isRequired: true } }),
                  context: fields.text({
                    label: "Context",
                    description: "Bijvoorbeeld Google review, organisatie of type training.",
                  }),
                  rating: fields.integer({
                    label: "Score",
                    description: "Gebruik een score van 1 t/m 5.",
                    defaultValue: 5,
                    validation: { isRequired: true },
                  }),
                  quote: fields.text({ label: "Reviewtekst", multiline: true, validation: { isRequired: true } }),
                  date: fields.text({
                    label: "Datum",
                    description: "Optioneel, bijvoorbeeld juni 2026.",
                  }),
                  visible: fields.checkbox({
                    label: "Zichtbaar op de website",
                    defaultValue: false,
                  }),
                },
                { label: "Review" }
              ),
              {
                label: "Reviews",
                itemLabel: (props) => props.fields.author.value || "Review",
              }
            ),
          },
          { label: "Reviewbanner" }
        ),
        finalCta: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
            button: fields.object(linkFields, { label: "Knop" }),
          },
          { label: "Conversieblok" }
        ),
      },
    }),
    zwembaden: singleton({
      label: "Zwembaden",
      path: "src/content/pages/zwembaden",
      format: { data: "json" },
      schema: {
        seoTitle: fields.text({ label: "SEO titel", validation: { isRequired: true } }),
        seoDescription: fields.text({
          label: "SEO omschrijving",
          multiline: true,
          validation: { isRequired: true },
        }),
        hero: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Hoofdtitel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            image: imageField("Hero foto"),
            imageAlt: fields.text({ label: "Alt-tekst hero foto", validation: { isRequired: true } }),
            primaryCta: fields.object(linkFields, { label: "Primaire knop" }),
            secondaryCta: fields.object(linkFields, { label: "Tweede knop / ankerlink" }),
            trust: fields.text({ label: "Vertrouwensregel", validation: { isRequired: true } }),
          },
          { label: "Hero" }
        ),
        quickAnswer: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            text: fields.text({ label: "Antwoordtekst", multiline: true, validation: { isRequired: true } }),
          },
          { label: "Direct antwoord" }
        ),
        problem: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            paragraphs: fields.array(fields.text({ label: "Alinea", multiline: true }), {
              label: "Alinea's",
              itemLabel: (props) => props.value || "Alinea",
            }),
          },
          { label: "Probleemsectie" }
        ),
        levels: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            items: fields.array(
              fields.object(
                {
                  label: fields.text({ label: "Klein label", validation: { isRequired: true } }),
                  recommended: fields.checkbox({
                    label: "Toon als aanbeveling",
                    defaultValue: false,
                  }),
                  recommendedLabel: fields.text({
                    label: "Aanbeveling label",
                    description: "Bijvoorbeeld: Onze aanbeveling.",
                  }),
                  title: fields.text({ label: "Titel", validation: { isRequired: true } }),
                  text: fields.text({ label: "Korte tekst", multiline: true, validation: { isRequired: true } }),
                  detailsTitle: fields.text({ label: "Uitklapknop tekst", validation: { isRequired: true } }),
                  details: fields.array(fields.text({ label: "Detailregel", multiline: true }), {
                    label: "Uitklapbare inhoud",
                    itemLabel: (props) => props.value || "Detail",
                  }),
                },
                { label: "Trainingsniveau" }
              ),
              {
                label: "Trainingsniveaus",
                itemLabel: (props) => props.fields.title.value || "Trainingsniveau",
              }
            ),
            note: fields.text({ label: "Tekst onder niveaus", multiline: true, validation: { isRequired: true } }),
          },
          { label: "Trainingsniveaus" }
        ),
        addition: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            items: fields.array(
              fields.object(
                {
                  label: fields.text({ label: "Module label", validation: { isRequired: true } }),
                  title: fields.text({ label: "Titel", validation: { isRequired: true } }),
                  subtitle: fields.text({ label: "Korte toelichting", multiline: true, validation: { isRequired: true } }),
                  detailsTitle: fields.text({ label: "Uitklapknop tekst", validation: { isRequired: true } }),
                  facts: fields.array(
                    fields.object(
                      {
                        label: fields.text({ label: "Label", validation: { isRequired: true } }),
                        text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
                      },
                      { label: "Feit" }
                    ),
                    {
                      label: "Feiten",
                      itemLabel: (props) => props.fields.label.value || "Feit",
                    }
                  ),
                  noticeTitle: fields.text({
                    label: "Let op / instapeis titel",
                    description: "Laat leeg als er geen opvallend blok nodig is.",
                  }),
                  noticeText: fields.text({
                    label: "Let op / instapeis tekst",
                    multiline: true,
                    description: "Laat leeg als er geen opvallend blok nodig is.",
                  }),
                  ctaLabel: fields.text({ label: "Knoptekst", validation: { isRequired: true } }),
                  ctaHref: fields.text({ label: "Knoplink", validation: { isRequired: true } }),
                },
                { label: "Module" }
              ),
              {
                label: "Modules",
                itemLabel: (props) => props.fields.title.value || "Module",
              }
            ),
          },
          { label: "Aanvulling Zwemmend Redden Zwembaden" }
        ),
        groupSize: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            items: fields.array(
              fields.object(
                {
                  title: fields.text({ label: "Titel", validation: { isRequired: true } }),
                  text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
                },
                { label: "Pijler" }
              ),
              {
                label: "Pijlers",
                itemLabel: (props) => props.fields.title.value || "Pijler",
              }
            ),
          },
          { label: "Waarom maximaal 12" }
        ),
        finalCta: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
            button: fields.object(linkFields, { label: "Knop" }),
          },
          { label: "Conversieblok" }
        ),
      },
    }),
    instructeurs: singleton({
      label: "Instructeurs",
      path: "src/content/pages/instructeurs",
      format: { data: "json" },
      schema: {
        seoTitle: fields.text({ label: "SEO titel", validation: { isRequired: true } }),
        seoDescription: fields.text({
          label: "SEO omschrijving",
          multiline: true,
          validation: { isRequired: true },
        }),
        hero: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Hoofdtitel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            image: imageField("Hero foto"),
            imageAlt: fields.text({ label: "Alt-tekst hero foto", validation: { isRequired: true } }),
            trust: fields.text({ label: "Vertrouwensregel", validation: { isRequired: true } }),
          },
          { label: "Hero" }
        ),
        routes: fields.array(
          fields.object(
            {
              label: fields.text({ label: "Knoptekst", validation: { isRequired: true } }),
              href: fields.text({ label: "Link", validation: { isRequired: true } }),
              title: fields.text({ label: "Interne titel", validation: { isRequired: true } }),
            },
            { label: "Hero knop" }
          ),
          {
            label: "Hero knoppen",
            itemLabel: (props) => props.fields.label.value || "Hero knop",
          }
        ),
        audience: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
          },
          { label: "Voor wie is dit" }
        ),
        cards: fields.array(
          fields.object(
            {
              eyebrow: fields.text({ label: "Klein label", validation: { isRequired: true } }),
              title: fields.text({ label: "Titel", validation: { isRequired: true } }),
              text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
              href: fields.text({ label: "Link", validation: { isRequired: true } }),
              linkLabel: fields.text({ label: "Linktekst", validation: { isRequired: true } }),
            },
            { label: "Routekaart" }
          ),
          {
            label: "Routekaarten",
            itemLabel: (props) => props.fields.title.value || "Routekaart",
          }
        ),
        faq: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            items: fields.array(
              fields.object(
                {
                  question: fields.text({ label: "Vraag", validation: { isRequired: true } }),
                  answer: fields.text({ label: "Antwoord", multiline: true, validation: { isRequired: true } }),
                },
                { label: "FAQ item" }
              ),
              {
                label: "FAQ items",
                itemLabel: (props) => props.fields.question.value || "FAQ item",
              }
            ),
          },
          { label: "FAQ" }
        ),
      },
    }),
    over: singleton({
      label: "Over ons",
      path: "src/content/pages/over",
      format: { data: "json" },
      schema: {
        seoTitle: fields.text({ label: "SEO titel", validation: { isRequired: true } }),
        seoDescription: fields.text({
          label: "SEO omschrijving",
          multiline: true,
          validation: { isRequired: true },
        }),
        hero: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Hoofdtitel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            image: imageField("Hero foto"),
            imageAlt: fields.text({ label: "Alt-tekst hero foto", validation: { isRequired: true } }),
            primaryCta: fields.object(linkFields, { label: "Primaire knop" }),
            trust: fields.text({ label: "Vertrouwensregel", validation: { isRequired: true } }),
          },
          { label: "Hero" }
        ),
        origin: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            paragraphs: fields.array(fields.text({ label: "Alinea", multiline: true }), {
              label: "Alinea's",
              itemLabel: (props) => props.value || "Alinea",
            }),
          },
          { label: "Hoe het ooit begon" }
        ),
        approach: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            items: fields.array(
              fields.object(
                {
                  title: fields.text({ label: "Titel", validation: { isRequired: true } }),
                  text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
                },
                { label: "Pijler" }
              ),
              {
                label: "Pijlers",
                itemLabel: (props) => props.fields.title.value || "Pijler",
              }
            ),
            button: fields.object(linkFields, { label: "Knop naar team" }),
          },
          { label: "Zo pakken we het aan" }
        ),
        team: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            members: fields.array(
              fields.object(
                {
                  name: fields.text({ label: "Naam", validation: { isRequired: true } }),
                  role: fields.text({ label: "Rol", validation: { isRequired: true } }),
                  text: fields.text({ label: "Korte omschrijving", multiline: true, validation: { isRequired: true } }),
                  image: teamImageField("Foto"),
                  imageAlt: fields.text({ label: "Alt-tekst foto", validation: { isRequired: true } }),
                },
                { label: "Teamlid" }
              ),
              {
                label: "Teamleden",
                itemLabel: (props) => props.fields.name.value || "Teamlid",
              }
            ),
          },
          { label: "Team" }
        ),
        partners: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            items: fields.array(
              fields.object(
                {
                  name: fields.text({ label: "Naam organisatie", validation: { isRequired: true } }),
                  text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
                },
                { label: "Samenwerking" }
              ),
              {
                label: "Samenwerkingen",
                itemLabel: (props) => props.fields.name.value || "Samenwerking",
              }
            ),
          },
          { label: "Erkenningen en samenwerkingen" }
        ),
        audience: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
          },
          { label: "Doelgroepblok" }
        ),
        newsletter: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
            button: fields.object(linkFields, { label: "Knop" }),
          },
          { label: "Nieuwsbriefblok" }
        ),
      },
    }),
    contact: singleton({
      label: "Contact",
      path: "src/content/pages/contact",
      format: { data: "json" },
      schema: {
        seoTitle: fields.text({ label: "SEO titel", validation: { isRequired: true } }),
        seoDescription: fields.text({
          label: "SEO omschrijving",
          multiline: true,
          validation: { isRequired: true },
        }),
        hero: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Hoofdtitel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
            image: contactImageField("Hero foto"),
            imageAlt: fields.text({ label: "Alt-tekst hero foto", validation: { isRequired: true } }),
          },
          { label: "Hero" }
        ),
        form: fields.object(
          {
            title: fields.text({ label: "Formuliertitel", validation: { isRequired: true } }),
            intro: fields.text({ label: "Formulierintro", multiline: true, validation: { isRequired: true } }),
            topics: fields.array(fields.text({ label: "Onderwerp" }), {
              label: "Onderwerpopties",
              itemLabel: (props) => props.value || "Onderwerp",
            }),
            submitLabel: fields.text({ label: "Verzendknop", validation: { isRequired: true } }),
            newsletterLabel: fields.text({ label: "Nieuwsbrief checkbox", validation: { isRequired: true } }),
            privacyText: fields.text({ label: "Privacytekst", multiline: true, validation: { isRequired: true } }),
            fallbackLabel: fields.text({ label: "Fallback mailknop", validation: { isRequired: true } }),
          },
          { label: "Formulier" }
        ),
        contactCard: fields.object(
          {
            title: fields.text({ label: "Titel contactkaart", validation: { isRequired: true } }),
            image: contactImageField("Contactkaart foto"),
            imageAlt: fields.text({ label: "Alt-tekst contactkaart foto", validation: { isRequired: true } }),
            email: fields.text({ label: "E-mailadres", validation: { isRequired: true } }),
            address: fields.array(fields.text({ label: "Adresregel" }), {
              label: "Adres",
              itemLabel: (props) => props.value || "Adresregel",
            }),
            responsePromise: fields.text({
              label: "Reactiebelofte",
              multiline: true,
              validation: { isRequired: true },
            }),
          },
          { label: "Contactkaart" }
        ),
        reasons: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
            title: fields.text({ label: "Titel", validation: { isRequired: true } }),
            items: fields.array(
              fields.object(
                {
                  title: fields.text({ label: "Titel", validation: { isRequired: true } }),
                  text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
                },
                { label: "Reden" }
              ),
              {
                label: "Redenen",
                itemLabel: (props) => props.fields.title.value || "Reden",
              }
            ),
          },
          { label: "Waarvoor contact" }
        ),
      },
    }),
  },
  collections: {
    trainings: collection({
      label: "Trainingen en opleidingen",
      slugField: "title",
      path: "src/content/trainings/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({
          name: { label: "Titel", validation: { isRequired: true } },
          slug: { label: "Slug" },
        }),
        href: fields.text({ label: "URL", validation: { isRequired: true } }),
        eyebrow: fields.text({ label: "Klein label", validation: { isRequired: true } }),
        description: fields.text({
          label: "Korte omschrijving",
          multiline: true,
          validation: { isRequired: true },
        }),
        image: imageField("Afbeelding"),
        visible: fields.checkbox({
          label: "Zichtbaar op de website",
          defaultValue: true,
        }),
        order: fields.integer({
          label: "Volgorde",
          validation: { isRequired: true },
        }),
      },
    }),
    instructorPages: collection({
      label: "Instructeurspagina's",
      slugField: "title",
      path: "src/content/instructor-pages/*",
      format: { data: "json" },
      columns: ["title", "visible", "indexable"],
      schema: {
        title: fields.slug({
          name: { label: "Titel", validation: { isRequired: true } },
          slug: {
            label: "Slug",
            description: "Deze slug bepaalt de URL onder /instructeurs/.",
          },
        }),
        seoTitle: fields.text({ label: "SEO titel", validation: { isRequired: true } }),
        seoDescription: fields.text({
          label: "SEO omschrijving",
          multiline: true,
          validation: { isRequired: true },
        }),
        eyebrow: fields.text({ label: "Label boven titel", validation: { isRequired: true } }),
        intro: fields.text({ label: "Intro", multiline: true, validation: { isRequired: true } }),
        image: imageField("Hero foto"),
        imageAlt: fields.text({ label: "Alt-tekst afbeelding", validation: { isRequired: true } }),
        proof: fields.object(
          {
            label: fields.text({ label: "Klein label" }),
            text: fields.text({ label: "Tekst", multiline: true }),
          },
          { label: "Hero bewijsblok" }
        ),
        facts: fields.array(
          fields.object(
            {
              label: fields.text({ label: "Label" }),
              value: fields.text({ label: "Waarde" }),
            },
            { label: "Kernfeit" }
          ),
          {
            label: "Kernfeiten",
            itemLabel: (props) => props.fields.label.value || "Kernfeit",
          }
        ),
        summary: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel" }),
            title: fields.text({ label: "Titel" }),
            text: fields.text({ label: "Tekst", multiline: true }),
          },
          { label: "Direct antwoord" }
        ),
        sections: fields.array(
          fields.object(
            {
              eyebrow: fields.text({ label: "Label boven titel" }),
              title: fields.text({ label: "Titel" }),
              text: fields.text({ label: "Tekst", multiline: true }),
              items: fields.array(fields.text({ label: "Punt", multiline: true }), {
                label: "Punten",
                itemLabel: (props) => props.value || "Punt",
              }),
              image: imageField("Afbeelding"),
              imageAlt: fields.text({ label: "Alt-tekst afbeelding" }),
            },
            { label: "Contentsectie" }
          ),
          {
            label: "Contentsecties",
            itemLabel: (props) => props.fields.title.value || "Contentsectie",
          }
        ),
        reasons: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel" }),
            title: fields.text({ label: "Titel" }),
            items: fields.array(fields.text({ label: "Reden", multiline: true }), {
              label: "Redenen",
              itemLabel: (props) => props.value || "Reden",
            }),
          },
          { label: "Redenenblok" }
        ),
        practical: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel" }),
            title: fields.text({ label: "Titel" }),
            items: fields.array(
              fields.object(
                {
                  label: fields.text({ label: "Label" }),
                  text: fields.text({ label: "Tekst", multiline: true }),
                },
                { label: "Praktisch item" }
              ),
              {
                label: "Praktische informatie",
                itemLabel: (props) => props.fields.label.value || "Praktisch item",
              }
            ),
          },
          { label: "Praktische informatie" }
        ),
        notice: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel" }),
            title: fields.text({ label: "Titel" }),
            text: fields.text({ label: "Tekst", multiline: true }),
          },
          { label: "Opvallende melding" }
        ),
        price: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel" }),
            title: fields.text({ label: "Prijs/titel" }),
            text: fields.text({ label: "Tekst", multiline: true }),
            amount: fields.text({
              label: "Prijs voor structured data",
              description: "Gebruik puntnotatie, bijvoorbeeld 245.00.",
            }),
            currency: fields.text({ label: "Valuta", defaultValue: "EUR" }),
          },
          { label: "Prijsblok" }
        ),
        faq: fields.object(
          {
            eyebrow: fields.text({ label: "Label boven titel" }),
            title: fields.text({ label: "Titel" }),
            items: fields.array(
              fields.object(
                {
                  question: fields.text({ label: "Vraag" }),
                  answer: fields.text({ label: "Antwoord", multiline: true }),
                },
                { label: "FAQ item" }
              ),
              {
                label: "Vragen",
                itemLabel: (props) => props.fields.question.value || "Vraag",
              }
            ),
          },
          { label: "FAQ" }
        ),
        body: fields.array(fields.text({ label: "Alinea", multiline: true }), {
          label: "Pagina-inhoud",
          description: "Alleen gebruikt zolang een subpagina nog geen volledige sectie-opbouw heeft.",
          itemLabel: (props) => props.value || "Alinea",
        }),
        cta: fields.object(linkFields, { label: "CTA" }),
        secondaryCta: fields.object(linkFields, { label: "Tweede CTA" }),
        visible: fields.checkbox({
          label: "Pagina zichtbaar",
          defaultValue: true,
        }),
        indexable: fields.checkbox({
          label: "Indexeerbaar in Google",
          description: "Zet dit pas aan zodra de subpagina volledige inhoud heeft.",
          defaultValue: false,
        }),
      },
    }),
    blogs: collection({
      label: "Nieuws & blogs",
      slugField: "title",
      path: "src/content/blogs/*",
      format: { data: "json" },
      columns: ["title", "date", "category", "visible"],
      schema: {
        title: fields.slug({
          name: { label: "Titel", validation: { isRequired: true } },
          slug: {
            label: "Slug",
            description: "Laat deze gelijk aan de oude URL-slug als je een bestaand artikel overneemt.",
          },
        }),
        seoTitle: fields.text({ label: "SEO titel", validation: { isRequired: true } }),
        seoDescription: fields.text({
          label: "SEO omschrijving",
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({ label: "Publicatiedatum", validation: { isRequired: true } }),
        author: fields.text({ label: "Auteur", validation: { isRequired: true } }),
        readingTime: fields.text({ label: "Leestijd", validation: { isRequired: true } }),
        excerpt: fields.text({
          label: "Overzichtstekst",
          multiline: true,
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: "Hoofdafbeelding",
          directory: "public/assets/blogs",
          publicPath: "/assets/blogs",
          validation: { isRequired: true },
        }),
        imageAlt: fields.text({ label: "Alt-tekst afbeelding", validation: { isRequired: true } }),
        category: fields.select({
          label: "Categorie",
          defaultValue: "Waterveiligheid",
          options: [
            { label: "Waterveiligheid", value: "Waterveiligheid" },
            { label: "Reanimatie", value: "Reanimatie" },
            { label: "EHBO & hulpverlening", value: "EHBO & hulpverlening" },
            { label: "Instructeurs", value: "Instructeurs" },
            { label: "Zwembaden", value: "Zwembaden" },
          ],
        }),
        audience: fields.select({
          label: "Doelgroep",
          defaultValue: "Hulpverleners",
          options: [
            { label: "Zwembaden", value: "Zwembaden" },
            { label: "Instructeurs", value: "Instructeurs" },
            { label: "Hulpverleners", value: "Hulpverleners" },
            { label: "Ouders & verzorgers", value: "Ouders & verzorgers" },
            { label: "Organisaties", value: "Organisaties" },
          ],
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        featured: fields.checkbox({
          label: "Uitgelicht artikel",
          defaultValue: false,
        }),
        visible: fields.checkbox({
          label: "Zichtbaar op de website",
          defaultValue: true,
        }),
        bodyHtml: fields.text({
          label: "Artikelinhoud",
          description: "Gebruik eenvoudige HTML voor koppen, alinea's, lijstjes, links en quotes.",
          multiline: true,
          validation: { isRequired: true },
        }),
      },
    }),
  },
});
