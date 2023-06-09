import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript'
import { Challenge } from './challenge.model'
import { StudentQuestion } from './studentQuestion.model'

@Table({ tableName: 'question' })
export class Question extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  question_id: number

  @Column({
    type: DataType.JSONB,
    allowNull: false
  })
  question: object

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  type: string

  @ForeignKey(() => Challenge)
  @Column({
    type: DataType.NUMBER
  })
  challenge_id: number

  @BelongsTo(() => Challenge)
  challenge: Challenge

  @HasMany(() => StudentQuestion)
  student_question: StudentQuestion
}
