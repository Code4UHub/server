import { Router } from 'express'
import * as challengeController from '../controllers/challenge.controller'

export const router: Router = Router()

// router.route('/subject').get(challengeController.getChallenges)
router.route('/challenge').post(challengeController.postChallenge)
router.route('/challenge/:challenge_id/student/:student_id/questions').get(challengeController.getChallengeQuestions)

router.route('/challenge/class/:class_id/student/:student_id').get(challengeController.getChallengesByStudent)
