import { Router } from 'express'
import * as challengeController from '../controllers/challenge.controller'

export const router: Router = Router()

// router.route('/subject').get(challengeController.getChallenges)
router.route('/challenge').post(challengeController.postChallenge)
router.route('/challenge/:challenge_id/student/:student_id/questions').get(challengeController.getChallengeQuestions)
router.route('/challenge/class/:class_id/student/:student_id').get(challengeController.getChallengesByStudent)

// Update status from a challenge to continue
router.route('/challenge/update_status_continue').put(challengeController.putChallengeStatusContinue)

// Update status from a challenge to continue
router.route('/challenge/update_status_start').put(challengeController.putChallengeStatusStart)

// get the incoming assignment for student
router
  .route('/challenge/class/:class_id/student/:student_id/incoming_challenge')
  .get(challengeController.getIncomingChallenge)
