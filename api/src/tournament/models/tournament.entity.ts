import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LogoEntity } from "./logo.entity";

@Entity()
export class TournamentEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    discipline: string;

    @ManyToOne(type => UserEntity, organizer => organizer.tournaments)
    organizer: UserEntity;

    @Column()
    data: Date;

    @Column()
    location: string;

    @Column()
    limit: number;

    @Column()
    deadline: Date;

    @Column()
    seeded_players: Number;

    @OneToMany(type => LogoEntity, logo => logo.tournament)
    logo: LogoEntity[];

 
}