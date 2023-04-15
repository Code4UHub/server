import { Request, Response } from 'express'
import { createStudent, selectStudent, selectStudents } from '../database/query/student'
import { StudentType } from '../types/student.type'

export const getStudents = async (req: Request, res: Response) => {
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

export const getStudent = async (req: Request, res: Response) => {
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
          data: 'Student not found'
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

export const postStudent = async (req: Request, res: Response) => {
  try {
    const student: StudentType = req.body

    console.log(student)
    const query = await createStudent(student)
    console.log(query)
    // if (query)
    res.status(200).json({
      status: 'success',
      data: query
    })
    // res.status(202).send('Created student')
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      data: e
    })
  }
}
