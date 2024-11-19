import { UserMetadata } from '@/types';
import { type User as SupabaseUser } from '@supabase/supabase-js';
import { atom } from "jotai";

export interface User extends Omit<SupabaseUser, "user_metadata"> {
    user_metadata: UserMetadata;
}

export const userAtom = atom<{ user: User | null | undefined; }>({ user: undefined });
export const mobileAtom = atom<boolean | undefined>(undefined);