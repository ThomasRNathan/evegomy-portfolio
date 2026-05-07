export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  span?: "sm" | "md" | "lg" | "tall" | "wide";
};

export const hero: GalleryItem = {
  id: "hero",
  src: "/placeholders/hero.jpg",
  alt: "A large illustrated landscape at dusk",
};

export const mosaic: GalleryItem[] = [
  { id: "m1", src: "/placeholders/m-1.jpg", alt: "Illustration — dawn", span: "tall" },
  { id: "m2", src: "/placeholders/m-2.jpg", alt: "Illustration — leaves", span: "sm" },
  { id: "m3", src: "/placeholders/m-3.jpg", alt: "Foulard detail", span: "sm" },
  { id: "m4", src: "/placeholders/m-4.jpg", alt: "Book spread", span: "wide" },
  { id: "m5", src: "/placeholders/m-5.jpg", alt: "Skateboard deck", span: "md" },
  { id: "m6", src: "/placeholders/m-6.jpg", alt: "Serigraph print", span: "tall" },
  { id: "m7", src: "/placeholders/m-7.jpg", alt: "Sketch", span: "sm" },
  { id: "m8", src: "/placeholders/m-8.jpg", alt: "Studio detail", span: "sm" },
  { id: "m9", src: "/placeholders/m-9.jpg", alt: "Cover", span: "md" },
  { id: "m10", src: "/placeholders/m-10.jpg", alt: "Painted detail", span: "wide" },
  { id: "m11", src: "/placeholders/m-11.jpg", alt: "Hands at work", span: "sm" },
  { id: "m12", src: "/placeholders/m-12.jpg", alt: "Series — Bleu", span: "tall" },
];
