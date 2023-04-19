import { OpenQuestion } from '../models/open.question'
import { CloseQuestion } from '../models/close.question'
import { OpenQuestionType } from '../../types/open.question'

export const selectQuestions = async () => {
  try {
    const openQuestions = await OpenQuestion.findAll({
      raw: true
    })

    const closeQuestions = await CloseQuestion.findAll({
      raw: true
    })

    return {
      open_questions: openQuestions,
      close_questions: closeQuestions
    }
  } catch (e) {
    throw e
  }
}

export const selectQuestion = async (open_question_id: string) => {
  try {
    const question = await OpenQuestion.findAll({
      attributes: ['open_question_id', 'open_question', 'assignment_id'],
      raw: true,
      where: {
        open_question_id: open_question_id
      }
    })
    return question
  } catch (e) {
    // throw new Error("MY ERROR")
    throw e
  }
}
