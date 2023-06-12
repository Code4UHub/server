import { Request, Response } from 'express'
import {
  createChallenge,
  // selectChallengeQuestions,
  createChallengeQuestions,
  selectChallengeQuestionsByStudent,
  selectChallengesByStudent,
  updateStudentChallengeStatusContinue,
  updateStudentChallengeStatusStart,
  selectIncomingChallenge,
  updateStudentChallengeQuestion
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

    if (typeof query == "object" && query.challenges.length > 0) {
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

export const putChallengeStatusContinue = async (req: Request, res: Response): Promise<void> => {
  try {
    const challenge_id = req.body.challenge_id
    const student_id = req.body.student_id

    const query = await updateStudentChallengeStatusContinue(challenge_id, student_id)

    if (Array.isArray(query)) {
      res.status(200).json({
        status: 'success',
        data: 'Status changed'
      })
      return
    }

    res.status(400).json({
      status: 'failed',
      data: query
    })
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt change status'
    })
  }
}

export const putChallengeStatusStart = async (req: Request, res: Response): Promise<void> => {
  try {
    const challenge_id = req.body.challenge_id
    const student_id = req.body.student_id

    const query = await updateStudentChallengeStatusStart(challenge_id, student_id)

    if (Array.isArray(query)) {
      res.status(200).json({
        status: 'success',
        data: 'Status changed'
      })
      return
    }

    res.status(400).json({
      status: 'failed',
      data: query
    })
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt change status'
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
      res.status(200).json({
        status: 'success',
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

export const putStudentChallengeQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const student_id = req.params.student_id
    const question_id = req.params.question_id
    const solution = req.body

    const query = await updateStudentChallengeQuestion(student_id, question_id, solution)

    if (Array.isArray(query)) {
      res.status(200).json({
        status: 'success',
        data: 'Student challenge question updated'
      })
      return
    }

    res.status(400).json({
      status: 'failed',
      data: query
    })
  } catch (e: any) {
    res.status(500).json({
      status: 'error',
      data: 'Couldnt udpate student homework questions updated'
    })
  }
}
