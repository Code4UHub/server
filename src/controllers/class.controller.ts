import { Request, Response } from 'express'
import { selectClasses, selectClass, createClass } from '../database/query/class.query'
import { ClassType } from '../types/class.type'
import { Class } from '../database/models/class.model'

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

export const getClass = async (req: Request, res: Response) => {
  try {
    const class_id: string = req.params.id as string
    const query = await selectClass(class_id)

    if (query.length > 0) {
      res.status(200).json({
        status: 'success',
        data: query
      })
    } else {
      res.status(404).json({
        status: 'failed',
        data: []
      })
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e.message
    })
  }
}

export const postClass = async (req: Request, res: Response) => {
  try {
    const new_class: ClassType = req.body
    const query = await createClass(new_class)

    if (typeof query == 'object') {
      res.status(200).json({
        status: 'success',
        data: query
      })
    } else {
      res.status(409).json({
        status: 'failed',
        data: 'Class already exists'
      })
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e
    })
  }
}
