import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { QuestionH } from './questionH.model'
import { Challenge } from './challenge.model'

@Table({ tableName: 'difficulty' })
export class Difficulty extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: true
  })
  difficulty_id: number

  @Column({
    type: DataType.STRING
  })
  difficulty: string

  @Column({
    type: DataType.NUMBER
  })
  points_per_question: number

  @HasMany(() => QuestionH)
  question_h: QuestionH

  @HasMany(() => Challenge)
  challenge: Challenge
}
