import { Request, Response } from 'express'
import {
  selectClasses,
  selectClass,
  createClass,
  registerStudentToClass,
  selectStudentsByClass,
  acceptStudentToClass,
  rejectStudentToClass,
  acceptManyStudentToClass,
  rejectManyStudentToClass,
  selectChallengesByClass
} from '../database/query/class.query'
import { ClassType } from '../types/class.type'
import { Class } from '../database/models/class.model'
import { StudentClassType } from '../types/studentClass.type'
import { StudentClass } from '../database/models/studentClass.model'
import { StudentNotFoundError } from '../errors/studentNotFoundError'
import { ClassNotFoundError } from '../errors/classNotFoundError'
import { Challenge } from '../database/models/challenge.model'
import { Module } from '../database/models/module.model'
import { EnabledModule } from '../database/models/enabledModule'

export const getClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    const query: Class[] = await selectClasses()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get classes'
    })
  }
}

export const getClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const class_id: string = req.params.class_id as string
    const query: Class | null = await selectClass(class_id)

    if (query) {
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

export const postClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const newClass: ClassType = req.body
    const query = await createClass(newClass)

    // If class valid and code available
    if (query !== null && typeof query === 'object') {
      res.status(201).json({
        status: 'success',
        data: 'Class created successfully'
      })
      return
    }

    // If class already exists
    res.status(409).json({
      status: 'failed',
      data: 'Class already exists'
    })
    return
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt create class'
    })
  }
}

export const postRegisterStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newStudentClass: StudentClassType = req.body
    newStudentClass.class_id = req.params.class_id
    const query = await registerStudentToClass(newStudentClass)

    // If student not in class then register him
    if (query !== null && typeof query === 'object') {
      res.status(200).json({
        status: 'success',
        data: 'Student registered'
      })
    } else {
      // If student already in class
      res.status(409).json({
        status: 'failed',
        data: 'Student already in class'
      })
    }

    return
  } catch (e: any) {
    if (e instanceof StudentNotFoundError) {
      res.status(409).json({
        status: 'failed',
        data: 'Student doesnt exist'
      })
      return
    }
    if (e instanceof ClassNotFoundError) {
      res.status(409).json({
        status: 'failed',
        data: 'Class doesnt exist'
      })
      return
    }
    res.status(500).json({
      status: 'error',
      data: 'Couldnt register student'
    })
  }
}

export const getStudentsByClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const class_id: string = req.params.class_id as string
    const query: StudentClass[] = await selectStudentsByClass(class_id)

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
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get students of class'
    })
  }
}

export const putStudentClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const curStudentClass: StudentClassType = req.body
    const query = await acceptStudentToClass(curStudentClass)

    // If the query is successfull
    if (Array.isArray(query)) {
      res.status(200).json({
        status: 'success',
        data: 'Student accepted'
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

export const deleteStudentClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const curStudentClass: StudentClassType = req.body
    const query = await rejectStudentToClass(curStudentClass)

    // If the query is successfull
    if (typeof query == 'number' && query > 0) {
      res.status(200).json({
        status: 'success',
        data: 'Student successfully rejected'
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

export const putManyStudentClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const arrStudentClass: StudentClassType[] = req.body
    const query = await acceptManyStudentToClass(arrStudentClass)

    // If the query was successful
    if (typeof query != 'string') {
      // Check the list if there was an error at accepting one student
      const listOfStudents = await Promise.all(query)

      const numberOfStudents = listOfStudents.length
      let validStudents = 0
      let invalidStudents = 0

      for (const student of listOfStudents) {
        if (student.status != 'Accepted') {
          invalidStudents += 1
        } else {
          validStudents += 1
        }
      }

      // No errors at acepting all students
      if (numberOfStudents == validStudents) {
        res.status(200).json({
          status: 'success',
          data: `${validStudents} students accepted`
        })
      } else {
        res.status(401).json({
          status: 'failed',
          data: `${validStudents} students accepted and there were errors at accepting ${invalidStudents} students`
        })
      }
    } else {
      throw new Error()
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e.message
    })
  }
}

export const deleteManyStudentClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const arrStudentClass: StudentClassType[] = req.body
    const query = await rejectManyStudentToClass(arrStudentClass)

    // If the query is successfull
    // If the query was successful
    if (typeof query != 'string') {
      // Check the list if there was an error at rejecting one student
      const listOfStudents = await Promise.all(query)
      const numberOfStudents = listOfStudents.length
      let validStudents = 0
      let invalidStudents = 0

      for (const student of listOfStudents) {
        if (student.status != 'Rejected') {
          invalidStudents += 1
        } else {
          validStudents += 1
        }
      }

      // No errors at rejecting all students
      if (numberOfStudents == validStudents) {
        res.status(200).json({
          status: 'success',
          data: `${validStudents} students rejected`
        })
      } else {
        res.status(401).json({
          status: 'failed',
          data: `${validStudents} students rejected and there were errors at rejecting ${invalidStudents} students`
        })
      }
    } else {
      throw new Error()
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e.message
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
