import type { Locale } from "@/i18n";

export type ObjectCategory = "Posters" | "Foulards" | "Skateboards" | "Collaborations";

export type WorkItem = {
  id: string;
  category: ObjectCategory;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  longDescription?: Record<Locale, string>;
  details?: { label: Record<Locale, string>; value: Record<Locale, string> }[];
  images: string[];
  blurred?: boolean;
  comingSoon?: boolean;
  priceCents?: number;
  currency?: "EUR";
  inStock?: boolean;
  // Edition tracking — manual; Eve updates editionRemaining via Lovable as orders ship.
  editionSize?: number;
  editionRemaining?: number;
  madeToOrder?: boolean;
  leadTime?: Record<Locale, string>;
};

// Reusable detail blocks
const SHIPPING = {
  label: { fr: "Expédition", en: "Shipping", es: "Envío" },
  value: {
    fr: "Depuis Paris sous 3 jours ouvrés. Suivi inclus.",
    en: "From Paris within 3 business days. Tracked delivery.",
    es: "Desde París en 3 días laborables. Envío con seguimiento.",
  },
};
const RETURNS = {
  label: { fr: "Retours", en: "Returns", es: "Devoluciones" },
  value: {
    fr: "Pièces signées et numérotées non remboursables. Échange possible en cas d'avarie.",
    en: "Signed and numbered pieces are non-refundable. Exchanges accepted in case of damage in transit.",
    es: "Las piezas firmadas y numeradas no son reembolsables. Cambios en caso de daño en el envío.",
  },
};
const MADE_IN = {
  label: { fr: "Origine", en: "Origin", es: "Origen" },
  value: { fr: "Fabriqué en France", en: "Made in France", es: "Hecho en Francia" },
};

