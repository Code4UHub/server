import { Router } from 'express'
import * as difficultyController from '../controllers/difficulty.controller'

export const router: Router = Router()

router.route('/difficulty/difficulty_id').get(difficultyController.getDifficulty)
