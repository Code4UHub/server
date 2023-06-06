import { Request, Response } from 'express'
import { updateStudentQuestionScore } from '../database/query/studentQuestion.query'
import { StudentQuestionType } from '../types/studentQuestion.type'

const url = 'http://localhost:8080'

export const runCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = JSON.stringify(req.body)

    const result = await fetch(`${url}/run`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseText = await result.json()
    console.log(responseText)

    if (responseText.grade !== 100) {
      res.status(400).json({
        status: 'failed',
        data: responseText
      })
      return
    } else {
      res.status(200).json({
        status: 'success',
        data: responseText
      })
      return
    }
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt run your code'
    })
  }
}

export const submitCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const student_id = req.body.student_id
    const questions = req.body.questions

    // Submit each question of a students challenge
    const studentQuestionsScore = questions.map(async (question: any) => {
      console.log(question.question_id)
      if (question.type === 'open') {
        console.log('----------------')
        // console.log(question)

        const data = JSON.stringify(question)
        // const data = JSON.stringify({
        //   question_id: question.question_id,
        //   source_code: question.source_code,
        //   shown_tests: question.shown_tests
        // })

        const result = await fetch(`${url}/submit`, {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const responseText = await result.json()
        return responseText
      } else if (question.type === 'close') {
        console.log('That')
      } else {
        console.log('Question type not valid')
      }
    })

    Promise.all(studentQuestionsScore).then((data) => {
      console.log('================')
      console.log(data)
    })

    // const result = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: source_code
    // })
    // const responseText = await result.json()
    // console.log(responseText)

    // if (responseText.status == 'error') {
    //   res.status(400).json({
    //     status: 'failed',
    //     data: responseText
    //   })
    //   return
    // } else {
    //   res.status(200).json({
    //     status: 'failed',
    //     data: responseText
    //   })
    //   return
    // }
    // updateStudentQuestionScore(student_question)

    res.status(200).json({
      status: 'success',
      data: 'data goes here'
    })
    return
    // Update students submission with current code
    // call query that updates a score
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt run your code'
    })
  }
}
