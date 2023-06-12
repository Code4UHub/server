import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Student } from './student.model'
import { Homework } from './homework.model'

@Table({ tableName: 'student_homework' })
export class StudentHomework extends Model {
  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  student_id: string

  @ForeignKey(() => Homework)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false
  })
  homework_id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  score: number

  @Column({
    type: DataType.NUMBER,
  })
  start_date: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  out_of_focus_time: number

  @BelongsTo(() => Student)
  student: Student

  @BelongsTo(() => Homework)
  homework: Homework
}
