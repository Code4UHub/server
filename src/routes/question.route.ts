import express, { Express, Router } from 'express'
import * as questionController from '../controllers/question.controller'

export const router: Router = Router()

router.route('/question').get(questionController.getQuestions)
router.route('/question').post(questionController.postQuestion)

// router.route('/question/:assignment').get(questionController.getQuestionsByAssignment)
// router.route('/question/:id').get(questionController.getQuestion)
