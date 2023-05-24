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
  selectChallengesByClass,
  selectEnabledModulesByClass,
  updateEnabledModulesByClass
} from '../database/query/class.query'
import { ClassType } from '../types/class.type'
import { Class } from '../database/models/class.model'
import { StudentClassType } from '../types/studentClass.type'
import { StudentClass } from '../database/models/studentClass.model'
import { StudentNotFoundError } from '../errors/studentNotFoundError'
import { ClassNotFoundError } from '../errors/classNotFoundError'
import { EnabledModule } from '../database/models/enabledModule'

/**
 * Retrieves all existing classes.
 *
 * @returns
 * - 200: If classes could be retrived.
 *
 * @throws 500: If there is a server-side error.
 */
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

/**
 * Retrieves a class given its id.
 *
 * @returns
 * - 200: If the class exists.
 * - 404: If a class with that id doesn't exist.
 *
 * @throws 500: If there is a server-side error.
 */
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
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get class'
    })
  }
}

/**
 * Creates a class given some expected parameters
 *
 * @returns
 * - 201: If the class is created.
 * - 409: If the class already exists.
 *
 * @throws 500: If there is a server-side error.
 *
 * @remarks Not checking if any of the other values are valid
 */
export const postClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const newClass: ClassType = req.body
    const query = await createClass(newClass)

    // Class valid and code available
    if (query !== null && typeof query === 'object') {
      res.status(201).json({
        status: 'success',
        data: 'Class created successfully'
      })
      return
    }

    // Class already exists
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

/**
 * Register a student to a class.
 *
 * @returns
 * - 200: If student register.
 * - 409: If student already in class.
 *
 * @throws
 * - 409: Student doesnt exist.
 * - 409: Class doesnt exist.
 * - 500: If there is a server-side error.
 */
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

/**
 * Retrieve students registered to a class given a class_id.
 *
 * @returns 200: If students retrieved.
 *
 * @throws 500: If there is a server-side error.
 */
export const getStudentsByClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const class_id: string = req.params.class_id as string
    const query: StudentClass[] = await selectStudentsByClass(class_id)

    res.status(200).json({
      status: 'success',
      data: query
    })
    return
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get students of class'
    })
  }
}

/**
 * Accept a student in a class.
 *
 * @returns
 * - 200: If student accepted.
 * - 400: If student not registered or already accepted class.
 *
 * @throws 500: If there is a server-side error.
 *
 * @remarks Check if error handling is been performed properly
 */
export const putStudentClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const curStudentClass: StudentClassType = req.body
    const query = await acceptStudentToClass(curStudentClass)

    // If the student was accepted
    if (Array.isArray(query)) {
      res.status(200).json({
        status: 'success',
        data: 'Student accepted'
      })
      return
    }

    // If student couldnt be accepted
    res.status(400).json({
      status: 'failed',
      data: query
    })
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt accept student to class'
    })
  }
}

/**
 * Reject a student in a class.
 *
 * @returns
 * - 200: If student rejected.
 * - 400: If student not registered or already accepted class.
 *
 * @throws 500: If there is a server-side error.
 *
 * @remarks Check if error handling is been performed properly
 */
export const deleteStudentClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const curStudentClass: StudentClassType = req.body
    const query = await rejectStudentToClass(curStudentClass)

    // If the student was rejected
    if (typeof query == 'number' && query > 0) {
      res.status(200).json({
        status: 'success',
        data: 'Student rejected'
      })
      return
    }

    // If student couldnt be rejected
    res.status(400).json({
      status: 'failed',
      data: query
    })
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt reject student from class'
    })
  }
}

/**
 * Accept many students to their corresponding classes.
 *
 * @returns
 * - 200: If all students accepted.
 * - 401: If some students were accepted but not all of them.
 *
 * @throws 500: If there is a server-side error.
 *
 * @remarks Check if error handling is been performed properly
 * Check if Promise.all cant be fullfilled so raise an error there
 */
export const putManyStudentClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const arrStudentClass: StudentClassType[] = req.body
    const query = await acceptManyStudentToClass(arrStudentClass)

    // Check the list if there was an error at accepting one student
    const listOfStudents = await Promise.all(query)

    // Check how many students where accepted
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
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt perform action'
    })
  }
}

/**
 * Reject many students to their corresponding classes.
 *
 * @returns
 * - 200: If all students accepted.
 * - 401: If some students were accepted but not all of them.
 * - ***: If
 *
 * @throws 500: If there is a server-side error.
 */
export const deleteManyStudentClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const arrStudentClass: StudentClassType[] = req.body
    const query = await rejectManyStudentToClass(arrStudentClass)

    // Check the list if there was an error at rejecting one student
    const listOfStudents = await Promise.all(query)

    // Check how many students where rejected
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
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt perform action'
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

export const getEnabledModulesByClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const class_id: string = req.params.class_id as string
    const query: EnabledModule[] = await selectEnabledModulesByClass(class_id)

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
      data: 'Couldnt get enabled of class'
    })
  }
}

export const putEnabledModulesByClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const class_id: string = req.params.class_id as string
    const modules = req.body
    const query = await updateEnabledModulesByClass(class_id, modules)

    const listOfModules = await Promise.all(query)

    const numberOfModules = listOfModules.length
    let validModules = 0
    let invalidModules = 0

    for (const module of listOfModules) {
      if (module.status == 'success') {
        validModules += 1
      } else {
        invalidModules += 1
      }
    }

    if (numberOfModules == validModules) {
      res.status(200).json({
        status: 'success',
        data: `${validModules} modules correctly updated`
      })
      return
    }

    res.status(401).json({
      status: 'failed',
      data: `${validModules} modules correctly updated and there were errors at updating ${invalidModules} modules`
    })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get enabled of class'
    })
  }
}
