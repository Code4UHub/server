import { Request, Response } from 'express'
import { selectClasses } from '../database/query/class.query'

export const getClasses = async (req: Request, res: Response) => {
  // res.status(200).send('It works!')
  try {
    const query = await selectClasses()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}
