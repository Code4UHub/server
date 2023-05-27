import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany, HasOne } from 'sequelize-typescript'
import { Difficulty } from './difficulty.model'
import { Module } from './module.model'
import { Question } from './question.model'
import { StudentChallenge } from './studentChallenge.model'

@Table({ tableName: 'challenge' })
export class Challenge extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  challenge_id: number

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

  @ForeignKey(() => Module)
  @Column({
    type: DataType.INTEGER
  })
  module_id: number

  @ForeignKey(() => Difficulty)
  @Column({
    type: DataType.INTEGER
  })
  difficulty_id: number

  @BelongsTo(() => Difficulty)
  difficulty: Difficulty

  @HasMany(() => Question)
  questions: Question[]

  @HasMany(() => StudentChallenge)
  student_challenge: StudentChallenge[]
}
