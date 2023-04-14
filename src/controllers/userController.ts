import { Request, Response, NextFunction } from 'express'
import { listStudents, searchStudent } from '../database/query/users'

export const getAllUsers = async (req: Request, res: Response) => {
  // res.status(200).send('It works!')
  const query = await listStudents()
  res.status(200).json({
    status: 'success',
    data: query
  })
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const email: string = req.params.email.replace('email=', '')
    const pwd: string = req.params.pwd.replace('pwd=', '')
    console.log(email)
    console.log(pwd)
    const query = await searchStudent(email, pwd)
    console.log(query)
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      data: 'empty'
    })
  }
}

// user/email=angel&pwd=123

//   export default getAllUsers;
