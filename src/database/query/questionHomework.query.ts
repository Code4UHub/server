import { StudentHomeworkQuestionType } from '../../types/studentHomeworkQuestion.type'
import { StudentHomeworkQuestion } from '../models/studentHomeworkQuestion.model'

export const updateStudentQuestionScore = async (student_question: StudentHomeworkQuestionType): Promise<number[]> => {
  try {
    console.log('=============')
    console.log(student_question.question_h_id)
    console.log(student_question.solution)
    const score = await StudentHomeworkQuestion.update(
      {
        score: student_question.score,
        solution: student_question.solution
      },
      {
        where: {
          student_id: student_question.student_id,
          question_id: student_question.question_h_id
        }
      }
    )
    return score
  } catch (e: any) {
    throw e
  }
}
