import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany, BelongsToMany } from 'sequelize-typescript'
import { Student } from './student.model'
import { Question } from './question.model'

@Table({ tableName: 'student_question' })
export class StudentQuestion extends Model {
  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  student_id: string

  @ForeignKey(() => Question)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  question_id: number

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

  @BelongsTo(() => Student)
  student: Student

  @BelongsTo(() => Question)
  question: Question
}
