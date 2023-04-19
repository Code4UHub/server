import { Request, Response } from 'express'
import { selectModuleById, selectModulesBySubject } from '../database/query/module'

export const getModulesBySubject = async (req: Request, res: Response) => {
  // res.status(200).send('It works!')
  try {
    const subject_id: string = req.params.subject_id
    console.log(subject_id)
    const query = await selectModulesBySubject(subject_id)
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}

export const getModuleById = async (req: Request, res: Response) => {
  // res.status(200).send('It works!')
  try {
    const module_id: number = parseInt(req.params.module_id)
    console.log(module_id)
    const query = await selectModuleById(module_id)
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}
