import { Student } from '../models/student.model'
import { Class } from '../models/class.model'
import { Teacher } from '../models/teacher.model'
import { Subject } from '../models/subject.model'
import { StudentType } from '../../types/student.type'
import { StudentClass } from '../models/studentClass.model'
import { Sequelize } from 'sequelize'
import { StudentNotFoundError } from '../../errors/studentNotFoundError'
import { StudentHomework } from '../models/studentHomework'
import { Homework } from '../models/homework.model'

export const selectStudents = async (): Promise<StudentType[]> => {
  try {
    const students: StudentType[] = await Student.findAll({
      attributes: ['student_id', 'first_name', 'last_name', 'email']
    })
    return students
  } catch (e: any) {
    throw e
  }
}

export const selectStudent = async (email: string, password?: string): Promise<StudentType | null> => {
  try {
    if (password) {
      const student = await Student.findOne({
        attributes: ['student_id', 'first_name', 'last_name', 'email'],
        where: {
          email: email,
          password: password
        }
      })
      return student
    }
    const student = await Student.findOne({ raw: true, attributes: ['email'], where: { email: email } })
    return student
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const createStudent = async (student: StudentType): Promise<StudentType | null> => {
  try {
    const res: StudentType | null = await selectStudent(student.email)
    const exists: boolean = res !== null && typeof res === 'object' ? true : false
    if (!exists) {
      const res = await Student.create(student)
      // const user = res.get({ plain: true })
      // console.log('Student succcesfully created')
      return res
    } else {
      return null
    }
  } catch (e) {
    throw e
  }
}

export const selectClassesByStudent = async (student_id: string): Promise<StudentClass[]> => {
  try {
    const student = await Student.findByPk(student_id)
    if (!student) {
      throw new StudentNotFoundError(`Cannot find student with ID ${student_id}`)
    }

    const classesByStudent = await StudentClass.findAll({
      raw: true,
      attributes: [
        'class_id',
        'pending',
        'class.is_finished',
        'class.days',
        'class.start_time',
        'class.end_time',
        'class.subject.subject_name',
        [
          Sequelize.fn(
            'concat',
            Sequelize.col('class.teacher.first_name'),
            ' ',
            Sequelize.col('class.teacher.last_name')
          ),
          'teacher_name'
        ]
      ],
      where: {
        student_id: student_id
      },
      include: [
        {
          model: Class,
          attributes: [],
          required: true,
          include: [
            {
              model: Teacher,
              attributes: [],
              required: true
            },
            {
              model: Subject,
              attributes: [],
              required: true
            }
          ]
        }
      ]
    })
    return classesByStudent
  } catch (e: any) {
    throw e
  }
}



export const selectHomeworksByStudentId = async (student_id: string) => {
  try {
    const homeworks = await StudentHomework.findAll({
      raw: true,
      attributes: ["homework_id", "homework.title", "homework.deadline", "homework.is_active", "score", "homework.total_points"],
      where: {
        student_id: student_id
      },
      include: [
        {
          model: Homework,
          attributes: [],
          required: true,
          include: [{
            model: Class,
            attributes: ["class_id"],
            required: true,
            include: [{
              model: Subject,
              attributes: ["subject_id", "subject_name"],
              required: true
    
            }]
          }]

        },
        
      ],
    })
    return homeworks
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}