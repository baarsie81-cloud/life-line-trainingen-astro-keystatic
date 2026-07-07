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
      "Vaste pagina's": ["home", "zwembaden", "contact", "site"],
      Content: ["trainings", "blogs"],
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
        navigation: fields.array(fields.object(linkFields, { label: "Menu-item" }), {
          label: "Navigatie",
          itemLabel: (props) => props.fields.label.value || "Menu-item",
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
                  label: fields.text({ label: "Moment label", validation: { isRequired: true } }),
                  title: fields.text({ label: "Titel", validation: { isRequired: true } }),
                  duration: fields.text({ label: "Duur", validation: { isRequired: true } }),
                  text: fields.text({ label: "Tekst", multiline: true, validation: { isRequired: true } }),
                },
                { label: "Moment" }
              ),
              {
                label: "Momenten",
                itemLabel: (props) => props.fields.title.value || "Moment",
              }
            ),
          },
          { label: "Aanvulling ZRZ" }
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
