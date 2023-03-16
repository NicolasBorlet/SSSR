import { atom } from "recoil";
import { UserProps } from "../types/shared-type";

export const userState = atom({
  key: "userState",
  default: false,
});
