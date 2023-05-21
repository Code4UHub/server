import { Request, Response } from 'express'
import { createStudent, selectStudent, selectStudents } from '../database/query/student.query'
import { selectClassesByStudent } from '../database/query/student.query'
import { StudentType } from '../types/student.type'
import { generateToken } from '../utils/jwt-sign'
import { StudentClass } from '../database/models/studentClass.model'
import { StudentNotFoundError } from '../errors/studentNotFoundError'

/**
 * Retrieves all existing students.
 *
 * @returns 200: If students could be retrieved
 *
 * @throws 500: If there is an error retrieving the students.
 */
export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const query: StudentType[] = await selectStudents()
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

/**
 * Retrieves a student based on the provided email and password.
 *
 * @returns
 * - 200: If the login is successful and the student information is found.
 * - 400: If the provided email is invalid.
 * - 401: If the provided password is incorrect.
 * - 404: If the student is not found.
 *
 * @throws 500: If there is a server-side error.
 */
export const getStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const email: string = req.query.email as string
    const password: string = req.query.password as string
    const emailRegex = /^a\d{8}@tec\.mx$/

    // If email incorrect then return
    if (!emailRegex.test(email)) {
      res.status(400).json({
        status: 'failed',
        auth_token: '',
        data: 'Invalid email'
      })
      return
    }

    // If login successfull
    const query: StudentType | null = await selectStudent(email, password)
    if (query !== null && typeof query === 'object') {
      const token: string = generateToken(query.student_id, 'student')
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
    const exists: StudentType | null = await selectStudent(email)
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

/**
 * Creates a student based on the provided credentials
 *
 * @returns
 * - 200: If the login is successful and the student information is found.
 * - 400: If the provided email is invalid.
 * - 404: If the student is not found.
 * - 409: If the email is already in use.
 *
 * @throws 500: If there is a server-side error.
 */
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
    const query: StudentType | null = await createStudent(student)
    if (query !== null && typeof query == 'object') {
      const token: string = generateToken(student.student_id, 'student')
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

/**
 * Retrieves all the classes a student is registered to.
 *
 * @returns
 * - 200: If the student is registered to one or more classes.
 * - 409: If the student doesnt exist
 *
 * @throws 500: If there is a server-side error.
 */
export const getStudentClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    const student_id: string = req.params.student_id
    const query: StudentClass[] = await selectClassesByStudent(student_id)

    res.status(200).json({
      status: 'success',
      data: query
    })
    return
  } catch (e: any) {
    if (e instanceof StudentNotFoundError) {
      res.status(409).json({
        status: 'failed',
        data: e.message
      })
      return
    }

    res.status(500).json({
      status: 'error',
      data: 'Couldnt get student classes'
    })
  }
}
