export type Product = {
  id: string;
  type: "foulard" | "skateboard" | "print" | "book";
  title: string;
  description: string;
  priceCents: number;
  currency: "EUR";
  images: string[];
  edition?: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "foulard-aube",
    type: "foulard",
    title: "Foulard — Aube",
    description:
      "Hand-finished silk twill foulard, 90 × 90 cm. Edition of 50. Printed in France.",
    priceCents: 22000,
    currency: "EUR",
    images: ["/placeholders/foulard-1.svg"],
    edition: "Edition of 50",
    inStock: true,
  },
  {
    id: "foulard-crepuscule",
    type: "foulard",
    title: "Foulard — Crépuscule",
    description:
      "Hand-finished silk twill foulard, 90 × 90 cm. Edition of 50. Printed in France.",
    priceCents: 22000,
    currency: "EUR",
    images: ["/placeholders/foulard-2.svg"],
    edition: "Edition of 50",
    inStock: true,
  },
  {
    id: "skate-lune",
    type: "skateboard",
    title: "Skateboard — Lune",
    description:
      "Hand-painted maple skateboard deck, 8.25\". Signed and numbered. One of a series.",
    priceCents: 18000,
    currency: "EUR",
    images: ["/placeholders/skate-1.svg"],
    edition: "Numbered",
    inStock: true,
  },
  {
    id: "skate-soleil",
    type: "skateboard",
    title: "Skateboard — Soleil",
    description:
      "Hand-painted maple skateboard deck, 8.25\". Signed and numbered. One of a series.",
    priceCents: 18000,
    currency: "EUR",
    images: ["/placeholders/skate-2.svg"],
    edition: "Numbered",
    inStock: true,
  },
  {
    id: "print-sieste",
    type: "print",
    title: "La sieste — Serigraph",
    description:
      "4-colour serigraph, 60 × 110 cm. Edition of 30. Signed and numbered.",
    priceCents: 35000,
    currency: "EUR",
    images: ["/placeholders/print-1.svg"],
    edition: "Edition of 30",
    inStock: true,
  },
];
