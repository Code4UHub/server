import { Request, Response } from 'express'
import { updateStudentHomeworkQuestionScore, updateStudentQuestionScore } from '../database/query/studentQuestion.query'
import { StudentQuestionType } from '../types/studentQuestion.type'
import { updateStudentHomeworkQuestion } from '../database/query/homework.query'

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
    // console.log(responseText)

    if (responseText.score !== 100) {
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

export const submitChallenge = async (req: Request, res: Response): Promise<void> => {
  try {
    const student_id = req.body.student_id
    const questions = req.body.questions
    const difficulty_id = questions[0].difficulty_id

    const scoreFactor: number = scorePerDifficulty[difficulty_id]

    const maxScore = Math.ceil(questions.length * 100 * scoreFactor)
    const questionScore = 100 * scoreFactor
    let totalScore = 0

    // Submit each question of a students challenge
    const studentQuestionsScore = questions.map(async (question_object: any) => {
      if (question_object.type === 'open') {
        const { question, ...questionData } = question_object
        const updatedInput = { ...questionData, tests: question.tests }

        // console.log('===============')
        // console.log(updatedInput)

        const data = JSON.stringify(updatedInput)

        const result = await fetch(`${URL}/submit`, {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const responseText = await result.json()
        totalScore += responseText.score * scoreFactor
        return {
          question_id: question_object.question_id,
          type: question_object.type,
          max_score: questionScore,
          total_score: responseText.score * scoreFactor,
          solution: { solution: question_object.source_code }
          // tests: responseText.tests
        }
      }
      // If closed question
      else if (question_object.type === 'closed') {
        let obtainedScore = 0
        if (question_object.selected_choice === question_object.question.answer) {
          totalScore += questionScore
          obtainedScore = questionScore
        }
        return {
          question_id: question_object.question_id,
          type: question_object.type,
          max_score: questionScore,
          total_score: obtainedScore,
          solution: { solution: question_object.selected_choice }
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
      console.log(result)
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

export const submitHomework = async (req: Request, res: Response): Promise<void> => {
  try {
    const student_id = req.body.student_id
    const questions = req.body.questions
    const difficulty_id = questions[0].difficulty_id

    const scoreFactor: number = scorePerDifficulty[difficulty_id]

    const maxScore = Math.ceil(questions.length * 100 * scoreFactor)
    const questionScore = 100 * scoreFactor
    let totalScore = 0

    // Submit each question of a students challenge
    const studentQuestionsScore = questions.map(async (question_object: any) => {
      if (question_object.type === 'open') {
        const { question, ...questionData } = question_object
        const updatedInput = { ...questionData, tests: question.tests }

        // console.log('===============')
        // console.log(updatedInput)

        const data = JSON.stringify(updatedInput)

        const result = await fetch(`${URL}/submit`, {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const responseText = await result.json()
        totalScore += responseText.score * scoreFactor
        return {
          question_id: question_object.question_id,
          type: question_object.type,
          max_score: questionScore,
          total_score: responseText.score * scoreFactor,
          solution: { solution: question_object.source_code }
          // tests: responseText.tests
        }
      }
      // If closed question
      else if (question_object.type === 'closed') {
        let obtainedScore = 0
        // Doing -1 because answer is 1-indexed
        if (question_object.selected_choice === question_object.question.answer - 1) {
          totalScore += questionScore
          obtainedScore = questionScore
        }
        return {
          question_id: question_object.question_id,
          type: question_object.type,
          max_score: questionScore,
          total_score: obtainedScore,
          solution: { solution: question_object.selected_choice }
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
      const result = await updateStudentHomeworkQuestionScore(studentQuestionScore)
      console.log(result)
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
