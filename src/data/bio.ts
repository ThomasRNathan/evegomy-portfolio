import type { Locale } from "@/i18n";

export const bio = {
  name: "Eve Gomy",
  location: "Paris, France",
  contact: {
    email: "evegomyh@gmail.com",
    instagram: "https://www.instagram.com/eve.gomy/",
    instagramHandle: "@eve.gomy",
  },
  // Bio paragraphs in three languages — shown on About page.
  aboutParagraphs: {
    fr: [
      "Née à Paris en 1997, Eve Gomy est diplômée de l'atelier d'illustration de la HEAR (Haute école des arts du Rhin) à Strasbourg, en 2021.",
      "Ses images contemplatives et détaillées cherchent à transporter le spectateur dans un univers sensible et poétique. Elle s'intéresse aux moments de bascule — l'aube, le crépuscule, l'hypnagogie, ce seuil entre veille et sommeil.",
      "Sa *Color Series* — quatre livres cartonnés au Seuil Jeunesse, traduits en italien chez Franco Cosimo Panini — invite les tout-petits dans des mondes monochromes. Son album *Dans la nature* (Didier Jeunesse, 2025) est une promenade qui célèbre la différence et l'abondance.",
      "Parallèlement à ses albums, elle travaille la sérigraphie, peint des planches de skate à la main et imprime des foulards en petites éditions.",
    ],
    en: [
      "Eve Gomy was born in Paris in 1997 and graduated from the illustration workshop at HEAR (Haute école des arts du Rhin) in Strasbourg in 2021.",
      "Her contemplative, detailed images aim to transport the viewer into a sensitive, poetic universe. She is drawn to transitional moments that shift our senses — dawn and dusk, hypnagogia, the threshold between waking and sleep.",
      "Her *Color Series* — four board books with Seuil Jeunesse, translated in Italy by Franco Cosimo Panini — invites the very young into single-colour worlds. Her album *Dans la nature* (Didier Jeunesse, 2025) is a walk through nature about difference and abundance.",
      "Alongside picture books she works on serigraphs, hand-painted skateboards and printed foulards in small editions.",
    ],
    es: [
      "Eve Gomy nació en París en 1997 y se graduó del taller de ilustración de la HEAR (Haute école des arts du Rhin) en Estrasburgo, en 2021.",
      "Sus imágenes contemplativas y detalladas buscan transportar al espectador a un universo sensible y poético. Le interesan los momentos de transición que cambian nuestros sentidos — el alba y el ocaso, la hipnagogia, el umbral entre la vigilia y el sueño.",
      "Su *Color Series* — cuatro libros cartoné en Seuil Jeunesse, traducidos al italiano por Franco Cosimo Panini — invita a los más pequeños a mundos de un solo color. Su álbum *Dans la nature* (Didier Jeunesse, 2025) es un paseo por la naturaleza sobre la diferencia y la abundancia.",
      "Junto a los álbumes, trabaja la serigrafía, pinta tablas de skate a mano e imprime foulards en pequeñas ediciones.",
    ],
  } as Record<Locale, string[]>,
};
