import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Subject } from './subject.model'
import { Teacher } from './teacher.model'

@Table({ tableName: 'class' })
export class Class extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  class_id: string

  @Column({
    type: DataType.BOOLEAN
  })
  is_finished: boolean

  @Column({
    type: DataType.DATE
  })
  finished_date: Date

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true
  })
  days: string[]

  @Column({
    type: DataType.STRING
  })
  start_time: string

  @Column({
    type: DataType.STRING
  })
  end_time: string

  @ForeignKey(() => Teacher)
  @Column({
    type: DataType.STRING
  })
  teacher_id: string

  @ForeignKey(() => Subject)
  @Column({
    type: DataType.STRING
  })
  subject_id: number

  @BelongsTo(() => Subject)
  subject: Subject

  @BelongsTo(() => Teacher)
  teacher: Teacher
}
