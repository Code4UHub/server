import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Assignment } from './assignment'

@Table({ tableName: 'close_question' })
export class CloseQuestion extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  close_question_id: number

  @Column({
    type: DataType.JSONB
  })
  close_question: object

  @ForeignKey(() => Assignment)
  @Column({
    type: DataType.INTEGER
  })
  assignment_id: number

  @BelongsTo(() => Assignment)
  assignment: Assignment
}
