// const pg = require('./connection')

import { createDb, authenticateDb } from './connection'
import { selectModulesBySubject } from './query/module'

const test = async () => {
  const sequelize = await createDb()
  const validConnection = await authenticateDb(sequelize)
  if (validConnection) {
    // console.log("Connected");

    const res = await selectModulesBySubject('CS10101')
    // console.log(res)
    // const email = 'a00000001@tec.com'
    // const pwd = 'Abc123456'
    // const email = 'l00000001@tec.com'
    // const pwd = 'Abc123456'
    // let res

    // if (email[0] == 'a') {
    //   res = await selectStudent(email, pwd)
    //   if (res.length > 0) {
    //     console.log('Student:', res[0])
    //   } else {
    //     console.log('Luego lo arreglo')
    //   }
    // } else {
    //   res = await selectTeacher(email, pwd)
    //   if (res.length > 0) {
    //     console.log('Teacher:', res[0])
    //   } else {
    //     console.log('Luego lo arreglo')
    //   }
    // }

    console.log(res)
    sequelize.close()
  }
}

test()
