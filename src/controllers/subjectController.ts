import { Request, Response } from 'express'
import { selectSubjects } from '../database/query/subject'

export const getSubjects = async (req: Request, res: Response) => {
  // res.status(200).send('It works!')
  try {
    const query = await selectSubjects()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}
