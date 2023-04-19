import express, { Express, Router } from 'express'
import * as assignmentController from '../controllers/assignment.controller'

export const router: Router = Router()

router.route('/assignment').get(assignmentController.getAssignments)
router.route('/assignment/:id/questions').get(assignmentController.getQuestionsByAssignment)
// router.route('/student/:email&:pwd').get(assignmentController.getStudent)
