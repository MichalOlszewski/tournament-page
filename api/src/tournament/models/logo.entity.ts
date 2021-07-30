
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TournamentEntity } from "./tournament.entity";

@Entity()
export class LogoEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @ManyToOne(type => TournamentEntity, tour => tour.logo)
    tournament: TournamentEntity
}