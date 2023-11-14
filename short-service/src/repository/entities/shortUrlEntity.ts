import { Entity, ObjectId, ObjectIdColumn, Column, BaseEntity } from "typeorm";


@Entity()
export class ShortUrlEntity extends BaseEntity{

    @ObjectIdColumn()
    id: ObjectId

    @Column()
    sequence: number

    @Column()
    token: string

    @Column()
    longUrl: string

    @Column()
    shortUrl: string
}