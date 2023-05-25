import { Request, Response } from 'express'
import {
  createChallenge,
  // selectChallengeQuestions,
  createChallengeQuestions,
  selectChallengeQuestionsByStudent
} from '../database/query/challenge.query'
import { ChallengeType } from '../types/challenge.type'

export const postChallenge = async (req: Request, res: Response): Promise<void> => {
  try {
    const newChallenge: ChallengeType = req.body
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

export const getChallengeQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const challenge_id = req.params.challenge_id
    const student_id = req.params.student_id

    const query = await selectChallengeQuestionsByStudent(challenge_id, student_id)
    console.log('000000000000000000000000000000000')
    console.log(query)
    console.log('000000000000000000000000000000000')
    // const query = await createChallenge(newChallenge)

    if (query.length > 0) {
      res.status(201).json({
        status: 'success',
        data: query
      })
      return
    }

    const queryCreate = await createChallengeQuestions(challenge_id, student_id)
    res.status(201).json({
      status: 'success',
      data: queryCreate
    })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get questions'
    })
  }
}
