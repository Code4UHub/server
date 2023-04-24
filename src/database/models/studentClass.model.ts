import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Student } from './student.model'
import { Class } from './class.model'

@Table({ tableName: 'student_class' })
export class StudentClass extends Model {
  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING(9),
    primaryKey: true,
    allowNull: false
  })
  student_id: string

  @ForeignKey(() => Class)
  @Column({
    type: DataType.STRING(10),
    primaryKey: true,
    allowNull: false
  })
  class_id: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'pending'
  })
  pending: boolean

  @BelongsTo(() => Student)
  student: Student

  @BelongsTo(() => Class)
  class: Class
}
