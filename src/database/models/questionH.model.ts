import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
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

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  type: string

  @HasMany(() => StudentHomeworkQuestion)
  student_homework_question: StudentHomeworkQuestion
}
