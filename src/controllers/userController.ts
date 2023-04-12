import { Request, Response, NextFunction } from 'express';


export const getAllUsers = (req: Request, res: Response) => {
  res.status(200).send('It works!')  
  // res.status(200).json({
    //   status: 'success',
    //   message: 'This returns all users',
    // });
  };

export const getUser = (req: Request, res: Response) => {
  const user = req.params.email
  const pwd= req.params.pwd
    console.log(user)
  console.log(pwd)
  res.status(200).json({
    status: 'Siuuu',
    data: {
        user,
        pwd
    },
  });
};

// user/email=angel&pwd=123

//   export default getAllUsers;