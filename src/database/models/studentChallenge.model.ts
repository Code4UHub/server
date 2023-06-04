import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Student } from './student.model'
import { Challenge } from './challenge.model'

@Table({ tableName: 'student_challenge' })
export class StudentChallenge extends Model {
  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  student_id: string

  @ForeignKey(() => Challenge)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  challenge_id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: {}
  })
  score: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  status: string

  @BelongsTo(() => Student)
  student: Student

  @BelongsTo(() => Challenge)
  challenge: Challenge
}
