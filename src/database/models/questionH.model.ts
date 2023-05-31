import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Difficulty } from './difficulty.model'
import { StudentHomeworkQuestion } from './studentHomeworkQuestion.model'

@Table({ tableName: 'question_h' })
export class QuestionH extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  question_h_id: number

  @Column({
    type: DataType.JSONB,
    allowNull: false
  })
  question: object

  @ForeignKey(() => Difficulty)
  @Column({
    type: DataType.INTEGER
  })
  difficulty_id: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  type: string

  @BelongsTo(() => Difficulty)
  difficulty: Difficulty

  @HasMany(() => StudentHomeworkQuestion)
  student_homework_question: StudentHomeworkQuestion
}
