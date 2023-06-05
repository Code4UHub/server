import { Request, Response } from 'express'
import {
  createChallenge,
  // selectChallengeQuestions,
  createChallengeQuestions,
  selectChallengeQuestionsByStudent,
  selectChallengesByStudent,
  updateStudentChallengeStatus,
  selectIncomingChallenge
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

    if (query.length > 0) {
      res.status(201).json({
        status: 'success',
        data: query
      })
      return
    }

    await createChallengeQuestions(challenge_id, student_id)
    const newQuery = await selectChallengeQuestionsByStudent(challenge_id, student_id)

    res.status(201).json({
      status: 'success',
      data: newQuery
    })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get questions'
    })
  }
}

export const getChallengesByStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student_id = req.params.student_id
    const class_id = req.params.class_id

    const query = await selectChallengesByStudent(class_id, student_id)

    if (query.length > 0) {
      res.status(200).json({
        status: 'success',
        data: query
      })
      return
    }

    res.status(200).json({
      status: 'success',
      data: []
    })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get challenges of student'
    })
  }
}

export const putChallengeStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const challenge_id = req.body.challenge_id
    const student_id = req.body.student_id
    console.log(challenge_id)
    console.log(student_id)

    const query = await updateStudentChallengeStatus(challenge_id, student_id)

    console.log(query)
    // If the student was accepted
    if (Array.isArray(query)) {
      res.status(200).json({
        status: 'success',
        data: 'Status changed'
      })
      return
    }

    // If student couldnt be accepted
    res.status(400).json({
      status: 'failed',
      data: query
    })
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt accept student to class'
    })
  }
}

export const getIncomingChallenge = async (req: Request, res: Response): Promise<void> => {
  try {
    const student_id = req.params.student_id
    const class_id = req.params.class_id

    const query = await selectIncomingChallenge(class_id, student_id)

    if (typeof query == 'object') {
      res.status(200).json({
        status: 'success',
        data: query
      })
      return
    } else {
      res.status(400).json({
        status: 'failed',
        data: query
      })
      return
    }
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt get challenges of student'
    })
  }
}
