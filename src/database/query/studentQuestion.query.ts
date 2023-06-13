import { StudentHomeworkQuestionType } from '../../types/studentHomeworkQuestion.type'
import { StudentQuestionType } from '../../types/studentQuestion.type'
import { StudentQuestion } from '../models/studentQuestion.model'

export const updateStudentChallengeQuestionScore = async (
  student_question: StudentHomeworkQuestionType
): Promise<number[]> => {
  try {
    console.log('=============')
    console.log(student_question.question_h_id)
    console.log(student_question.solution)
    const score = await StudentQuestion.update(
      {
        score: student_question.score,
        solution: student_question.solution
      },
      {
        where: {
          student_id: student_question.student_id,
          question_h_id: student_question.question_h_id
        }
      }
    )
    return score
  } catch (e: any) {
    throw e
  }
}
