import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: 'student'})
export class Student extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: true
  })
  student_id: string;

  @Column({
    type: DataType.STRING
  })
  first_name: string;
  
  @Column({
    type: DataType.STRING
  })
  last_name: string;
  
  @Column({
    type: DataType.STRING
  })
  email: string;
  
  @Column({
    type: DataType.STRING
  })
  password: string;

  // public student_id!: number;
  // public first_name!: string;
  // public last_name!: string;
  // public email!: string;
  // public password!: string;
}
