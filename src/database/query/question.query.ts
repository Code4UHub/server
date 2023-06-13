import { QuestionType } from '../../types/question.type'
import { Question } from '../models/question.model'

export const selectQuestions = async () => {
  try {
    const questions = await Question.findAll({
      raw: true
    })

    return questions
  } catch (e) {
    throw e
  }
}

export const createQuestion = async (newQuestion: QuestionType): Promise<Question | null> => {
  try {
    const res = await Question.create(newQuestion)
    return res
  } catch (e: any) {
    throw e
  }
}
