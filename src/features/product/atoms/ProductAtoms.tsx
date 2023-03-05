import { atom } from "recoil";
import { Product } from "../types/product";

export const productAtom = atom<Product[]>({
  key: "productAtom",
  default: [],
});
