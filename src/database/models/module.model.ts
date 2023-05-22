import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne, HasMany } from 'sequelize-typescript'
import { Challenge } from './challenge.model'
import { Subject } from './subject.model'

@Table({ tableName: 'module' })
export class Module extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  module_id: number

  @Column({
    type: DataType.STRING
  })
  title: string

  @ForeignKey(() => Subject)
  @Column({
    type: DataType.STRING
  })
  subject_id: string

  @BelongsTo(() => Subject)
  subject: Subject

  @HasMany(() => Challenge)
  challenge: Challenge
}
