import { Router } from 'express'
import * as teacherController from '../controllers/teacher.controller'
import protectMiddleware from '../middleware/protect.middleware'

export const router: Router = Router()

router.route('/teacher').get(teacherController.getTeachers)
router.route('/teacher/register').post(teacherController.postTeacher)
router.route('/teacher/login').get(teacherController.getTeacher)
router.route('/teacher/:teacher_id/class').get(teacherController.getTeacherClasses)
router.route('/teacher/:teacher_id/student_class').get(teacherController.getTeacherRequest)

router.route("/teacher/:teacher_id/homeworks").get(teacherController.getHomeworksByTeacherId)