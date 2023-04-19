import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'subject' })
export class Subject extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  subject_id: string

  @Column({
    type: DataType.STRING
  })
  subject_name: string
}
