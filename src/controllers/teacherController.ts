import { Request, Response } from 'express'
import { selectTeacher, selectTeachers } from '../database/query/teacher'
import { TeacherType } from '../types/teacher.type'

export const getTeachers = async (req: Request, res: Response) => {
  try {
    const query = await selectTeachers()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}

export const getTeacher = async (req: Request, res: Response) => {
  try {
    const email: string = req.params.email.replace('email=', '')
    const password: string = req.params.pwd.replace('password=', '')
    console.log(email)
    console.log(password)
    const query = await selectTeacher(email, password)
    console.log('query: ', query)

    if (query.length > 0) {
      res.status(200).json({
        status: 'success',
        data: {
          id: query[0].teacher_id,
          role: 'teacher',
          first_name: query[0].first_name,
          last_name: query[0].last_name,
          email: query[0].email
        }
      })
    } else {
      const exists = await selectTeacher(email)
      if (exists.length > 0) {
        res.status(401).json({
          status: 'failed',
          data: 'Incorrect password'
        })
      } else {
        res.status(404).json({
          status: 'failed',
          data: 'Student not found'
        })
      }
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e.message
    })
  }
}

// export const postTeacher = async (req: Request, res: Response) => {
//   try {
//     const student: TeacherType = req.body

//     console.log(student)
//     const query = await createTeacher(student)
//     console.log(query)
//     // if (query)
//     res.status(200).json({
//       status: 'success',
//       data: query
//     })
//     // res.status(202).send('Created student')
//   } catch (e) {
//     res.status(404).json({
//       status: 'failed',
//       data: e
//     })
//   }
// }
