import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Homework } from './homework.model'
import { QuestionH } from './questionH.model'

@Table({ tableName: 'homework_question' })
export class HomeworkQuestion extends Model {
  @ForeignKey(() => Homework)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false
  })
  homework_id: number

  @ForeignKey(() => QuestionH)
  @Column({
    type: DataType.NUMBER,
    primaryKey: true,
    allowNull: false
  })
  question_h_id: number

  @BelongsTo(() => Homework)
  homework: Homework

  @BelongsTo(() => QuestionH)
  question_h: QuestionH
}
