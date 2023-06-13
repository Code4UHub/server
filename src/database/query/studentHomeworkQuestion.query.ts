import { StudentHomeworkQuestionType } from '../../types/studentHomeworkQuestion.type'
import { StudentHomeworkQuestion } from '../models/studentHomeworkQuestion.model'

export const updateStudentHomeworkQuestionScore = async (
  student_question: StudentHomeworkQuestionType
): Promise<number[]> => {
  try {
    console.log('=============')
    console.log(student_question)
    const score = await StudentHomeworkQuestion.update(
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
