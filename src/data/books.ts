export type Translation = {
  lang: "Italian" | "Spanish" | "English" | "German";
  title: string;
  publisher: string;
};

export type Book = {
  id: string;
  title: string;
  series?: string;
  year?: number;
  publisher: string;
  description: string;
  cover: string;
  translations?: Translation[];
};

export const books: Book[] = [
  {
    id: "dans-la-nature",
    title: "Dans la nature",
    year: 2025,
    publisher: "Didier Jeunesse",
    description:
      "An album about difference and diversity, told through luminous, enveloping nature. Eve's writing and illustration debut from birth onward.",
    cover: "/placeholders/eve-dans-la-nature.jpg",
  },
  {
    id: "chat-jaune",
    title: "Le Chat qui aimait le jaune",
    series: "Color Series",
    publisher: "Seuil Jeunesse",
    description:
      "A cat in love with yellow — the first of a quartet of board books celebrating colour for the very young.",
    cover: "/placeholders/eve-chat-jaune.jpg",
    translations: [
      { lang: "Italian", title: "Il gatto che amava il giallo", publisher: "Franco Cosimo Panini" },
    ],
  },
  {
    id: "grenouille-rouge",
    title: "La Grenouille qui aimait le rouge",
    series: "Color Series",
    publisher: "Seuil Jeunesse",
    description:
      "A frog drawn to red. Each spread is a meditation on a single colour for the very young.",
    cover: "/placeholders/eve-grenouille-rouge.jpg",
    translations: [
      { lang: "Italian", title: "La rana che amava il rosso", publisher: "Franco Cosimo Panini" },
    ],
  },
  {
    id: "ecureuil-bleu",
    title: "L'Écureuil qui aimait le bleu",
    series: "Color Series",
    publisher: "Seuil Jeunesse",
    description:
      "A squirrel and the blue of the sky, water and dusk.",
    cover: "/placeholders/eve-ecureuil-bleu.jpg",
    translations: [
      { lang: "Italian", title: "Lo scoiattolo che amava il blu", publisher: "Franco Cosimo Panini" },
    ],
  },
  {
    id: "souris-rose",
    title: "La Souris qui aimait le rose",
    series: "Color Series",
    publisher: "Seuil Jeunesse",
    description:
      "A mouse and the colour pink — petals, dawn, the inside of a shell.",
    cover: "/placeholders/eve-souris-rose.jpg",
    translations: [
      { lang: "Italian", title: "Il topino che amava il rosa", publisher: "Franco Cosimo Panini" },
    ],
  },
];
