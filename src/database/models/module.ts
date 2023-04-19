import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Subject } from './subject'

@Table({ tableName: 'module' })
export class Module extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false
  })
  module_id: number

  @Column({
    type: DataType.STRING
  })
  title: string

  @ForeignKey(() => Subject)
  @Column({
    type: DataType.INTEGER
  })
  subject_id: number

  @BelongsTo(() => Subject)
  subject: Subject
}
