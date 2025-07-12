import { UUID } from "crypto";

export interface User {
    id: UUID;
    email: string;
    avatar: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile {
    id: UUID;
    userId: string;
    nickname: string;
    createdAt: Date;
    updatedAt: Date;
}