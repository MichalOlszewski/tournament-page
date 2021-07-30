import { User } from "src/user/models/user.interface";
import { Logo } from "./logo.interface";


export interface Tournament {
    id?: number;
    name?: string;
    discipline?: string;
    organizer?: User;
    data?: Date;
    location?: string;
    limit?: number;
    deadline?: Date;
    seeded_players?: Number;
    logo?: Logo[];
}

