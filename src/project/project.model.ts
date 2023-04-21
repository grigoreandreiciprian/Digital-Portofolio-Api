import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table
export class Project extends Model {
    @Column
    title: string

    @Column
    category: string

    @Column
    link: string

    @Column(DataType.BLOB("long"))
    picture: object
}