import { atom } from "recoil";
import { UserStatusProps } from "../types/shared-type";

export const userState = atom({
  key: "userState",
  default: false,
});
