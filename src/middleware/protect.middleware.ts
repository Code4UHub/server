import { Request, Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

// middleware to protect routes for teachers only
const protectMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // check if the user is authenticated
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const secret = process.env.JWT_SECRET as Secret

  try {
    // decode the token to get the user information
    const decoded = jwt.verify(token, secret)
    let role = ''

    if (typeof decoded == 'object') {
      role = decoded.role
    }

    // check if the user is not a teacher
    if (role !== 'teacher') {
      return res.status(403).json({ status: 'Failed', message: 'Forbidden' })
    }

    // if the user is authenticated and is a teacher, continue to the next middleware or route handler
    next()
  } catch (error) {
    return res.status(401).json({ status: 'Failed', message: 'Unauthorized' })
  }
}

export default protectMiddleware
