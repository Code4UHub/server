import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Student } from './student.model'
import { Class } from './class.model'
import getCurrentDate from '../../utils/getCurrentDate.function'

import moment from 'moment'

@Table({ tableName: 'student_class' })
export class StudentClass extends Model {
  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  student_id: string

  @ForeignKey(() => Class)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  class_id: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  pending: boolean

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: moment(getCurrentDate(), 'YYYY-MM-DD')
  })
  request_date: Date


  @BelongsTo(() => Student)
  student: Student

  @BelongsTo(() => Class)
  class: Class
}
