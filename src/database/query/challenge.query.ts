import { Challenge } from '../models/challenge.model'
import { ChallengeType } from '../../types/challenge.type'
import { selectDifficulty } from './difficulty.query'
import { StudentQuestion } from '../models/studentQuestion.model'
import { Question } from '../models/question.model'

export const selectChallenge = async (challenge_id: string) => {
  try {
    const challenge = await Challenge.findOne({
      raw: true,
      // attributes: [],
      where: {
        challenge_id: challenge_id
      }
    })

    return challenge
  } catch (e) {
    throw e
  }
}

export const createChallenge = async (challengeDb: ChallengeType): Promise<Challenge | null> => {
  try {
    const difficultyId = challengeDb.difficulty_id
    const openQuestions = challengeDb.open_questions
    const closedQuestions = challengeDb.closed_questions
    const difficultyObj = await selectDifficulty(difficultyId)

    if (!difficultyObj) {
      throw new Error('Difficulty not valid')
    }

    challengeDb.total_points = (openQuestions + closedQuestions) * difficultyObj.points_per_question

    const res = await Challenge.create(challengeDb)
    return res
  } catch (e: any) {
    throw e
  }
}

export const selectChallengeQuestionsByStudent = async (challenge_id: string, student_id: string) => {
  try {
    const res = await Question.findAll({
      attributes: ['question_id', 'question', 'student_question.solution', 'student_question.passed'],
      raw: true,
      where: {
        challenge_id: challenge_id
      },
      include: [
        {
          model: StudentQuestion,
          required: true,
          attributes: [],
          where: { student_id: student_id }
        }
      ]
    })
    return res
  } catch (e: any) {
    console.log(e.message)
    throw e
  }
}

// export const selectChallengeQuestions = async (challenge_id: string) => {
//   try {
//     const res = await Question.findAll({
//       // attributes: ['question_id', 'type', 'challenge_id'],
//       attributes: ['type', [models.sequelize.fn('sum', models.sequelize.col('payments.payment_amount')), 'total_cost']]
//       where: { challenge_id: challenge_id },
//       group: 'type'
//     })
//     return res
//   } catch (e: any) {
//     throw e
//   }
// }

export const selectChallengeOpenQuestions = async (challenge_id: string) => {
  try {
    const res = await Question.findAll({
      attributes: ['challenge_id', 'question_id', 'type'],
      where: { challenge_id: challenge_id, type: 'open' }
    })
    return res
  } catch (e: any) {
    throw e
  }
}

export const selectChallengeClosedQuestions = async (challenge_id: string) => {
  try {
    const res = await Question.findAll({
      attributes: ['challenge_id', 'question_id', 'type'],
      where: { challenge_id: challenge_id, type: 'closed' }
    })
    return res
  } catch (e: any) {
    throw e
  }
}

export const createChallengeQuestions = async (challenge_id: string, student_id: string) => {
  try {
    // Obtener la info del challenge -> openquestions y closedquestion
    const challenge: Challenge | null = await selectChallenge(challenge_id)

    if (!challenge) {
      throw new Error('Challenge not found')
    }

    console.log(challenge)
    console.log('--------------------------')
    // Obtener todas las preguntas que tengan el challenge id
    const openQuestions = await selectChallengeOpenQuestions(challenge_id)
    openQuestions.sort(() => Math.random() - 0.5)
    const closedQuestions = await selectChallengeClosedQuestions(challenge_id)
    closedQuestions.sort(() => Math.random() - 0.5)

    console.log(openQuestions)

    if (challenge.closed_questions > closedQuestions.length) {
      throw new Error('Not enough closed question')
    }
    if (challenge.open_questions > openQuestions.length) {
      throw new Error('Not enough open question')
    }

    // Insert random dependiendo de la cantidad de preguntas

    const arrQuestions = []

    for (let i = 0; i < challenge.open_questions; i++) {
      const element = {
        student_id: student_id,
        question_id: openQuestions[i].question_id,
        solution: {},
        passed: false
      }
      arrQuestions.push(element)
    }

    for (let i = 0; i < challenge.closed_questions; i++) {
      const element = {
        student_id: student_id,
        question_id: closedQuestions[i].question_id,
        solution: {},
        passed: false
      }
      arrQuestions.push(element)
    }

    const res = await StudentQuestion.bulkCreate(arrQuestions)

    return res
  } catch (e: any) {
    throw e
  }
}
