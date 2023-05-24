import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript'
import { Difficulty } from './difficulty.model'
import { EnabledModule } from './enabledModule'
import { Module } from './module.model'
<<<<<<< HEAD
import { Question } from './question.model'
=======
>>>>>>> origin/dev

@Table({ tableName: 'challenge' })
export class Challenge extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  })
  challenge_id: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string

<<<<<<< HEAD
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  open_questions: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  closed_questions: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  total_points: number

=======
>>>>>>> origin/dev
  @ForeignKey(() => Module)
  @Column({
    type: DataType.INTEGER
  })
  module_id: number

  @ForeignKey(() => Difficulty)
  @Column({
    type: DataType.INTEGER
  })
  difficulty_id: number

  @BelongsTo(() => Difficulty)
  difficulty: Difficulty

<<<<<<< HEAD
  @HasMany(() => Question)
  questions: Question
=======
  // @HasMany(() => EnabledModule)
  // enabled_module: EnabledModule
>>>>>>> origin/dev
}
