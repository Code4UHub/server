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
        data: {
          id: query[0].student_id,
          role: 'student',
          first_name: query[0].first_name,
          last_name: query[0].last_name,
          email: query[0].email
        }
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
          data: 'Teacher not found'
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
    const emailRegex = /^a\d{8}@tec\.mx$/

    if (!emailRegex.test(student.email)) {
      res.status(400).json({
        status: 'failed',
        data: 'Invalid'
      })
    }

    const query = await createStudent(student)
    console.log(query)
    if (typeof query == 'object') {
      res.status(200).json({
        status: 'success',
        data: {
          id: query.student_id,
          role: 'student',
          first_name: query.first_name,
          last_name: query.last_name,
          email: query.email
        }
      })
    } else {
      res.status(409).json({
        status: 'failed',
        data: 'Student already exists'
      })
    }
    // res.status(202).send('Created student')
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e
    })
  }
}