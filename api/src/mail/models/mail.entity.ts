import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class MailEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    user_id: number;

    @Column({nullable: true})
    token: string;

}