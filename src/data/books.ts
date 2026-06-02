import type { Locale } from "@/i18n";

export type Translation = {
  lang: "Italian" | "Spanish" | "English";
  title: string;
  publisher: string;
};

export type PurchaseLink = {
  retailer: string;
  url: string;
  region?: "FR" | "IT" | "ES" | "EN";
};

export type Book = {
  id: string;
  title: string; // original (usually French)
  series?: "Color Series" | "Album" | "Book-CD";
  year?: number;
  publisher: string;
  description: Record<Locale, string>;
  cover: string;
  /** Optional gallery (cover first if provided). Falls back to [cover]. */
  images?: string[];
  translations?: Translation[];
  purchaseLinks?: PurchaseLink[];
};

export const books: Book[] = [
  {
    id: "dans-la-nature",
    title: "Dans la nature",
    series: "Album",
    year: 2025,
    publisher: "Didier Jeunesse",
    description: {
      fr: "Un album sur la différence et la diversité, raconté par une nature lumineuse et enveloppante. Premier album écrit et illustré par Eve Gomy.",
      en: "An album about difference and diversity, told through luminous, enveloping nature. Eve's writing and illustration debut.",
      es: "Un álbum sobre la diferencia y la diversidad, contado por una naturaleza luminosa y envolvente. Debut de Eve como autora e ilustradora.",
    },
    cover: "/placeholders/eve-dans-la-nature.jpg",
    images: [
      "/placeholders/eve-dans-la-nature.jpg",
      "/placeholders/eve-dln-soleil-pluie.jpg",
      "/placeholders/eve-dln-petits.jpg",
      "/placeholders/eve-dln-armee.jpg",
      "/placeholders/eve-dln-couv.jpg",
    ],
    purchaseLinks: [
      { retailer: "Didier Jeunesse", url: "https://www.didier-jeunesse.com/livre/dans-la-nature-9782278128563/", region: "FR" },
      { retailer: "FNAC", url: "https://www.fnac.com/a20961220/Eve-Gomy-Dans-la-nature", region: "FR" },
      { retailer: "Amazon", url: "https://www.amazon.fr/Dans-nature-Eve-Gomy/dp/2278128566", region: "FR" },
      { retailer: "Place des Libraires", url: "https://www.placedeslibraires.fr/livre/9782278128563-dans-la-nature-eve-gomy/", region: "FR" },
    ],
  },
  {
    id: "quatre-saisons",
    title: "Les Quatre Saisons",
    series: "Book-CD",
    publisher: "ACCÈS Éditions",
    description: {
      fr: "Livre-CD pour découvrir Les Quatre Saisons d'Antonio Vivaldi. Chaque concerto est accompagné d'un poème et des illustrations colorées et poétiques d'Eve Gomy invitent à contempler le passage des saisons. Dès 5 ans.",
      en: "A book-CD to discover Vivaldi's Four Seasons. Each concerto is paired with a poem and Eve Gomy's colourful, poetic illustrations invite contemplation of the seasons. Ages 5+.",
      es: "Libro-CD para descubrir Las Cuatro Estaciones de Vivaldi. Cada concierto se acompaña de un poema y las ilustraciones poéticas de Eve Gomy invitan a contemplar el paso de las estaciones. Desde 5 años.",
    },
    cover: "/placeholders/eve-quatre-saisons.jpg",
    images: ["/placeholders/eve-quatre-saisons.jpg"],
    purchaseLinks: [
      { retailer: "ACCÈS Éditions", url: "https://acces-editions.com/produits/les-quatre-saisons", region: "FR" },
      { retailer: "FNAC", url: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=eve+gomy+quatre+saisons", region: "FR" },
      { retailer: "Furet du Nord", url: "https://www.furet.com/livres/les-quatre-saisons-antonio-vivaldi-9782383210986.html", region: "FR" },
      { retailer: "Decitre", url: "https://www.decitre.fr/livres/les-quatre-saisons-9782383210986.html", region: "FR" },
    ],
  },
  {
    id: "chat-jaune",
    title: "Le Chat qui aimait le jaune",
    series: "Color Series",
    publisher: "Seuil Jeunesse",
    description: {
      fr: "Un chat amoureux du jaune. Premier d'un quatuor de cartonnés qui célèbrent une couleur pour les tout-petits.",
      en: "A cat in love with yellow — the first of a quartet of board books celebrating colour for the very young.",
      es: "Un gato enamorado del amarillo — el primero de un cuarteto de libros cartoné que celebran un color para los más pequeños.",
    },
    cover: "/placeholders/eve-chat-jaune.jpg",
    images: [
      "/placeholders/eve-chat-jaune.jpg",
      "/placeholders/m-9.jpg",
      "/placeholders/m-2.jpg",
      "/placeholders/chat-jaune-citrons.jpg",
      "/placeholders/chat-jaune-poissons.jpg",
      "/placeholders/chat-jaune-photo.jpg",
    ],
    translations: [
      { lang: "Italian", title: "Il gatto che amava il giallo", publisher: "Franco Cosimo Panini" },
    ],
    purchaseLinks: [
      { retailer: "Seuil Jeunesse", url: "https://www.seuiljeunesse.com/livre/le-chat-qui-aimait-le-jaune/", region: "FR" },
      { retailer: "FNAC", url: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=chat+qui+aimait+jaune+eve+gomy", region: "FR" },
      { retailer: "IBS (Italia)", url: "https://www.ibs.it/gatto-che-amava-giallo-ediz-libro-eve-gomy/e/9788857020440", region: "IT" },
    ],
  },
  {
    id: "grenouille-rouge",
    title: "La Grenouille qui aimait le rouge",
    series: "Color Series",
    publisher: "Seuil Jeunesse",
    description: {
      fr: "Une grenouille attirée par le rouge. Chaque double-page est une méditation sur une couleur, pour les tout-petits.",
      en: "A frog drawn to red. Each spread is a meditation on a single colour for the very young.",
      es: "Una rana atraída por el rojo. Cada doble página es una meditación sobre un color, para los más pequeños.",
    },
    cover: "/placeholders/eve-grenouille-rouge.jpg",
    images: [
      "/placeholders/eve-grenouille-rouge.jpg",
      "/placeholders/grenouille-coquelicot.jpg",
      "/placeholders/grenouille-coccinelle.jpg",
      "/placeholders/grenouille-nenuphar.jpg",
      "/placeholders/grenouille-champignon.jpg",
      "/placeholders/grenouille-tomates.jpg",
      "/placeholders/grenouille-poissons-koi.jpg",
    ],
    translations: [
      { lang: "Italian", title: "La rana che amava il rosso", publisher: "Franco Cosimo Panini" },
    ],
    purchaseLinks: [
      { retailer: "Seuil Jeunesse", url: "https://www.seuiljeunesse.com/auteur/eve-gomy/37390", region: "FR" },
      { retailer: "FNAC", url: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=grenouille+qui+aimait+rouge+eve+gomy", region: "FR" },
      { retailer: "IBS (Italia)", url: "https://www.ibs.it/rana-che-amava-rosso-ediz-libro-eve-gomy/e/9788857020457", region: "IT" },
    ],
  },
  {
    id: "ecureuil-bleu",
    title: "L'Écureuil qui aimait le bleu",
    series: "Color Series",
    publisher: "Seuil Jeunesse",
    description: {
      fr: "Un écureuil et le bleu du ciel, de l'eau et du crépuscule.",
      en: "A squirrel and the blue of the sky, water and dusk.",
      es: "Una ardilla y el azul del cielo, el agua y el ocaso.",
    },
    cover: "/placeholders/eve-ecureuil-bleu.jpg",
    images: [
      "/placeholders/eve-ecureuil-bleu.jpg",
      "/placeholders/ecureuil-oiseau.jpg",
      "/placeholders/ecureuil-champignon.jpg",
      "/placeholders/ecureuil-loli.jpg",
      "/placeholders/ecureuil-loluxx.jpg",
      "/placeholders/ecureuil-photo.jpg",
    ],
    translations: [
      { lang: "Italian", title: "Lo scoiattolo che amava il blu", publisher: "Franco Cosimo Panini" },
    ],
    purchaseLinks: [
      { retailer: "Seuil Jeunesse", url: "https://www.seuiljeunesse.com/auteur/eve-gomy/37390", region: "FR" },
      { retailer: "FNAC", url: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=ecureuil+qui+aimait+bleu+eve+gomy", region: "FR" },
      { retailer: "IBS (Italia)", url: "https://www.ibs.it/scoiattolo-che-amava-blu-ediz-libro-eve-gomy/e/9788857021621", region: "IT" },
    ],
  },
  {
    id: "souris-rose",
    title: "La Souris qui aimait le rose",
    series: "Color Series",
    publisher: "Seuil Jeunesse",
    description: {
      fr: "Une souris et le rose — pétales, aube, l'intérieur d'un coquillage.",
      en: "A mouse and the colour pink — petals, dawn, the inside of a shell.",
      es: "Un ratoncito y el rosa — pétalos, alba, el interior de una caracola.",
    },
    cover: "/placeholders/eve-souris-rose.jpg",
    images: [
      "/placeholders/eve-souris-rose.jpg",
      "/placeholders/souris-rose-photo.jpg",
    ],
    translations: [
      { lang: "Italian", title: "Il topino che amava il rosa", publisher: "Franco Cosimo Panini" },
    ],
    purchaseLinks: [
      { retailer: "Seuil Jeunesse", url: "https://www.seuiljeunesse.com/auteur/eve-gomy/37390", region: "FR" },
      { retailer: "FNAC", url: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=souris+qui+aimait+rose+eve+gomy", region: "FR" },
      { retailer: "IBS (Italia)", url: "https://www.ibs.it/topino-che-amava-rosa-ediz-libro-eve-gomy/e/9788857021638", region: "IT" },
    ],
  },
];
