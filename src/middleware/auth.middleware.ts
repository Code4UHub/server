import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt-verify'

const excludedRoutes = ['GET /v1/student', 'GET /v1/teacher']

// const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1]
//   const user_id = req.params.user_id
//
//   if (!token || !verifyToken(token, user_id)) {
//     return res.status(401).json({
//       status: 'error',
//       message: 'Unauthorized'
//     })
//   }
//
//   next()
// }

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // const excludedRoutes = ['POST /signup', 'POST /login']

  if (!excludedRoutes.includes(`${req.method} ${req.path}`)) {
    console.log('Hello from the midleware 👋')
    const token = req.headers.authorization?.split(' ')[1]
    const user_id = req.params.user_id

    if (!token || !verifyToken(token, user_id)) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized'
      })
    }
  }

  next()
}

export default authMiddleware
