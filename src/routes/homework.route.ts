import { Router } from 'express'
import * as homeworkController from '../controllers/homework.controller'

export const router: Router = Router()

router.route('/homework/question/difficulty/:difficulty_id').get(homeworkController.getQuestionsByDifficultyId)
router.route('/homework/question').get(homeworkController.getQuestions)
router.route('/homework/question').post(homeworkController.postQuestion)

router.route('/homework').post(homeworkController.postHomework)
router.route('/homework/:homework_id/student/:student_id/questions').get(homeworkController.getHomeworkQuestions)