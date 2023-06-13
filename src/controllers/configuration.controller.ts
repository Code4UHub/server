import { Request, Response } from 'express'
import { selectCurrentTime } from '../database/query/configuration.query'

export const getCurrentTime = async (req: Request, res: Response) => {
  // res.status(200).send('It works!')
  try {
    const query = await selectCurrentTime()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}
