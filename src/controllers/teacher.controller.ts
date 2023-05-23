import { Request, Response } from 'express'
import {
  createTeacher,
  selectTeacher,
  selectTeachers,
  selectClassesByTeacher,
  selectTeacherRequests
} from '../database/query/teacher.query'
import { TeacherType } from '../types/teacher.type'
import { generateToken } from '../utils/jwt-sign'
import { Class } from '../database/models/class.model'
import { Challenge } from '../database/models/challenge.model'
import { Module } from '../database/models/module.model'
import { EnabledModule } from '../database/models/enabledModule'

export const getTeachers = async (req: Request, res: Response): Promise<void> => {
  try {
    const query: TeacherType[] = await selectTeachers()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get teachers'
    })
  }
}

export const getTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const email: string = req.query.email as string
    const password: string = req.query.password as string
    const emailRegex = /^[a-zA-Z0-9._%+-]+@tec\.mx$/

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
    const query: TeacherType | null = await selectTeacher(email, password)
    if (query !== null && typeof query === 'object') {
      const token = generateToken(query.teacher_id, 'teacher')
      // console.log(token)
      // res.set('Authorization', `Bearer ${token}`)
      res.status(200).json({
        status: 'success',
        auth_token: token,
        data: {
          id: query.teacher_id,
          role: 'teacher',
          first_name: query.first_name,
          last_name: query.last_name,
          email: query.email
        }
      })
      return
    }

    // If email correct but password incorrect
    const exists: TeacherType | null = await selectTeacher(email)
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
      data: 'Teacher not found'
    })
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      auth_token: '',
      data: 'Couldnt log in'
    })
  }
}

export const postTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const teacher: TeacherType = req.body
    const emailRegex = /^[a-zA-Z0-9._%+-]+@tec\.mx$/

    if (!emailRegex.test(teacher.email)) {
      res.status(400).json({
        status: 'failed',
        auth_token: '',
        data: 'Invalid email'
      })
    }

    // If email valid and not in use
    const query = await createTeacher(teacher)

    if (query !== null && typeof query == 'object') {
      const token = generateToken(teacher.teacher_id, 'teacher')
      // res.set('Authorization', `Bearer ${token}`)

      res.status(200).json({
        status: 'success',
        auth_token: token,
        data: {
          id: query.teacher_id,
          role: 'teacher',
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
      data: 'Teacher already exists'
    })
    return
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      auth_token: '',
      data: 'Couldnt register teacher'
    })
  }
}

export const getTeacherClasses = async (req: Request, res: Response) => {
  try {
    const teacher_id: string = req.params.teacher_id as string
    const query: Class[] = await selectClassesByTeacher(teacher_id)

    if (query.length > 0) {
      res.status(200).json({
        status: 'success',
        data: query
      })
    } else {
      res.status(404).json({
        status: 'failed',
        data: 'Classes not found for that user'
      })
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e
    })
  }
}

export const getTeacherRequest = async (req: Request, res: Response) => {
  try {
    const teacher_id: string = req.params.teacher_id as string
    const query = await selectTeacherRequests(teacher_id)

    res.status(200).json({
      status: 'success',
      data: query
    })
    return
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e
    })
  }
}

export const getChallengesByClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const class_id: string = req.params.class_id as string
    const query: EnabledModule[] = await selectChallengesByClass(class_id)

    // If class has more than one student
    if (query.length > 0) {
      res.status(200).json({
        status: 'success',
        data: query
      })
      return
    }

    // If class doesnt have any students
    res.status(204).json({
      status: 'success',
      data: []
    })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get challenges of class'
    })
  }
}

export const selectChallengesByClass = async (class_id: string): Promise<EnabledModule[]> => {
  try {
    const challengesByClass = await EnabledModule.findAll({
      raw: false,
      attributes: ['module_id'],
      where: {
        class_id: class_id
      },
      // group: ['module.module_id'],
      include: [
        {
          model: Module,
          attributes: ['module_id', 'title'],
          required: true,
          // nested: true,
          include: [
            {
              model: Challenge,
              attributes: ['title'],
              required: true
            }
          ]
        }
      ]
    })
    return challengesByClass
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}
