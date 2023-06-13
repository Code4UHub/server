import { Request, Response } from 'express'
import { selectDifficulty, selectDifficulties } from '../database/query/difficulty.query'

export const getDifficulty = async (req: Request, res: Response) => {
  try {
    const difficulty_id: number = parseInt(req.params.difficulty_id)

    const query = await selectDifficulty(difficulty_id)
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}

export const getDifficulties = async (req: Request, res: Response) => {
  try {
    const query = await selectDifficulties()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}
