import { Request, Response } from 'express'
import { createTeacher, selectTeacher, selectTeachers } from '../database/query/teacher'
import { TeacherType } from '../types/teacher.type'

export const getTeachers = async (req: Request, res: Response) => {
  try {
    const query = await selectTeachers()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}

export const getTeacher = async (req: Request, res: Response) => {
  try {
    const email: string = req.params.email.replace('email=', '')
    const password: string = req.params.pwd.replace('password=', '')
    console.log(email)
    console.log(password)
    const query = await selectTeacher(email, password)
    console.log('query: ', query)

    if (query.length > 0) {
      res.status(200).json({
        status: 'success',
        data: {
          id: query[0].teacher_id,
          role: 'teacher',
          first_name: query[0].first_name,
          last_name: query[0].last_name,
          email: query[0].email
        }
      })
    } else {
      const exists = await selectTeacher(email)
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

export const postTeacher = async (req: Request, res: Response) => {
  try {
    const teacher: TeacherType = req.body
    const emailRegex = /^[a-zA-Z0-9._%+-]+@tec\.mx$/

    if (!emailRegex.test(teacher.email)) {
      res.status(400).json({
        status: 'failed',
        data: 'Invalid email'
      })
    }

    const query = await createTeacher(teacher)
    console.log(query)
    if (typeof query == 'object') {
      res.status(200).json({
        status: 'success',
        data: {
          id: query.teacher_id,
          role: 'teacher',
          first_name: query.first_name,
          last_name: query.last_name,
          email: query.email
        }
      })
    } else {
      res.status(409).json({
        status: 'failed',
        data: 'Teacher already exists'
      })
    }
    // res.status(202).send('Created student')
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      data: e
    })
  }
}
