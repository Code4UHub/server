import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript'
import { Module } from './module.model'
import { Class } from './class.model'
import { StudentModule } from './studentModule.model'

@Table({ tableName: 'enabled_module' })
export class EnabledModule extends Model {
  @ForeignKey(() => Module)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  module_id: number

  @ForeignKey(() => Class)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  class_id: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  is_active: boolean

  @BelongsTo(() => Module)
  module: Module

  @BelongsTo(() => Class)
  class: Class
}
