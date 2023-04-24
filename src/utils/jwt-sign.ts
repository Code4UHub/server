import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../../.env` })

export const generateToken = (user_id: string): string => {
  try {
    const secret = process.env.JWT_SECRET as Secret
    const token = jwt.sign({ user_id: user_id }, secret, { expiresIn: '7d' })
    return token
  } catch (e) {
    throw e
  }
}
