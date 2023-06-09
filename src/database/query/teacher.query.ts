import { TeacherType } from '../../types/teacher.type'
import { Teacher } from '../models/teacher.model'
import { Class } from '../models/class.model'
import { Subject } from '../models/subject.model'
import { StudentClass } from '../models/studentClass.model'
import { Student } from '../models/student.model'
import { Module } from '../models/module.model'
import { EnabledModule } from '../models/enabledModule'
import { Challenge } from '../models/challenge.model'
import { Homework } from '../models/homework.model'

export const selectTeachers = async (): Promise<TeacherType[]> => {
  try {
    const teachers = await Teacher.findAll({
      attributes: ['teacher_id', 'first_name', 'last_name', 'email']
    })
    return teachers
  } catch (e: any) {
    throw e
  }
}

export const selectTeacher = async (email: string, password?: string): Promise<TeacherType | null> => {
  try {
    if (password) {
      const teacher = await Teacher.findOne({
        attributes: ['teacher_id', 'first_name', 'last_name', 'email'],
        where: {
          email: email,
          password: password
        }
      })
      return teacher
    } else {
      const teacher = await Teacher.findOne({ raw: true, attributes: ['email'], where: { email: email } })
      return teacher
    }
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const createTeacher = async (teacher: TeacherType): Promise<TeacherType | null> => {
  try {
    const res: TeacherType | null = await selectTeacher(teacher.email)
    const exists: boolean = res !== null && typeof res === 'object' ? true : false
    if (!exists) {
      const res = await Teacher.create(teacher)
      // const user = res.get({ plain: true })
      // console.log('Teacher succcesfully created')
      return res
    } else {
      return null
    }
  } catch (e) {
    throw e
  }
}

export const selectClassesByTeacher = async (teacher_id: string): Promise<Class[]> => {
  try {
    const classesByTeacher = await Class.findAll({
      raw: true,
      attributes: ['class_id', 'is_finished', 'subject_id', 'subject.subject_name', 'days', 'start_time', 'end_time'],
      where: {
        teacher_id: teacher_id
      },
      include: [
        {
          model: Subject,
          attributes: [],
          required: true
        }
      ]
    })
    return classesByTeacher
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const selectTeacherRequests = async (teacher_id: string): Promise<Class[]> => {
  try {
    const teacherRequest = await Class.findAll({
      raw: true,
      attributes: [
        'class_id',
        'subject.subject_id',
        'subject.subject_name',
        'studentclass.student_id',
        'studentclass.student.first_name',
        'studentclass.student.last_name',
        'studentclass.request_date',
        'studentclass.pending'
      ],
      where: {
        teacher_id: teacher_id
      },
      include: [
        {
          model: Subject,
          attributes: []
        },
        {
          model: StudentClass,
          attributes: [],
          required: true,
          include: [
            {
              model: Student,
              attributes: []
            }
          ],
          where: {
            pending: true
          }
        }
      ]
    })

    return teacherRequest
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}



export const selectHomeworksByTeacherId = async (teacher_id: string) => {
  try {
    const homeworks = await Homework.findAll({
      raw: true,
      attributes: ["homework_id", "title", "is_active" , "difficulty_id", "deadline", "class_id", "total_points", "open_questions", "closed_questions"],
      order: [['deadline', 'ASC']],
      include: [
        {
          model: Class,
          attributes: [],
          required: true,
          where: {
            teacher_id: teacher_id
          },
          include: [
            {
              model: Subject,
              attributes: ["subject_name"],
              required: true
    
            }
          ]
        },
      ],
    }) as any

    homeworks.sort((a: any, b: any) => {
      return a["deadline"] - b["deadline"]
    })

    return homeworks
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}