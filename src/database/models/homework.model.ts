import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany, HasOne } from 'sequelize-typescript'
import { Class } from './class.model'
import { Difficulty } from './difficulty.model'

@Table({ tableName: 'homework' })
export class Homework extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  homework_id: number

  @ForeignKey(() => Class)
  @Column({
    type: DataType.STRING
  })
  class_id: string

  @ForeignKey(() => Difficulty)
  @Column({
    type: DataType.INTEGER
  })
  difficulty_id: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  open_questions: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  closed_questions: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  total_points: number

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  deadline: Date

  @BelongsTo(() => Difficulty)
  difficulty: Difficulty

  @BelongsTo(() => Class)
  class: Class
}
