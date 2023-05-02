import { Request, Response } from 'express'
import { createStudent, selectStudent, selectStudents } from '../database/query/student.query'
import { selectClassesByStudent } from '../database/query/student.query'
import { SelectedStudentType, StudentType } from '../types/student.type'
import { generateToken } from '../utils/jwt-sign'
import { StudentClass } from '../database/models/studentClass.model'

export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const query: SelectedStudentType[] = await selectStudents()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get students'
    })
  }
}

export const getStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const email: string = req.query.email as string
    const password: string = req.query.password as string
    const emailRegex = /^a\d{8}@tec\.mx$/

    // If email not correct the return
    if (!emailRegex.test(email)) {
      res.status(400).json({
        status: 'failed',
        auth_token: '',
        data: 'Invalid email'
      })
      return
    }

    // If login successfull
    const query: SelectedStudentType | null = await selectStudent(email, password)
    if (query !== null && typeof query === 'object') {
      const token: string = generateToken(query.student_id)
      // console.log(token)
      // res.set('Authorization', `Bearer ${token}`)
      res.status(200).json({
        status: 'success',
        auth_token: token,
        data: {
          id: query.student_id,
          role: 'student',
          first_name: query.first_name,
          last_name: query.last_name,
          email: query.email
        }
      })
      return
    }

    // If email correct but password incorrect
    const exists: SelectedStudentType | null = await selectStudent(email)
    if (exists !== null && typeof exists === 'object') {
      res.status(401).json({
        status: 'failed',
        auth_token: '',
        data: 'Incorrect password'
      })
      return
    }

    // If valid email but account doesnt exists
    res.status(404).json({
      status: 'failed',
      auth_token: '',
      data: 'Student not found'
    })
    return
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      auth_token: '',
      data: 'Couldnt log in'
    })
  }
}

export const postStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student: StudentType = req.body
    const emailRegex = /^a\d{8}@tec\.mx$/

    // If email is invalid
    if (!emailRegex.test(student.email)) {
      res.status(400).json({
        status: 'failed',
        auth_token: '',
        data: 'Invalid email'
      })
    }

    // If email valid and not in use
    const query: SelectedStudentType | null = await createStudent(student)
    if (query !== null && typeof query == 'object') {
      const token: string = generateToken(student.student_id)
      // res.set('Authorization', `Bearer ${token}`)
      res.status(200).json({
        status: 'success',
        auth_token: token,
        data: {
          id: query.student_id,
          role: 'student',
          first_name: query.first_name,
          last_name: query.last_name,
          email: query.email
        }
      })
      return
    }

    // If email is valid but already in use
    res.status(409).json({
      status: 'failed',
      auth_token: '',
      data: 'Student already exists'
    })
    return
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      auth_token: '',
      data: 'Couldnt register student'
    })
  }
}

export const getStudentClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    const student_id: string = req.params.student_id
    const query: StudentClass[] = await selectClassesByStudent(student_id)

    // If student registered to one or more classes
    if (query.length > 0) {
      res.status(200).json({
        status: 'success',
        data: query
      })
      return
    }

    // If student not registered to any classes
    res.status(204).json({
      status: 'success',
      data: 'Classes not found for that user'
    })
    return
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: e
    })
  }
}
