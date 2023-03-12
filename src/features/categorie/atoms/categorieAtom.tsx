import { atom } from "recoil";
import { CategorieProps } from "../types/categorie-types";

export const categorieAtom = atom<CategorieProps[]>({
  key: "categorieAtom",
  default: [],
});
