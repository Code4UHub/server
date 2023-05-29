import { QuestionHType } from '../../types/questionH.type'
import { QuestionH } from '../models/questionH.model'

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
