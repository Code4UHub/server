import { Router } from 'express'
import * as teacherController from '../controllers/teacher.controller'

export const router: Router = Router()

router.route('/teacher').get(teacherController.getTeachers)
// .post(teacherController.postTeacher)

router.route('/teacher/:email&:pwd').get(teacherController.getTeacher)
