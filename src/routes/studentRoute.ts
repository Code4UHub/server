import express, { Express, Router } from 'express'
import * as studentController from '../controllers/studentController'

export const router: Router = Router()

router.route('/student').get(studentController.getStudents).post(studentController.postStudent)
router.route('/student/:email&:pwd').get(studentController.getStudent)
