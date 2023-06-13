import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../../.env` })

export const generateToken = (user_id: string, role: string): string => {
  try {
    const secret = process.env.JWT_SECRET as Secret

    const tokenType: { user_id: string; role: string } = {
      user_id: user_id,
      role: role
    }

    const token = jwt.sign(tokenType, secret, { expiresIn: '7d' })

    return token
  } catch (e) {
    throw e
  }
}
