// const pg = require('./connection')
import { createDb, authenticateDb } from './connection'
import { listStudents, searchStudent } from './query/users'

const test = async () => {
  const sequelize = await createDb()
  const validConnection = await authenticateDb(sequelize)
  if (validConnection) {
    // console.log("Connected");
    const res = await searchStudent('a00000001@tec.com', 'Abc123456')
    // const res = await listStudents()
    // console.log(res)
    // await searchStudent()
    console.log(res)
    sequelize.close()
  }
}

test()
