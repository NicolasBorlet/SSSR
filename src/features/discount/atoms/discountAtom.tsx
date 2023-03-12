import { atom } from "recoil";
import { DiscountProps } from "../types/discount-type";

export const discountAtom = atom<DiscountProps[]>({
  key: "discountAtom",
  default: [],
});
