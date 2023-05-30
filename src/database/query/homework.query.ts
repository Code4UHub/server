import { HomeworkType } from '../../types/homework.type'
import { HomeworkQuestionType } from '../../types/homeworkQuestion.type'
import { QuestionHType } from '../../types/questionH.type'
import { Homework } from '../models/homework.model'
import { HomeworkQuestion } from '../models/homeworkQuestion'
import { QuestionH } from '../models/questionH.model'
import { StudentHomeworkQuestion } from '../models/studentHomeworkQuestion.model'
import { selectDifficulty } from './difficulty.query'

export const selectHomework = async (homework_id: string) => {
  try {
    const challenge = await Homework.findOne({
      raw: true,
      // attributes: [],
      where: {
        homework_id: homework_id
      }
    })

    return challenge
  } catch (e) {
    throw e
  }
}

export const selectQuestions = async () => {
  try {
    const questions = await QuestionH.findAll({
      raw: true
    })

    return questions
  } catch (e) {
    throw e
  }
}

export const createQuestion = async (newQuestion: QuestionHType): Promise<QuestionH | null> => {
  try {
    const res = await QuestionH.create(newQuestion)
    return res
  } catch (e: any) {
    throw e
  }
}

export const createHomework = async (newHomework: HomeworkType, arrQuestions: string[]): Promise<Homework | null> => {
  try {
    const difficultyId = newHomework.difficulty_id
    const openQuestions = newHomework.open_questions
    const closedQuestions = newHomework.closed_questions
    const difficultyObj = await selectDifficulty(difficultyId)

    if (!difficultyObj) {
      throw new Error('Difficulty not valid')
    }

    newHomework.total_points = (openQuestions + closedQuestions) * difficultyObj.points_per_question
    const res = await Homework.create(newHomework)

    // Link the homework id with the questions
    const homework_id = res.homework_id
    const homeworkQuestions = arrQuestions.map((question_h_id) => {
      return {
        homework_id: homework_id,
        question_h_id: question_h_id
      }
    })
    await HomeworkQuestion.bulkCreate(homeworkQuestions)

    return res
  } catch (e: any) {
    throw e
  }
}

export const createQuestionHomework = async (
  newHomeworkQuestion: HomeworkQuestionType
): Promise<HomeworkQuestion | null> => {
  try {
    const res = await HomeworkQuestion.create(newHomeworkQuestion)
    return res
  } catch (e: any) {
    throw e
  }
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//

export const selectHomeworkQuestionsByStudent = async (homework_id: string, student_id: string) => {
  try {
    const res = await QuestionH.findAll({
      attributes: [
        'question_h_id',
        'question',
        'student_homework_question.solution',
        'student_homework_question.passed'
      ],
      raw: true,

      order: [['question_h_id', 'ASC']],

      include: [
        {
          model: StudentHomeworkQuestion,
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

export const selectHomeworkOpenQuestions = async (homework_id: string) => {
  try {
    const res = await QuestionH.findAll({
      attributes: ['question_h_id', 'type'],
      where: { type: 'open' }
    })
    return res
  } catch (e: any) {
    throw e
  }
}

export const selectHomeworkClosedQuestions = async (homework_id: string) => {
  try {
    const res = await QuestionH.findAll({
      attributes: ['question_h_id', 'type'],
      where: { type: 'closed' }
    })
    return res
  } catch (e: any) {
    throw e
  }
}

export const createHomeworkQuestions = async (homework_id: string, student_id: string) => {
  try {
    // Obtener la info del challenge -> openquestions y closedquestion
    const homework: Homework | null = await selectHomework(homework_id)

    if (!homework) {
      throw new Error('Homework not found')
    }

    // Obtener todas las preguntas que tengan el challenge id
    const openQuestions = await selectHomeworkOpenQuestions(homework_id)
    openQuestions.sort(() => Math.random() - 0.5)
    const closedQuestions = await selectHomeworkClosedQuestions(homework_id)
    closedQuestions.sort(() => Math.random() - 0.5)

    if (homework.closed_questions > closedQuestions.length) {
      throw new Error('Not enough closed question')
    }
    if (homework.open_questions > openQuestions.length) {
      throw new Error('Not enough open question')
    }

    // Insert random dependiendo de la cantidad de preguntas

    const arrStudentHomeworkQuestion = []

    for (let i = 0; i < homework.open_questions; i++) {
      const element = {
        homework_id: homework_id,
        question_h_id: openQuestions[i].question_h_id,
        student_id: student_id,
        solution: {},
        passed: false
      }
      arrStudentHomeworkQuestion.push(element)
    }

    for (let i = 0; i < homework.closed_questions; i++) {
      const element = {
        homework_id: homework_id,
        question_h_id: closedQuestions[i].question_h_id,
        student_id: student_id,
        solution: {},
        passed: false
      }
      arrStudentHomeworkQuestion.push(element)
    }

    const res = await StudentHomeworkQuestion.bulkCreate(arrStudentHomeworkQuestion)

    return res
  } catch (e: any) {
    throw e
  }
}
