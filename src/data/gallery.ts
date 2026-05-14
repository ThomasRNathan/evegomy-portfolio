export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  span?: "sm" | "md" | "lg" | "tall" | "wide";
};

export const hero: GalleryItem = {
  id: "hero",
  src: "/placeholders/hero.svg",
  alt: "A large illustrated landscape at dusk",
};

export const mosaic: GalleryItem[] = [
  { id: "m1", src: "/placeholders/m-1.svg", alt: "Illustration — dawn", span: "tall" },
  { id: "m2", src: "/placeholders/m-2.svg", alt: "Illustration — leaves", span: "sm" },
  { id: "m3", src: "/placeholders/m-3.svg", alt: "Foulard detail", span: "sm" },
  { id: "m4", src: "/placeholders/m-4.svg", alt: "Book spread", span: "wide" },
  { id: "m5", src: "/placeholders/m-5.svg", alt: "Skateboard deck", span: "md" },
  { id: "m6", src: "/placeholders/m-6.svg", alt: "Serigraph print", span: "tall" },
  { id: "m7", src: "/placeholders/m-7.svg", alt: "Sketch", span: "sm" },
  { id: "m8", src: "/placeholders/m-8.svg", alt: "Studio detail", span: "sm" },
  { id: "m9", src: "/placeholders/m-9.svg", alt: "Cover", span: "md" },
  { id: "m10", src: "/placeholders/m-10.svg", alt: "Painted detail", span: "wide" },
  { id: "m11", src: "/placeholders/m-11.svg", alt: "Hands at work", span: "sm" },
  { id: "m12", src: "/placeholders/m-12.svg", alt: "Series — Bleu", span: "tall" },
];
