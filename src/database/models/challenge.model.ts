import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Module } from './module.model'

@Table({ tableName: 'challenge' })
export class Challenge extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false
  })
  challenge_id: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string

  @ForeignKey(() => Module)
  @Column({
    type: DataType.INTEGER
  })
  module_id: number

  @BelongsTo(() => Module)
  module: Module

  @ForeignKey(() => Module)
  @Column({
    type: DataType.INTEGER
  })
  difficulty_id: number

  @BelongsTo(() => Module)
  difficulty: Module
}
