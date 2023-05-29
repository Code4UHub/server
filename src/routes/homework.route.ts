import { Router } from 'express'
import * as homeworkController from '../controllers/homework.controller'

export const router: Router = Router()

router.route('/homework/question').get(homeworkController.getQuestions)
router.route('/homework/question').post(homeworkController.postQuestion)