export const objects: WorkItem[] = [
  // === Collaborations ===
  {
    id: "tea-packaging",
    category: "Collaborations",
    title: {
      fr: "Étiquettes — Le Parti du Thé",
      en: "Labels — Le Parti du Thé",
      es: "Etiquetas — Le Parti du Thé",
    },
    description: {
      fr: "Quatre étiquettes illustrées pour la maison de thé française Le Parti du Thé.",
      en: "Four illustrated labels for the French tea house Le Parti du Thé.",
      es: "Cuatro etiquetas ilustradas para la casa francesa de té Le Parti du Thé.",
    },
    images: ["/placeholders/collab-tea.jpg"],
    blurred: true,
    comingSoon: true,
  },
  {
    id: "bedding",
    category: "Collaborations",
    title: {
      fr: "Parures de lit & coussins",
      en: "Bedding & cushions",
      es: "Ropa de cama y cojines",
    },
    description: {
      fr: "Motifs illustrés pour une collection de parures de lit et coussins — félins et oiseaux.",
      en: "Illustrated patterns for a bedding and cushion collection — felines and birds.",
      es: "Motivos ilustrados para una colección de ropa de cama y cojines — felinos y aves.",
    },
    images: ["/placeholders/collab-bedding.jpg"],
  },
  {
    id: "gin",
    category: "Collaborations",
    title: {
      fr: "Bouteille — Gin artisanal",
      en: "Bottle — Artisanal gin",
      es: "Botella — Ginebra artesanal",
    },
    description: {
      fr: "Étiquette et identité illustrées pour un gin artisanal français.",
      en: "Illustrated label and identity for a French artisanal gin.",
      es: "Etiqueta e identidad ilustradas para una ginebra artesanal francesa.",
    },
    images: ["/placeholders/collab-gin.jpg"],
    blurred: true,
    comingSoon: true,
  },

  // === Posters — €50, edition of 50 ===
  {
    id: "poster-series-bleu",
    category: "Posters",
    title: {
      fr: "Affiche — Series Bleu",
      en: "Poster — Series Bleu",
      es: "Cartel — Series Bleu",
    },
    description: {
      fr: "Affiche tirée de la Color Series — Bleu. Tirage limité, signé.",
      en: "Poster from the Color Series — Blue. Limited edition, signed.",
      es: "Cartel de la Color Series — Bleu. Edición limitada, firmado.",
    },
    longDescription: {
      fr: "Impression giclée pigmentaire sur papier d'art Hahnemühle 308gsm. Couleurs durables, fini mat délicat. Chaque exemplaire est signé à la main et numéroté au dos par Eve.",
      en: "Giclée pigment print on Hahnemühle 308gsm fine-art paper. Archival inks, delicate matte finish. Each piece is hand-signed and numbered on the back by Eve.",
      es: "Impresión giclée pigmentaria en papel de arte Hahnemühle 308gsm. Colores duraderos, acabado mate delicado. Cada ejemplar está firmado a mano y numerado al dorso por Eve.",
    },
    images: ["/placeholders/poster-bleu.jpg"],
    priceCents: 5000,
    currency: "EUR",
    inStock: true,
    editionSize: 50,
    editionRemaining: 50,
    details: [
      {
        label: { fr: "Format", en: "Format", es: "Formato" },
        value: { fr: "50 × 70 cm", en: "50 × 70 cm", es: "50 × 70 cm" },
      },
      {
        label: { fr: "Papier", en: "Paper", es: "Papel" },
        value: {
          fr: "Hahnemühle 308gsm, mat",
          en: "Hahnemühle 308gsm, matte",
          es: "Hahnemühle 308gsm, mate",
        },
      },
      MADE_IN,
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "poster-salon-livre",
    category: "Posters",
    title: {
      fr: "Affiche — Salon du livre",
      en: "Poster — Book Fair",
      es: "Cartel — Salón del libro",
    },
    description: {
      fr: "Affiche réalisée pour le Salon du livre jeunesse.",
      en: "Poster designed for the children's book fair.",
      es: "Cartel diseñado para el salón del libro infantil.",
    },
    longDescription: {
      fr: "Édition limitée signée à la main. Imprimée à Paris sur papier d'art Hahnemühle 308gsm.",
      en: "Limited hand-signed edition. Printed in Paris on Hahnemühle 308gsm fine-art paper.",
      es: "Edición limitada firmada a mano. Impresa en París sobre papel Hahnemühle 308gsm.",
    },
    images: ["/placeholders/poster-salon.jpg"],
    priceCents: 5000,
    currency: "EUR",
    inStock: true,
    editionSize: 50,
    editionRemaining: 50,
    details: [
      {
        label: { fr: "Format", en: "Format", es: "Formato" },
        value: { fr: "50 × 70 cm", en: "50 × 70 cm", es: "50 × 70 cm" },
      },
      {
        label: { fr: "Papier", en: "Paper", es: "Papel" },
        value: {
          fr: "Hahnemühle 308gsm, mat",
          en: "Hahnemühle 308gsm, matte",
          es: "Hahnemühle 308gsm, mate",
        },
      },
      MADE_IN,
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "poster-filles-qui-dorment",
    category: "Posters",
    title: {
      fr: "Affiche — Filles qui dorment",
      en: "Poster — Sleeping Girls",
      es: "Cartel — Niñas que duermen",
    },
    description: {
      fr: "Illustration originale, tirage limité, signé.",
      en: "Original illustration, limited print, signed.",
      es: "Ilustración original, tirada limitada, firmada.",
    },
    longDescription: {
      fr: "Tiré de la série Filles qui dorment. Édition signée, numérotée au dos.",
      en: "From the Sleeping Girls series. Signed edition, numbered on the back.",
      es: "De la serie Niñas que duermen. Edición firmada, numerada al dorso.",
    },
    images: ["/placeholders/poster-filles.jpg"],
    priceCents: 5000,
    currency: "EUR",
    inStock: true,
    editionSize: 50,
    editionRemaining: 50,
    details: [
      {
        label: { fr: "Format", en: "Format", es: "Formato" },
        value: { fr: "50 × 70 cm", en: "50 × 70 cm", es: "50 × 70 cm" },
      },
      {
        label: { fr: "Papier", en: "Paper", es: "Papel" },
        value: {
          fr: "Hahnemühle 308gsm, mat",
          en: "Hahnemühle 308gsm, matte",
          es: "Hahnemühle 308gsm, mate",
        },
      },
      MADE_IN,
      SHIPPING,
      RETURNS,
    ],
  },

  // === Skateboards — €500 unique + €1000 made-to-order ===
  {
    id: "skate-lune",
    category: "Skateboards",
    title: {
      fr: "Skateboard peint à la main",
      en: "Hand-painted skateboard",
      es: "Skate pintado a mano",
    },
    description: {
      fr: "Planche en érable peinte à la main par Eve. Pièce unique, signée et numérotée.",
      en: "Maple deck hand-painted by Eve. One of one, signed and numbered.",
      es: "Tabla de arce pintada a mano por Eve. Pieza única, firmada y numerada.",
    },
    longDescription: {
      fr: "Deck 8.25\" en érable canadien 7 plis. Peinte à l'acrylique et vernie au pinceau pour préserver le motif. Livrée prête à monter sur trucks (non fournis) ou à accrocher au mur.",
      en: "8.25\" Canadian 7-ply maple deck. Acrylic paint, brush-varnished to protect the artwork. Ships ready to mount (trucks not included) or to hang on a wall.",
      es: "Tabla de 8.25\" de arce canadiense de 7 capas. Pintura acrílica y barnizada a pincel para proteger el motivo. Lista para montar (ejes no incluidos) o para colgar en la pared.",
    },
    images: ["/placeholders/skate-1.jpg"],
    priceCents: 50000,
    currency: "EUR",
    inStock: true,
    editionSize: 1,
    editionRemaining: 1,
    details: [
      {
        label: { fr: "Format", en: "Format", es: "Formato" },
        value: { fr: "Deck 8.25\" — érable 7 plis", en: "8.25\" deck — 7-ply maple", es: "Tabla 8.25\" — arce 7 capas" },
      },
      {
        label: { fr: "Technique", en: "Technique", es: "Técnica" },
        value: {
          fr: "Acrylique, vernis pinceau",
          en: "Acrylic paint, brush varnish",
          es: "Acrílico, barniz a pincel",
        },
      },
      {
        label: { fr: "Édition", en: "Edition", es: "Edición" },
        value: {
          fr: "Pièce unique, signée et numérotée",
          en: "One of one, signed and numbered",
          es: "Pieza única, firmada y numerada",
        },
      },
      MADE_IN,
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "skate-custom",
    category: "Skateboards",
    title: {
      fr: "Skateboard sur mesure",
      en: "Custom skateboard — made to order",
      es: "Skate por encargo",
    },
    description: {
      fr: "Commande personnalisée d'un deck peint à la main par Eve. Échange préalable pour définir le motif. Comptez 6 à 8 semaines.",
      en: "Commission a deck hand-painted by Eve. Initial conversation to agree on the motif. Allow 6 to 8 weeks.",
      es: "Encarga una tabla pintada a mano por Eve. Conversación previa para definir el motivo. De 6 a 8 semanas.",
    },
    longDescription: {
      fr: "À la commande, Eve vous contacte par email sous 48 h pour définir ensemble la direction du motif (palette, sujet, ambiance). Réalisation à l'acrylique sur deck 8.25\" érable, vernie, signée et numérotée. Pièce unique livrée sous 6 à 8 semaines.",
      en: "Once ordered, Eve will email within 48 hours to discuss the direction (palette, subject, mood). Painted in acrylic on an 8.25\" maple deck, varnished, signed and numbered. One of one, delivered in 6 to 8 weeks.",
      es: "Tras el pedido, Eve te escribirá en 48 h para definir juntos la dirección (paleta, tema, ambiente). Realizada en acrílico sobre tabla de arce 8.25\", barnizada, firmada y numerada. Pieza única entregada en 6 a 8 semanas.",
    },
    images: ["/placeholders/skate-1.jpg"],
    priceCents: 100000,
    currency: "EUR",
    inStock: true,
    madeToOrder: true,
    leadTime: { fr: "6 à 8 semaines", en: "6 to 8 weeks", es: "6 a 8 semanas" },
    details: [
      {
        label: { fr: "Format", en: "Format", es: "Formato" },
        value: { fr: "Deck 8.25\" — érable 7 plis", en: "8.25\" deck — 7-ply maple", es: "Tabla 8.25\" — arce 7 capas" },
      },
      {
        label: { fr: "Technique", en: "Technique", es: "Técnica" },
        value: {
          fr: "Acrylique, vernis pinceau",
          en: "Acrylic paint, brush varnish",
          es: "Acrílico, barniz a pincel",
        },
      },
      {
        label: { fr: "Délai", en: "Lead time", es: "Plazo" },
        value: { fr: "6 à 8 semaines", en: "6 to 8 weeks", es: "6 a 8 semanas" },
      },
      MADE_IN,
      SHIPPING,
      RETURNS,
    ],
  },

  // === Foulards — €220, edition of 200 ===
  {
    id: "foulard-aube",
    category: "Foulards",
    title: { fr: "Foulard — Aube", en: "Foulard — Dawn", es: "Foulard — Alba" },
    description: {
      fr: "Foulard en twill de soie, 90 × 90 cm. Édition de 200. Imprimé et fini en France.",
      en: "Silk twill foulard, 90 × 90 cm. Edition of 200. Printed and finished in France.",
      es: "Foulard de twill de seda, 90 × 90 cm. Edición de 200. Impreso y acabado en Francia.",
    },
    longDescription: {
      fr: "Twill de soie 100 % naturelle, 16 mommes. Bords roulottés à la main. Présenté dans une pochette tissée avec un certificat d'authenticité numéroté.",
      en: "100% natural silk twill, 16 momme. Hand-rolled edges. Comes in a woven pouch with a numbered certificate of authenticity.",
      es: "Twill 100% seda natural, 16 mommes. Bordes enrollados a mano. Se presenta en una bolsa tejida con un certificado de autenticidad numerado.",
    },
    images: ["/placeholders/foulard-1.jpg"],
    priceCents: 22000,
    currency: "EUR",
    inStock: true,
    editionSize: 200,
    editionRemaining: 200,
    details: [
      {
        label: { fr: "Format", en: "Format", es: "Formato" },
        value: { fr: "90 × 90 cm", en: "90 × 90 cm", es: "90 × 90 cm" },
      },
      {
        label: { fr: "Matière", en: "Material", es: "Material" },
        value: {
          fr: "100 % twill de soie, 16 mommes",
          en: "100% silk twill, 16 momme",
          es: "100% twill de seda, 16 mommes",
        },
      },
      {
        label: { fr: "Finition", en: "Finishing", es: "Acabado" },
        value: {
          fr: "Bords roulottés à la main",
          en: "Hand-rolled edges",
          es: "Bordes enrollados a mano",
        },
      },
      MADE_IN,
      SHIPPING,
      RETURNS,
    ],
  },
  {
    id: "foulard-crepuscule",
    category: "Foulards",
    title: { fr: "Foulard — Crépuscule", en: "Foulard — Dusk", es: "Foulard — Crepúsculo" },
    description: {
      fr: "Foulard en twill de soie, 90 × 90 cm. Édition de 200. Imprimé et fini en France.",
      en: "Silk twill foulard, 90 × 90 cm. Edition of 200. Printed and finished in France.",
      es: "Foulard de twill de seda, 90 × 90 cm. Edición de 200. Impreso y acabado en Francia.",
    },
    longDescription: {
      fr: "Twill de soie 100 % naturelle, 16 mommes. Bords roulottés à la main. Présenté dans une pochette tissée avec un certificat d'authenticité numéroté.",
      en: "100% natural silk twill, 16 momme. Hand-rolled edges. Comes in a woven pouch with a numbered certificate of authenticity.",
      es: "Twill 100% seda natural, 16 mommes. Bordes enrollados a mano. Se presenta en una bolsa tejida con un certificado de autenticidad numerado.",
    },
    images: ["/placeholders/foulard-2.jpg"],
    priceCents: 22000,
    currency: "EUR",
    inStock: true,
    editionSize: 200,
    editionRemaining: 200,
    details: [
      {
        label: { fr: "Format", en: "Format", es: "Formato" },
        value: { fr: "90 × 90 cm", en: "90 × 90 cm", es: "90 × 90 cm" },
      },
      {
        label: { fr: "Matière", en: "Material", es: "Material" },
        value: {
          fr: "100 % twill de soie, 16 mommes",
          en: "100% silk twill, 16 momme",
          es: "100% twill de seda, 16 mommes",
        },
      },
      {
        label: { fr: "Finition", en: "Finishing", es: "Acabado" },
        value: {
          fr: "Bords roulottés à la main",
          en: "Hand-rolled edges",
          es: "Bordes enrollados a mano",
        },
      },
      MADE_IN,
      SHIPPING,
      RETURNS,
    ],
  },
];
