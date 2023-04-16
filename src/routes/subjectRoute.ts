import express, { Express, Router } from 'express'
import * as subjectController from '../controllers/subjectController'

export const router: Router = Router()

router.route('/subject').get(subjectController.getSubjects)

// router.route('/student/:email&:pwd').get(subjectController.getStudent)
