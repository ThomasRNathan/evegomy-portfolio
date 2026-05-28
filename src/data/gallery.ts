export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  span?: "sm" | "md" | "lg" | "tall" | "wide";
};

export const hero: GalleryItem = {
  id: "hero",
  src: "/placeholders/eve-dln-soleil-pluie.jpg",
  alt: "Dans la nature — Soleil et pluie (Didier Jeunesse, 2025)",
};

// Mix of Eve's real illustrations (Dans la nature interior + Color Series covers)
// and a few atmospheric stand-ins for the studio / foulard / skate slots.
export const mosaic: GalleryItem[] = [
  { id: "m1", src: "/placeholders/eve-dln-petits.jpg", alt: "Dans la nature — tout petits et plus grands", span: "tall" },
  { id: "m2", src: "/placeholders/eve-ecureuil-bleu.jpg", alt: "L'Écureuil qui aimait le bleu (Seuil Jeunesse)", span: "sm" },
  { id: "m3", src: "/placeholders/m-3.jpg", alt: "Foulard — silk study", span: "sm" },
  { id: "m4", src: "/placeholders/eve-dln-armee.jpg", alt: "Dans la nature — interior spread", span: "wide" },
  { id: "m5", src: "/placeholders/m-5.jpg", alt: "Hand-painted skateboard", span: "md" },
  { id: "m6", src: "/placeholders/eve-grenouille-rouge.jpg", alt: "La Grenouille qui aimait le rouge (Seuil Jeunesse)", span: "tall" },
  { id: "m7", src: "/placeholders/m-7.jpg", alt: "Sketch — process", span: "sm" },
  { id: "m8", src: "/placeholders/eve-dln-couv.jpg", alt: "Dans la nature — cover", span: "sm" },
  { id: "m9", src: "/placeholders/eve-chat-jaune.jpg", alt: "Le Chat qui aimait le jaune (Seuil Jeunesse)", span: "md" },
  { id: "m10", src: "/placeholders/eve-dans-la-nature.jpg", alt: "Dans la nature — album cover (Didier Jeunesse)", span: "wide" },
  { id: "m11", src: "/placeholders/m-11.jpg", alt: "Studio — hands at work", span: "sm" },
  { id: "m12", src: "/placeholders/eve-souris-rose.jpg", alt: "La Souris qui aimait le rose (Seuil Jeunesse)", span: "tall" },
];
