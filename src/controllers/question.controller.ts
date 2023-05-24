import { Request, Response } from 'express'
import { selectQuestions, createQuestion } from '../database/query/question.query'
import { QuestionType } from '../types/question.type'

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

export const postQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const newQuestion: QuestionType = req.body

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
