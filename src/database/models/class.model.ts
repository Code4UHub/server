import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript'
import { StudentClass } from './studentClass.model'
import { Subject } from './subject.model'
import { Teacher } from './teacher.model'
import { EnabledModule } from './enabledModule'
import { Homework } from './homework.model'

@Table({ tableName: 'class' })
export class Class extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  class_id: string

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false
  })
  number_of_students: number

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  })
  is_finished: boolean

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  finished_date: Date

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true
  })
  days: string[]

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  start_time: string

  @Column({
    type: DataType.STRING,
    allowNull: false
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

  @HasMany(() => StudentClass)
  studentclass: StudentClass[]

  @HasMany(() => Homework)
  homework: Homework

  @HasMany(() => EnabledModule)
  enabled_module: EnabledModule
}
