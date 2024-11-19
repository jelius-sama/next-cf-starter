export interface UserMetadata {
    /* Default Metadatas */
    email?: string;
    email_verified?: boolean;
    phone_verified?: false;
    sub?: string;

    /* Custom Metadatas */
    user_name: string;
    avatar_url?: string;
    banner_url?: string;
}


export type Booleanish = "true" | "false";
