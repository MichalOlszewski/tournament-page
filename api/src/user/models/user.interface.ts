import { Tournament } from "src/tournament/models/torunament.interface";


export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    profileImage?: string;
    verified?: boolean;
    tournaments?: Tournament[];
}


export enum UserRole{
    ADMIN = 'admin',
    CHIEFEDITOR = 'chiefeditor',
    EDITOR = 'editor',
    USER = 'user'
}