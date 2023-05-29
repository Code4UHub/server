import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript'
import { Student } from './student.model'
import { Module } from './module.model'
import { Challenge } from './challenge.model'
import { EnabledModule } from './enabledModule'

@Table({ tableName: 'student_module' })
export class StudentModule extends Model {
  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  student_id: string

  @ForeignKey(() => Module)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  module_id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  score: number

  @BelongsTo(() => Student)
  student: Student

  @BelongsTo(() => Module)
  module: Module

  // @HasMany(() => EnabledModule)
  // enabled_module: EnabledModule
}
