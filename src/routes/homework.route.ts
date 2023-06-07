import { Router } from 'express'
import * as homeworkController from '../controllers/homework.controller'

export const router: Router = Router()

router
  .route('/homework/question/subject/:subject_id/difficulty/:difficulty_id')
  .get(homeworkController.getQuestionsBySubjectAndDifficultyId)

router
  .route('/homework/question/module/:module_id/difficulty/:difficulty_id')
  .get(homeworkController.getQuestionsByModuleAndDifficultyId)

router.route('/homework/question').get(homeworkController.getQuestions)
router.route('/homework/question').post(homeworkController.postQuestion)

router.route('/homework').post(homeworkController.postHomework)
router.route('/homework/:homework_id/student/:student_id/questions').get(homeworkController.getHomeworkQuestions)

// check score for homework students
router.route('/homework/:homework_id/student_scores').get(homeworkController.getStudentScores)
