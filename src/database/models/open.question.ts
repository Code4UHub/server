import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Assignment } from './assignment'

@Table({ tableName: 'open_question' })
export class OpenQuestion extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false
  })
  open_question_id: number

  @Column({
    type: DataType.JSONB
  })
  open_question: object

  @ForeignKey(() => Assignment)
  @Column({
    type: DataType.INTEGER
  })
  assignment_id: number

  @BelongsTo(() => Assignment)
  assignment: Assignment
}
