import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'difficulty' })
export class Difficulty extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: true
  })
  difficulty_id: number

  @Column({
    type: DataType.STRING
  })
  difficulty: string

  @Column({
    type: DataType.NUMBER
  })
  points_per_question: number
}
