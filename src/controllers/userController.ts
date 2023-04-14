import { Request, Response } from 'express'
import { createUser, selectStudent, selectStudents } from '../database/query/users'
import { StudentType } from '../types/user.type'

export const getUsers = async (req: Request, res: Response) => {
  // res.status(200).send('It works!')
  try {
    const query = await selectStudents()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const email: string = req.params.email.replace('email=', '')
    const password: string = req.params.pwd.replace('password=', '')
    console.log(email)
    console.log(password)
    const query = await selectStudent(email, password)
    console.log('query: ', query)

    if (query.length > 0) {
      res.status(200).json({
        status: 'success',
        data: query[0]
      })
    } else {
      const exists = await selectStudent(email)
      if (exists.length > 0) {
        res.status(401).json({
          status: 'failed',
          data: 'Incorrect password'
        })
      } else {
        res.status(404).json({
          status: 'failed',
          data: 'User not found'
        })
      }
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e.message
    })
  }
}

export const postUser = async (req: Request, res: Response) => {
  try {
    const student: StudentType = req.body

    console.log(student)
    const query = await createUser(student)
    console.log(query)
    // if (query)
    res.status(200).json({
      status: 'success',
      data: query
    })
    // res.status(202).send('Created User')
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      data: e
    })
  }
}
// user/email=angel&pwd=123

//   export default getAllUsers;
