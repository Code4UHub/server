import { Request, Response, response } from 'express'
import { updateStudentQuestionScore } from '../database/query/studentQuestion.query'
import { StudentQuestionType } from '../types/studentQuestion.type'

const URL = 'http://localhost:65535'

const scorePerDifficulty: { [difficulty: number]: number } = {
  1: 0.3,
  2: 0.5,
  3: 0.7
}

export const runCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = JSON.stringify(req.body)

    const result = await fetch(`${URL}/run`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseText = await result.json()
    console.log(responseText)

    if (responseText.grade !== 100) {
      res.status(200).json({
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
    const difficulty_id = req.body.difficulty_id
    const questions = req.body.questions

    const scoreFactor: number = scorePerDifficulty[difficulty_id]

    const maxScore = Math.ceil(questions.length * 100 * scoreFactor)
    const questionScore = 100 * scoreFactor
    let totalScore = 0

    // Submit each question of a students challenge
    const studentQuestionsScore = questions.map(async (question: any) => {
      if (question.type === 'open') {
        // console.log('----------------')
        // console.log(question)

        const data = JSON.stringify(question)
        // const data = JSON.stringify({
        //   question_id: question.question_id,
        //   source_code: question.source_code,
        //   shown_tests: question.shown_tests
        // })

        const result = await fetch(`${URL}/submit`, {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const responseText = await result.json()
        // console.log('--=-==')
        // console.log(responseText)
        totalScore += responseText.score * scoreFactor
        // return responseText
        return {
          question_id: question.question_id,
          type: question.type,
          max_score: questionScore,
          total_score: responseText.score * scoreFactor,
          solution: { solution: question.source_code },
          shown_tests: responseText.tests
        }
      }
      // If closed question
      else if (question.type === 'close') {
        let obtainedScore = 0
        if (question.selected_choice === question.answer) {
          totalScore += questionScore
          obtainedScore = questionScore
        }
        return {
          question_id: question.question_id,
          type: question.type,
          max_score: questionScore,
          total_score: obtainedScore,
          solution: { solution: question.selected_choice }
        }
      } else {
        return { status: 'error' }
      }
    })

    const solvedStudentQuestions = await Promise.all(studentQuestionsScore)

    res.status(200).json({
      status: 'success',
      data: {
        max_score: maxScore,
        total_score: totalScore,
        questions: solvedStudentQuestions
      }
    })

    // Update students submission with current code
    // call query that updates a score
    solvedStudentQuestions.forEach(async (studentQuestionScore) => {
      studentQuestionScore.student_id = student_id
      const result = await updateStudentQuestionScore(studentQuestionScore)
    })
    return
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt submit your challenge'
    })
  }
}
