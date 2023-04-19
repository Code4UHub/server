import { Request, Response } from 'express'
import { selectQuestions, selectQuestion } from '../database/query/question'

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

// export const getQuestionsByAssignment = async (req: Request, res: Response) => {
//   // res.status(200).send('It works!')
//   try {
//     console.log('----------')
//     const assignment_id: string = req.params.assignment.replace('assignment=', '')
//     console.log(assignment_id)
//     console.log('----------')
//     const query = await selectQuestionsByAssignment(assignment_id)
//     res.status(200).json({
//       status: 'success',
//       data: query
//     })
//   } catch (e) {
//     throw e
//   }
// }

export const getQuestion = async (req: Request, res: Response) => {
  try {
    const question_id: string = req.params.id.replace('id=', '')
    console.log(question_id)

    const query = await selectQuestion(question_id)
    console.log('query: ', query)
    console.log('HEEEERREE')

    if (query.length > 0) {
      res.status(200).json({
        status: 'success',
        data: {
          query
        }
      })
    } else {
      res.status(404).json({
        status: 'failed',
        data: 'Question not found'
      })
    }
  } catch (e: any) {
    res.status(404).json({
      status: 'error',
      data: e.message
    })
  }
}
