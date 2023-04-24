import { Router } from 'express'
import * as classController from '../controllers/class.controller'

export const router: Router = Router()

router.route('/class/all').get(classController.getClasses) //.post(classController.postController)
router.route('/class/').get(classController.getClass)
router.route('/class/register').post(classController.postClass)

// router.route('/class/register_student').post(classController.postRegisterStudent)
