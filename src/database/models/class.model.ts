import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Subject } from './subject.model'
import { Teacher } from './teacher.model'

@Table({ tableName: 'class' })
export class Class extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false
  })
  class_id: number

  @Column({
    type: DataType.STRING
  })
  code: string

  @Column({
    type: DataType.BOOLEAN
  })
  is_finished: boolean

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
