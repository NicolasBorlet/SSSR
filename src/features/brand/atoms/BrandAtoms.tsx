import { atom } from "recoil";
import { Brand } from "../types/brand";

export const brandAtom = atom<Brand[]>({
  key: "brandAtom",
  default: [],
});
