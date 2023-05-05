import { ClassType } from '../../types/class.type'
import { StudentClassType } from '../../types/studentClass.type'
import { Class } from '../models/class.model'
import { StudentClass } from '../models/studentClass.model'
import { Subject } from '../models/subject.model'
import { Teacher } from '../models/teacher.model'
import { Student } from '../models/student.model'
import { StudentNotFoundError } from '../../errors/studentNotFoundError'
import { ClassNotFoundError } from '../../errors/classNotFoundError'

export const selectClasses = async (): Promise<Class[]> => {
  try {
    const classes: Class[] = await Class.findAll({
      raw: true,
      attributes: [
        'class_id',
        'subject_id',
        'subject.subject_name',
        'teacher_id',
        'teacher.first_name',
        'teacher.last_name'
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
        'finished_date',
        'days',
        'start_time',
        'end_time',
        'teacher_id',
        'subject_id',
        'subject.subject_name'
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
          attributes: ['first_name', 'last_name'],
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
      console.log(res)
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
      // raw: true,
      attributes: ['student_id', 'pending', 'permission_date', 'student.first_name', 'student.last_name'],
      where: {
        class_id: class_id
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

export const acceptStudentToClass = async (studentClass: StudentClassType) => {
  try {
    const res = await selectStudentClass(studentClass)
    const studentClassExists = res.length > 0 ? true : false

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
