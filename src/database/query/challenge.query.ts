import { Challenge } from '../models/challenge.model'
import { ChallengeType } from '../../types/challenge.type'
import { selectDifficulty } from './difficulty.query'
import { StudentQuestion } from '../models/studentQuestion.model'
import { Question } from '../models/question.model'
import { EnabledModule } from '../models/enabledModule'
import { Module } from '../models/module.model'
import { StudentChallenge } from '../models/studentChallenge.model'
import { StudentModule } from '../models/studentModule.model'
import { Sequelize } from 'sequelize'
import { Difficulty } from '../models/difficulty.model'
import { ModuleType } from '../../types/module.type'

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
      order: [['question_id', 'ASC']],

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

    // Obtener todas las preguntas que tengan el challenge id
    const openQuestions = await selectChallengeOpenQuestions(challenge_id)
    openQuestions.sort(() => Math.random() - 0.5)
    const closedQuestions = await selectChallengeClosedQuestions(challenge_id)
    closedQuestions.sort(() => Math.random() - 0.5)

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

export const selectChallengesByStudent = async (class_id: string, student_id: string): Promise<Module[]> => {
  try {
    // Modulo -> titulo y score
    // Challenge []

    const challengesByClass = await Module.findAll({
      raw: false,
      attributes: [
        'module_id',
        'title',
        [Sequelize.literal('"enabled_module"."is_active"'), 'is_active'],
        [Sequelize.literal('"student_module"."score"'), 'score']
      ],
      order: [['module_id', 'ASC']],
      include: [
        {
          model: EnabledModule,
          attributes: [],
          where: {
            class_id: class_id
          },
          required: true
        },
        {
          model: StudentModule,
          attributes: [],
          required: true,
          where: {
            student_id: student_id
          }
        },
        {
          model: Challenge,
          attributes: [
            'challenge_id',
            'title',
            'total_points'
            // [Sequelize.literal('"student_challenge"."score"'), 'student_score']
          ],
          required: false,
          include: [
            {
              model: StudentChallenge,
              // attributes: [],
              attributes: ['score', 'status'],
              required: true,
              where: {
                student_id: student_id
              }
            },
            {
              model: Difficulty,
              attributes: ['difficulty', 'difficulty_id'],
              required: true
            }
          ]
        }
      ]
    })
    return challengesByClass
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}


export const updateStudentChallengeStatusContinue = async (
  challenge_id: string,
  student_id: string
): Promise<number[]> => {

  try {
    // If student registered then update his status
    const studentChallenge = await StudentChallenge.update(
      { status: 'continue' },
      {
        where: {
          challenge_id: challenge_id,
          student_id: student_id
        }
      }
    )

    return studentChallenge
  } catch (e: any) {
    console.log(e)
    throw e
  }
}

export const updateStudentChallengeStatusStart = async (
  challenge_id: string,
  student_id: string
): Promise<number[]> => {
  try {
    // If student registered then update his status
    const studentChallenge = await StudentChallenge.update(
      { status: 'start' },
      {
        where: {
          challenge_id: challenge_id,
          student_id: student_id
        }
      }
    )

    return studentChallenge
  } catch (e: any) {
    console.log(e)
    throw e
  }
}


export const selectIncomingChallenge = async (class_id: string, student_id: string) => {
  try {
    const challengesByClass: Module[] = await Module.findAll({
      raw: true,
      attributes: ['module_id', 'title'],
      order: [['module_id', 'ASC']],
      include: [
        {
          model: EnabledModule,
          attributes: [],
          where: {
            class_id: class_id
          },
          required: true
        },
        {
          model: StudentModule,
          attributes: [],
          required: true,
          where: {
            student_id: student_id
          }
        },
        {
          model: Challenge,
          attributes: ['challenge_id', 'title'],
          required: false,
          order: [['challenge_id', 'ASC']],
          include: [
            {
              model: StudentChallenge,
              attributes: ['status'],
              required: true,
              where: {
                student_id: student_id
              }
            },
            {
              model: Difficulty,
              attributes: ['difficulty', 'difficulty_id'],
              required: true
            }
          ]
        }
      ]
    })

    let incomingChallenge: {
      module_title: string
      challenge_title: string
      student_id: string
      status: string
      difficulty: string
    } = {
      module_title: 'title',
      challenge_title: 'title',
      student_id: 'aaaa',
      status: 'status',
      difficulty: 'difficulty'
    }
    let inconmingChallengeFound = false

    // Looking for the fist challenge with continue status
    for (let i = 0; i < challengesByClass.length && inconmingChallengeFound == false; i++) {
      const challenge: { [index: string]: any } = challengesByClass[i]
      const challengeStatus = challenge['challenge.student_challenge.status']

      if (challengeStatus && challengeStatus == 'continue') {
        incomingChallenge['module_title'] = challenge.title
        incomingChallenge['challenge_title'] = challenge['challenge.title']
        incomingChallenge['student_id'] = challenge['challenge.student_challenge.student_id']
        incomingChallenge['status'] = challengeStatus
        incomingChallenge['difficulty'] = challenge['challenge.difficulty.difficulty']
        inconmingChallengeFound = true
      }
    }

    // Looking for the fist challenge with start status
    for (let i = 0; i < challengesByClass.length && inconmingChallengeFound == false; i++) {
      const challenge: { [index: string]: any } = challengesByClass[i]
      const challengeStatus = challenge['challenge.student_challenge.status']

      if (challengeStatus && challengeStatus == 'start') {
        incomingChallenge['module_title'] = challenge.title
        incomingChallenge['challenge_title'] = challenge['challenge.title']
        incomingChallenge['student_id'] = challenge['challenge.student_challenge.student_id']
        incomingChallenge['status'] = challengeStatus
        incomingChallenge['difficulty'] = challenge['challenge.difficulty.difficulty']
        inconmingChallengeFound = true
      }
    }

    if (inconmingChallengeFound == true) {
      return incomingChallenge
    } else {
      return 'Incoming challenge not found'
    }
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}
