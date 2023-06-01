import { Request, Response } from 'express'
import {
  selectQuestions,
  createQuestion,
  createHomework,
  createHomeworkQuestions,
  selectHomeworkQuestionsByStudent,
  selectQuestionsByModuleAndDifficultyId
} from '../database/query/homework.query'
import { HomeworkType } from '../types/homework.type'

import { QuestionHType } from '../types/questionH.type'

export const getQuestions = async (req: Request, res: Response) => {
  // res.status(200).send('It works!')
  try {
    const query = await selectQuestions()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}

export const getQuestionsByModuleAndDifficultyId = async (req: Request, res: Response) => {
  const module_id = req.params.module_id
  const difficulty_id = req.params.difficulty_id

  try {
    const query = await selectQuestionsByModuleAndDifficultyId(module_id, difficulty_id)
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}

export const postQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const newQuestion: QuestionHType = req.body

    if (newQuestion.type != 'open' && newQuestion.type != 'closed') {
      res.status(404).json({
        status: 'error',
        data: 'Type questions not valid'
      })
      return
    }

    const query = await createQuestion(newQuestion)

    res.status(201).json({
      status: 'success',
      data: { message: 'Question created successfully', question: query }
    })

    return
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt create question'
    })
  }
}

export const postHomework = async (req: Request, res: Response): Promise<void> => {
  try {
    const newHomework = req.body
    const question_ids = newHomework.question_ids
    delete newHomework[question_ids]

    const query = await createHomework(newHomework, question_ids)

    res.status(201).json({
      status: 'success',
      data: { message: 'Homework created successfully', homework: query, question_ids: question_ids }
    })

    return
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt create homework'
    })
  }
}

export const getHomeworkQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const homework_id = req.params.homework_id
    const student_id = req.params.student_id

    const query = await selectHomeworkQuestionsByStudent(homework_id, student_id)

    if (query.length > 0) {
      res.status(201).json({
        status: 'success',
        data: query
      })
      return
    }

    await createHomeworkQuestions(homework_id, student_id)
    const newQuery = await selectHomeworkQuestionsByStudent(homework_id, student_id)

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
