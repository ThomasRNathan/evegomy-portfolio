import type { Locale } from "@/i18n";

export type ObjectCategory = "Posters" | "Foulards" | "Skateboards" | "Collaborations";

export type WorkItem = {
  id: string;
  category: ObjectCategory;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  images: string[];
  blurred?: boolean;
  comingSoon?: boolean;
  priceCents?: number;
  currency?: "EUR";
  inStock?: boolean;
  edition?: Record<Locale, string>;
};

export const objects: WorkItem[] = [
  // === Collaborations (blurred, coming soon) ===
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

  // === Posters ===
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
    images: ["/placeholders/poster-bleu.jpg"],
    priceCents: 5000,
    currency: "EUR",
    inStock: true,
    edition: { fr: "Édition limitée, signée", en: "Limited edition, signed", es: "Edición limitada, firmada" },
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
    images: ["/placeholders/poster-salon.jpg"],
    priceCents: 5000,
    currency: "EUR",
    inStock: true,
    edition: { fr: "Édition limitée", en: "Limited edition", es: "Edición limitada" },
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
    images: ["/placeholders/poster-filles.jpg"],
    priceCents: 5000,
    currency: "EUR",
    inStock: true,
    edition: { fr: "Édition limitée, signée", en: "Limited edition, signed", es: "Edición limitada, firmada" },
  },

  // === Skateboards ===
  {
    id: "skate-lune",
    category: "Skateboards",
    title: { fr: "Skateboard peint à la main", en: "Hand-painted skateboard", es: "Skate pintado a mano" },
    description: {
      fr: "Planche en érable peinte à la main, 8.25\". Signée et numérotée. Pièce unique.",
      en: "Hand-painted maple skateboard deck, 8.25\". Signed and numbered. One of a kind.",
      es: "Tabla de skate de arce pintada a mano, 8.25\". Firmada y numerada. Pieza única.",
    },
    images: ["/placeholders/skate-1.jpg"],
    priceCents: 18000,
    currency: "EUR",
    inStock: true,
    edition: { fr: "Pièce unique, numérotée", en: "One of a kind, numbered", es: "Pieza única, numerada" },
  },

  // === Foulards ===
  {
    id: "foulard-aube",
    category: "Foulards",
    title: { fr: "Foulard — Aube", en: "Foulard — Dawn", es: "Foulard — Alba" },
    description: {
      fr: "Foulard en twill de soie, 90 × 90 cm. Édition de 50. Imprimé et fini en France.",
      en: "Silk twill foulard, 90 × 90 cm. Edition of 50. Printed and finished in France.",
      es: "Foulard de twill de seda, 90 × 90 cm. Edición de 50. Impreso y acabado en Francia.",
    },
    images: ["/placeholders/foulard-1.jpg"],
    priceCents: 22000,
    currency: "EUR",
    inStock: true,
    edition: { fr: "Édition de 50", en: "Edition of 50", es: "Edición de 50" },
  },
  {
    id: "foulard-crepuscule",
    category: "Foulards",
    title: { fr: "Foulard — Crépuscule", en: "Foulard — Dusk", es: "Foulard — Crepúsculo" },
    description: {
      fr: "Foulard en twill de soie, 90 × 90 cm. Édition de 50. Imprimé et fini en France.",
      en: "Silk twill foulard, 90 × 90 cm. Edition of 50. Printed and finished in France.",
      es: "Foulard de twill de seda, 90 × 90 cm. Edición de 50. Impreso y acabado en Francia.",
    },
    images: ["/placeholders/foulard-2.jpg"],
    priceCents: 22000,
    currency: "EUR",
    inStock: true,
    edition: { fr: "Édition de 50", en: "Edition of 50", es: "Edición de 50" },
  },
];
