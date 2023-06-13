import { StudentHomework } from '../models/studentHomework'

export const updateStudentHomeworkEndDate = async (student_id: string, homework_id: number): Promise<number[]> => {
  try {
    const score = await StudentHomework.update(
      {
        end_date: new Date().getTime()
      },
      {
        where: {
          student_id: student_id,
          homework_id: homework_id
        }
      }
    )
    return score
  } catch (e: any) {
    throw e
  }
}
