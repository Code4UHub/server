import { ClassType } from '../../types/class.type'
import { StudentClassType } from '../../types/studentClass.type'
import { Class } from '../models/class.model'
import { StudentClass } from '../models/studentClass.model'
import { Subject } from '../models/subject.model'
import { Teacher } from '../models/teacher.model'
import { Student } from '../models/student.model'
import { Challenge } from '../models/challenge.model'
import { ChallengeType } from '../../types/challenge.type'

import { Module } from '../models/module.model'
import { StudentNotFoundError } from '../../errors/studentNotFoundError'
import { ClassNotFoundError } from '../../errors/classNotFoundError'
import { Sequelize } from 'sequelize'
import { EnabledModule } from '../models/enabledModule'

export const selectClasses = async (): Promise<Class[]> => {
  try {
    const classes: Class[] = await Class.findAll({
      raw: true,
      attributes: [
        'class_id',
        'is_finished',
        'subject_id',
        'subject.subject_name',
        'teacher_id',
        [Sequelize.literal('"teacher"."first_name" || \' \' || "teacher"."last_name"'), 'teacher_name']
      ],
      include: [
        {
          model: Subject,
          attributes: [],
          required: true
        },
        {
          model: Teacher,
          attributes: [],
          required: true
        }
      ]
    })
    return classes
  } catch (e: any) {
    throw e
  }
}

export const selectClass = async (id: string): Promise<Class | null> => {
  try {
    const classDb: Class | null = await Class.findOne({
      raw: true,
      attributes: [
        'class_id',
        'is_finished',
        'finished_date',
        'days',
        'start_time',
        'end_time',
        'teacher_id',
        'subject_id',
        'subject.subject_name',
        [Sequelize.literal('"teacher"."first_name" || \' \' || "teacher"."last_name"'), 'teacher_name']
      ],
      where: {
        class_id: id
      },
      include: [
        {
          model: Subject,
          attributes: [],
          required: true
        },
        {
          model: Teacher,
          attributes: [],
          required: true
        }
      ]
    })
    return classDb
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const createClass = async (classDb: ClassType): Promise<Class | null> => {
  try {
    const res = await selectClass(classDb['class_id'])
    const exists: boolean = res !== null && typeof res === 'object' ? true : false

    if (!exists) {
      const res = await Class.create(classDb)
      // const user = res.get({ plain: true })
      // console.log('Class succcesfully created')
      return res
    } else {
      return null
    }
  } catch (e: any) {
    throw e
  }
}

export const selectStudentClass = async (studentClass: StudentClassType): Promise<StudentClass | null> => {
  try {
    const student = await Student.findByPk(studentClass.student_id)
    if (!student) {
      throw new StudentNotFoundError(`Cannot find student with ID ${studentClass.student_id}`)
    }

    const class_ = await Class.findByPk(studentClass.class_id)
    if (!class_) {
      throw new ClassNotFoundError(`Cannot find class with ID ${studentClass.student_id}`)
    }

    const studentsByClass = await StudentClass.findOne({
      where: {
        class_id: studentClass.class_id,
        student_id: studentClass.student_id
      }
    })
    return studentsByClass
  } catch (e: any) {
    throw e
  }
}

export const registerStudentToClass = async (newStudentClass: StudentClassType): Promise<StudentClass | null> => {
  try {
    const res: StudentClass | null = await selectStudentClass(newStudentClass)
    const studentRegistered: boolean = res !== null && typeof res === 'object' ? true : false

    if (!studentRegistered) {
      const res = await StudentClass.create(newStudentClass)

      // const user = res.get({ plain: true })
      // console.log('Student succcesfully registered')
      return res
    }
    return null
  } catch (e: any) {
    throw e
  }
}

export const selectStudentsByClass = async (class_id: string): Promise<StudentClass[]> => {
  try {
    const studentsByClass = await StudentClass.findAll({
      raw: true,
      attributes: ['student_id', 'pending', 'request_date', 'student.first_name', 'student.last_name'],
      where: {
        class_id: class_id,
        pending: false
      },
      include: [
        {
          model: Student,
          attributes: [],
          required: true
        }
      ]
    })
    return studentsByClass
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const acceptStudentToClass = async (studentClass: StudentClassType): Promise<number[] | string> => {
  try {
    const res = await selectStudentClass(studentClass)
    const studentClassExists = res ? true : false

    if (studentClassExists) {
      const acceptedStudent = await StudentClass.update(
        { pending: false },
        {
          where: {
            class_id: studentClass.class_id,
            student_id: studentClass.student_id,
            pending: true
          }
        }
      )

      // check if a row was updated or not
      if (acceptedStudent[0] == 0) {
        return 'Student already registered to that class'
      } else {
        return acceptedStudent
      }
    } else {
      return 'Student is not registered to that class'
    }
  } catch (e: any) {
    console.log(e)
    return 'Error at acepting student'
  }
}

export const rejectStudentToClass = async (studentClass: StudentClassType): Promise<number | string> => {
  try {
    const res = await selectStudentClass(studentClass)
    const studentClassExists = res ? true : false

    if (studentClassExists) {
      const deletedStudent = await StudentClass.destroy({
        where: {
          class_id: studentClass.class_id,
          student_id: studentClass.student_id,
          pending: true
        }
      })

      if (deletedStudent == 0) {
        return 'Student is already accepted into that class'
      } else {
        return deletedStudent
      }
    } else {
      return 'Student is not registered to that class'
    }
  } catch (e: any) {
    return 'Error at rejecting student'
  }
}

export const acceptManyStudentToClass = async (arrStudentClass: StudentClassType[]) => {
  try {
    const arrStudentClassStatus = arrStudentClass.map(async (stuCla) => {
      const query = await acceptStudentToClass(stuCla)

      // If the student is successfully accepted
      if (Array.isArray(query)) {
        return {
          student_id: stuCla.student_id,
          class_id: stuCla.class_id,
          status: 'Accepted'
        }
      } else {
        // If there was an error at accepting the student
        return {
          student_id: stuCla.student_id,
          class_id: stuCla.class_id,
          status: query
        }
      }
    })

    return arrStudentClassStatus
  } catch (e: any) {
    return 'Error at acepting students'
  }
}

export const rejectManyStudentToClass = async (arrStudentClass: StudentClassType[]) => {
  try {
    const arrStudentClassStatus = arrStudentClass.map(async (stuCla) => {
      const query = await rejectStudentToClass(stuCla)

      // if the student is successfully rejected
      if (typeof query == 'number' && query > 0) {
        return {
          student_id: stuCla.student_id,
          class_id: stuCla.class_id,
          status: 'Rejected'
        }
      } else {
        // If there was an error at rejecting the student
        return {
          student_id: stuCla.student_id,
          class_id: stuCla.class_id,
          status: query
        }
      }
    })
    return arrStudentClassStatus
  } catch (e: any) {
    return 'Error at rejecting student'
  }
}

export const selectChallengesByClass = async (class_id: string): Promise<EnabledModule[]> => {
  try {
    const challengesByClass = await EnabledModule.findAll({
      raw: true,
      attributes: ['module_id'],
      where: {
        class_id: class_id
      },
      // group: ['module.module_id'],
      include: [
        {
          model: Module,
          attributes: [],
          required: true,
          nested: true,
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
