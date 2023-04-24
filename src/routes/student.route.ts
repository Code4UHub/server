import { Router } from 'express'
import * as studentController from '../controllers/student.controller'

export const router: Router = Router()

router.route('/student').get(studentController.getStudents).post(studentController.postStudent)
router.route('/student/register').post(studentController.postStudent)
router.route('/student/login').get(studentController.getStudent)

router.route('/student/class').get(studentController.getClasses)
