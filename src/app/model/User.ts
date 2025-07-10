import { UUID } from "crypto";

interface User {
    id: UUID;
    email: string;
    avatar: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}

enum UserStatus {
    ACTIVE, INACTIVE, BLOCKED
}