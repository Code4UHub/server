import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

import dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../../.env` })
const secret = process.env.JWT_SECRET as Secret

const currentTimestamp = Math.floor(Date.now() / 1000)
const leewayInSeconds = 60 // allow for 1 minute clock skew
const options = { clockTimestamp: currentTimestamp, clockTolerance: leewayInSeconds }

export const verifyToken = (token: string, user_id: string): boolean => {
  try {
    const decoded = jwt.verify(token, secret, options) as JwtPayload
    console.log(decoded)
    if (decoded.user_id === user_id) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}
