import { Tournament } from "src/tournament/models/torunament.interface";
import { TournamentEntity } from "src/tournament/models/tournament.entity";
import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { UserRole } from "./user.interface";



@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @Column({nullable: true})
    profileImage: string;

    @Column()
    verified: boolean;

    @OneToMany(type => TournamentEntity, tournament => tournament.organizer)
    tournaments: Tournament[];
    
    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase();
    }

}