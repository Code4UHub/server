import { Challenge } from '../models/challenge.model'
import { ChallengeType } from '../../types/challenge.type'

export const createChallenge = async (challengeDb: ChallengeType): Promise<Challenge | null> => {
  try {
    const res = await Challenge.create(challengeDb)
    return res
  } catch (e: any) {
    throw e
  }
}
