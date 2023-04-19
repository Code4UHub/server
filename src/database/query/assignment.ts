import { Assignment } from '../models/assignment'
import { OpenQuestion } from '../models/open.question'
import { CloseQuestion } from '../models/close.question'

import { AssignmentType } from '../../types/assignment.type'

export const selectAssignments = async () => {
  try {
    const assignments = await Assignment.findAll({
      raw: true
    })

    return assignments
  } catch (e) {
    throw e
  }
}

export const selectQuestionsByAssignment = async (assignment_id: string) => {
  try {
    const questions = await OpenQuestion.findAll({
      attributes: ['open_question_id', 'open_question', 'assignment_id'],
      raw: true,
      where: {
        assignment_id: assignment_id
      }
    })
    return questions
  } catch (e) {
    // throw new Error("MY ERROR")
    throw e
  }
}

// export const selectAssignmentsByModule = async (module_id: string) => {
//   try {
//     const assignments = await Assignment.findAll({
//       // attributes: ['student_id', 'first_name', 'last_name', 'email'],
//       raw: true,
//       where: {
//         module_id: module_id
//       }
//     })
//     return assignments
//   } catch (e) {
//     // throw new Error("MY ERROR")
//     throw e
//   }
// }
