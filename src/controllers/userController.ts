import { Request, Response, NextFunction } from 'express';
import { listStudents, searchStudent } from '../database/query/users';

export const getAllUsers = async (req: Request, res: Response) => {
  // res.status(200).send('It works!')
  const query = await listStudents()
  res.status(200).json({
      status: 'success',
      data: query
    });
  };

export const getUser = async (req: Request, res: Response) => {
  const user: string = req.params.email
  const pwd: string = req.params.pwd
  console.log(user)
  console.log(pwd)
  const query = await searchStudent(user, pwd)
  res.status(200).json({
    status: 'success',
    data: {
        query
    },
  });
};

// user/email=angel&pwd=123

//   export default getAllUsers;