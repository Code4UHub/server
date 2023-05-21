import { Request, Response } from 'express'
import { createChallenge } from '../database/query/challenge.query'
import { ChallengeType } from '../types/challenge.type'

export const postChallenge = async (req: Request, res: Response): Promise<void> => {
  try {
    const newChallenge: ChallengeType = req.body
    console.log('--------------------------')
    console.log(newChallenge)
    console.log('--------------------------')
    const query = await createChallenge(newChallenge)

    res.status(201).json({
      status: 'success',
      data: { message: 'Challenge created successfully', challenge: query }
    })

    return
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt create challenge'
    })
  }
}
