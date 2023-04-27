import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt-verify'

const excludedRoutes = [
  'GET /v1/student/login',
  'GET /v1/teacher/login',
  'POST /v1/student/register',
  'POST /v1/teacher/register'
]

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!excludedRoutes.includes(`${req.method} ${req.path}`)) {
      const authHeader = req.headers.authorization

      const token = authHeader && authHeader.split(' ')[1]
      // console.log(token)
      const user_id = req.params.user_id

      if (!token || !verifyToken(token, user_id)) {
        return res.status(401).json({
          status: 'failed',
          data: 'Unauthorized'
        })
      }
    }

    next()
  } catch (e) {
    throw e
  }
}

export default authMiddleware
