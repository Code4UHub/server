import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Module } from './module.model'

@Table({ tableName: 'assignment' })
export class Assignment extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false
  })
  assignment_id: number

  @ForeignKey(() => Module)
  @Column({
    type: DataType.INTEGER
  })
  module_id: number

  @BelongsTo(() => Module)
  module: Module
}
