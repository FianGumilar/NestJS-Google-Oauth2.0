import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_entity')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    displayName: string;
}