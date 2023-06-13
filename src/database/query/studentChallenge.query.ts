import { StudentChallenge } from '../models/studentChallenge.model'

export const updateStudentChallengeEndDate = async (student_id: string, challenge_id: number): Promise<number[]> => {
  try {
    const score = await StudentChallenge.update(
      {
        end_date: new Date().getTime()
      },
      {
        where: {
          student_id: student_id,
          challenge_id: challenge_id
        }
      }
    )
    return score
  } catch (e: any) {
    throw e
  }
}
