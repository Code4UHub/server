import { Request, Response } from 'express'
import {
  selectClasses,
  selectClass,
  createClass,
  registerStudentToClass,
  selectStudentsByClass,
  acceptStudentToClass
} from '../database/query/class.query'
import { selectSubject } from '../database/query/subject.query'
import { ClassType } from '../types/class.type'
import { Class } from '../database/models/class.model'
import { StudentClassType } from '../types/studentClass.type'

export const getClasses = async (req: Request, res: Response) => {
  try {
    const query = await selectClasses()

    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}

export const getClass = async (req: Request, res: Response) => {
  try {
    const class_id: string = req.params.class_id as string
    const query = await selectClass(class_id)

    if (query.length > 0) {
      res.status(200).json({
        status: 'success',
        data: query
      })
    } else {
      res.status(404).json({
        status: 'failed',
        data: []
      })
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e.message
    })
  }
}

export const postClass = async (req: Request, res: Response) => {
  try {
    const newClass: ClassType = req.body
    const query = await createClass(newClass)

    if (typeof query == 'object') {
      res.status(200).json({
        status: 'success',
        data: query
      })
    } else {
      res.status(409).json({
        status: 'failed',
        data: 'Class already exists'
      })
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e
    })
  }
}

export const postRegisterStudent = async (req: Request, res: Response) => {
  try {
    const newStudentClass: StudentClassType = req.body
    newStudentClass.class_id = req.params.class_id
    const query = await registerStudentToClass(newStudentClass)

    if (typeof query == 'object') {
      res.status(200).json({
        status: 'success',
        data: query
      })
    } else {
      res.status(409).json({
        status: 'failed',
        data: query
      })
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e
    })
  }
}

export const getStudentsByClass = async (req: Request, res: Response) => {
  try {
    const class_id: string = req.params.class_id as string
    const query = await selectStudentsByClass(class_id)

    if (query.length > 0) {
      res.status(200).json({
        status: 'success',
        data: query
      })
    } else {
      res.status(404).json({
        status: 'failed',
        data: []
      })
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e.message
    })
  }
}

export const putStudentClass = async (req: Request, res: Response) => {
  try {
    const newStudentClass: StudentClassType = req.body
    const query = await acceptStudentToClass(newStudentClass)

    // If the query is successfull
    if (Array.isArray(query)) {
      res.status(200).json({
        status: 'success',
        data: 'Ok'
      })
    } else {
      res.status(400).json({
        status: 'failed',
        data: query
      })
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e.message
    })
  }
}
