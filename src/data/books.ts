export type Book = {
  id: string;
  title: string;
  series?: string;
  year: number;
  publisher?: string;
  description: string;
  cover: string;
  spreads?: string[];
};

export const books: Book[] = [
  {
    id: "dans-la-nature",
    title: "Dans la nature",
    year: 2025,
    publisher: "Didier Jeunesse",
    description:
      "An album about difference and diversity, told through soft and luminous illustrations of an abundant, enveloping nature.",
    cover: "/placeholders/book-1.jpg",
    spreads: ["/placeholders/spread-1.jpg", "/placeholders/spread-2.jpg"],
  },
  {
    id: "les-4-saisons",
    title: "Les 4 saisons",
    year: 2024,
    description:
      "Four seasons traced through the slow rhythms of light, weather and gesture.",
    cover: "/placeholders/book-2.jpg",
  },
  {
    id: "color-series-1",
    title: "Color Series — Bleu",
    series: "Color Series",
    year: 2023,
    description: "A meditation on a single colour across a day.",
    cover: "/placeholders/book-3.jpg",
  },
  {
    id: "color-series-2",
    title: "Color Series — Rouge",
    series: "Color Series",
    year: 2023,
    description: "A meditation on a single colour across a day.",
    cover: "/placeholders/book-4.jpg",
  },
  {
    id: "color-series-3",
    title: "Color Series — Vert",
    series: "Color Series",
    year: 2023,
    description: "A meditation on a single colour across a day.",
    cover: "/placeholders/book-5.jpg",
  },
];
