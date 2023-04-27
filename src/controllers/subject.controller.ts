import { Request, Response } from 'express'
import { selectSubjects } from '../database/query/subject.query'

export const getSubjects = async (req: Request, res: Response) => {
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
