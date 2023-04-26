import { Router } from 'express'
import * as classController from '../controllers/class.controller'

export const router: Router = Router()

router.route('/class/all').get(classController.getClasses)
router.route('/class/').get(classController.getClass)
router.route('/class/create').post(classController.postClass)

router.route('/class/register').post(classController.postRegisterStudent)
router.route('/class/:id/students').get(classController.getStudentsByClass)
