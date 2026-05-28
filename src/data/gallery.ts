export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  span?: "sm" | "md" | "lg" | "tall" | "wide";
};

export const hero: GalleryItem = {
  id: "hero",
  src: "/placeholders/eve-dln-soleil-pluie.jpg",
  alt: "Dans la nature — title spread (Didier Jeunesse, 2025)",
};

// Curated mosaic of Eve's actual work — interior illustrations,
// covers, collaboration patterns, foulard, skate.
export const mosaic: GalleryItem[] = [
  { id: "m1",  src: "/placeholders/m-1.jpg",                       alt: "L'Écureuil qui aimait le bleu — interior plate (oiseau)", span: "tall" },
  { id: "m2",  src: "/placeholders/m-2.jpg",                       alt: "Le Chat qui aimait le jaune — tournesol",                 span: "sm"   },
  { id: "m3",  src: "/placeholders/m-3.jpg",                       alt: "Foulard — Carré en soie",                                  span: "sm"   },
  { id: "m4",  src: "/placeholders/eve-dln-petits.jpg",            alt: "Dans la nature — interior spread",                         span: "wide" },
  { id: "m5",  src: "/placeholders/m-5.jpg",                       alt: "Hand-painted skateboard",                                  span: "md"   },
  { id: "m6",  src: "/placeholders/m-6.jpg",                       alt: "La Grenouille qui aimait le rouge — coquelicot",          span: "tall" },
  { id: "m7",  src: "/placeholders/m-7.jpg",                       alt: "Parures — motif oiseaux",                                  span: "sm"   },
  { id: "m8",  src: "/placeholders/eve-dln-couv.jpg",              alt: "Dans la nature — escargot",                                span: "sm"   },
  { id: "m9",  src: "/placeholders/m-9.jpg",                       alt: "Le Chat qui aimait le jaune — blé",                       span: "md"   },
  { id: "m10", src: "/placeholders/m-10.jpg",                      alt: "Le Parti du Thé — étiquette",                              span: "wide" },
  { id: "m11", src: "/placeholders/m-11.jpg",                      alt: "La Grenouille qui aimait le rouge — coccinelle",          span: "sm"   },
  { id: "m12", src: "/placeholders/m-12.jpg",                      alt: "L'Écureuil qui aimait le bleu — champignon",              span: "tall" },
];
