import { Router } from 'express'
import * as classController from '../controllers/class.controller'

export const router: Router = Router()

router.route('/class').get(classController.getClasses)
// router.route('/student/:email&:pwd').get(moduleController.getModuleById)
