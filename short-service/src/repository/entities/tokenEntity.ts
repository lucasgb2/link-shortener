import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export type RangeToken = {
    beginToken: number;
    endToken: number;
}
@Entity()
export class SequenceTokenRepository extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastToken: number;

    constructor() {
        super();
        this.lastToken = 1;
    }

}

@Entity()
export class InstanceRangeTokenRepository extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idInstance: string;

    @Column()
    beginToken: number;

    @Column()
    endToken: number;

}