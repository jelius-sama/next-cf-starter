import { User } from "@/server/auth";
import { atom } from "jotai";

export const userAtom = atom<User | null | undefined>(undefined);