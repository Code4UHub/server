import { Table, Column, Model, DataType, Default, BelongsTo } from 'sequelize-typescript'

@Table({ tableName: 'teacher' })
export class Teacher extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: true
  })
  teacher_id: string

  @Column({
    type: DataType.STRING
  })
  first_name: string

  @Column({
    type: DataType.STRING
  })
  last_name: string

  @Column({
    type: DataType.STRING
  })
  email: string

  @Column({
    type: DataType.STRING
  })
  password: string

  @Column(DataType.VIRTUAL(DataType.STRING))
  get teacher_name(): string {
    const firstName = this.getDataValue('first_name')
    const lastName = this.getDataValue('last_name')
    return `${firstName} ${lastName}`
  }
}
