import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Student } from './student.model'
import { QuestionH } from './questionH.model'
import { Homework } from './homework.model'
import { HomeworkQuestion } from './homeworkQuestion'

@Table({ tableName: 'student_homework_question' })
export class StudentHomeworkQuestion extends Model {
  @ForeignKey(() => Homework)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  homework_id: string

  @ForeignKey(() => QuestionH)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  question_h_id: number

  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  student_id: string

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: {}
  })
  solution: object

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  score: number

  @BelongsTo(() => Homework)
  homework: Homework

  @BelongsTo(() => QuestionH)
  question_h: QuestionH

  @BelongsTo(() => Student)
  student: Student

}
