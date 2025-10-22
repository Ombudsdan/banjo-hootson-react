export default class PlushieBioController {
  static getPlushieBio(plushie: Plushie) {
    return PLUSHIE_BIO_MAP.get(plushie);
  }

  static getAllPlushies(): IPlushie[] {
    return Array.from(PLUSHIE_BIO_MAP.values());
  }
}

const PLUSHIE_BIO_MAP = new Map<Plushie, IPlushie>([
  [
    "BIG_MONKEY",
    {
      name: "Big Monkey",
      bio: "Known as “Big Monk” to his friends. He is a Premier Toys chimpanzee. He is a distant cousin and the oldest in the family.",
      birthday: "His birthday is 14th September and was born in 2016.",
      fileName: "about-family-big-monkey",
    },
  ],
  [
    "DJUNGEL",
    {
      name: "Djungel",
      bio: "Djungel is my Brother. He is also an Ikea Djungelskog Orangutan. He mostly likes chilling at home with his piggy.",
      birthday: "His birthday is 26th September and was born in 2021.",
      fileName: "about-family-djungel",
    },
  ],
  [
    "MANDY",
    {
      name: "Mandy",
      bio: "Mandy is my Sister. She is an Ikea Djungelskog Orangutan. She likes flowers, cats, the colour pink and lots of chocolate.",
      birthday: "Her birthday is 30th October and was born in 2023.",
      fileName: "about-family-mandy",
    },
  ],
  [
    "MORRIS",
    {
      name: "Morris",
      bio: `Morris is a Jellycat "Olaf" Orangutan. He's best friends with Mandy, often finding himself looking after her cat when she's traveling!`,
      birthday: "He was adopted on 17th July 2024 but his birthday is unknown.",
      fileName: "about-family-morris",
    },
  ],
  [
    "DUORINGO",
    {
      name: "Duoringo",
      bio: `Duoringo is a Kösen polar bear. He spends most of his time impersonating other polar bears. Quite frankly, he's a menace.`,
      birthday:
        "He was adopted on 10th January 2024 but his birthday is unknown.",
      fileName: "about-family-duoringo",
    },
  ],
  [
    "GORDON",
    {
      name: "Gordon",
      bio: `Gordon is a Premier Toys orangutan. He is best friends with Big Monkey and spends most of his time in bed with his baby, Gordon.`,
      birthday: "His birthday is 14th August and was born in 2017.",
      fileName: "about-family-gordon",
    },
  ],
]);
export type Plushie =
  | "BIG_MONKEY"
  | "DJUNGEL"
  | "MANDY"
  | "MORRIS"
  | "DUORINGO"
  | "GORDON";

export interface IPlushie {
  name: string;
  bio: string;
  birthday: string;
  fileName: string;
}
