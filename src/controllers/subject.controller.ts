import { Request, Response } from 'express'
import { selectSubjects, createClass } from '../database/query/subject.query'
import { SubjectType } from '../types/subject.type'

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

export const postSubject = async (req: Request, res: Response): Promise<void> => {
  try {
    const newSubject: SubjectType = req.body
    const query = await createClass(newSubject)

    // If class valid and code available
    if (query !== null && typeof query === 'object') {
      res.status(201).json({
        status: 'success',
        data: 'Subject created successfully'
      })
      return
    }

    // If class already exists
    res.status(409).json({
      status: 'failed',
      data: 'Subject id already exists'
    })
    return
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt create module'
    })
  }
}
