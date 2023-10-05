import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: false,
});

const fakeProductDataState = [
  {
    ProductID: 1,
    ProductName: "The Dark Side of the Moon",
    ProductShortDesc:
      "The Dark Side of the Moon est le huitième album studio du groupe de rock progressif britannique Pink Floyd. ",
    ProductLongDesc:
      "The Dark Side of the Moon est le huitième album studio du groupe de rock progressif britannique Pink Floyd. Paru le 1ᵉʳ mars 1973 aux États-Unis et le 23 mars en Royaume-Uni, il est souvent considéré comme leur album-concept le plus abouti. L'album est certifié disque de platine aux États-Unis le 8 mai 1973, puis 15 fois disque de platine le 16 mars 1999. Il est resté 741 semaines dans le classement des meilleures ventes d'albums aux États-Unis, dont 591 semaines consécutives de 1976 à 1988, ce qui constitue un record. Il est également resté 736 semaines dans le classement des meilleures ventes d'albums au Royaume-Uni, dont 470 semaines consécutives de 1973 à 1988, ce qui constitue également un record. Il est l'album le plus vendu de l'histoire du groupe, avec plus de 45 millions d'exemplaires écoulés à travers le monde.",
    ProductCartDesc:
      "The Dark Side of the Moon est le huitième album studio du groupe de rock progressif britannique Pink Floyd. ",
    ProductUpdateTime: "2023-06-08 19:55:23",
    ProductStock: 10,
    CategorieID: 3,
    type: "vinyl",
    BrandID: "",
    ProductThumb: "",
  },
];

export const productState = atom({
  key: "productState",
  default: fakeProductDataState,
});
