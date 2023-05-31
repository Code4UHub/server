import { Difficulty } from '../models/difficulty.model'

export const selectDifficulty = async (difficulty_id: number) => {
  try {
    const difficulty = await Difficulty.findOne({
      raw: true,
      where: {
        difficulty_id: difficulty_id
      }
    })

    return difficulty
  } catch (e) {
    throw e
  }
}

export const selectDifficulties = async () => {
  try {
    const difficulties = await Difficulty.findAll({
      raw: true
    })

    return difficulties
  } catch (e) {
    throw e
  }
}
