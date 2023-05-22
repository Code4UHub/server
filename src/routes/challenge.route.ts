import { Router } from 'express'
import * as challengeController from '../controllers/challenge.controller'

export const router: Router = Router()

// router.route('/subject').get(challengeController.getChallenges)
router.route('/challenge').post(challengeController.postChallenge)