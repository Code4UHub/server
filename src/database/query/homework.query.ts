import { HomeworkType } from '../../types/homework.type'
import { HomeworkQuestionType } from '../../types/homeworkQuestion.type'
import { QuestionHType } from '../../types/questionH.type'
import { Homework } from '../models/homework.model'
import { HomeworkQuestion } from '../models/homeworkQuestion'
import { QuestionH } from '../models/questionH.model'
import { selectDifficulty } from './difficulty.query'

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
    const homeworkQuestions = arrQuestions.map((question_id) => {
      return {
        homework_id: homework_id,
        question_h_id: question_id
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
