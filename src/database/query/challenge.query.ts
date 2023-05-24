import { Challenge } from '../models/challenge.model'
import { ChallengeType } from '../../types/challenge.type'
import { selectDifficulty } from './difficulty.query'

export const createChallenge = async (challengeDb: ChallengeType): Promise<Challenge | null> => {
  try {
    const difficultyId = challengeDb.difficulty_id
    const openQuestions = challengeDb.open_questions
    const closedQuestions = challengeDb.closed_questions
    const difficultyObj = await selectDifficulty(difficultyId)

    if (!difficultyObj) {
      throw new Error('Difficulty not valid')
    }

    challengeDb.total_points = (openQuestions + closedQuestions) * difficultyObj.points_per_question

    const res = await Challenge.create(challengeDb)
    return res
  } catch (e: any) {
    throw e
  }
}
