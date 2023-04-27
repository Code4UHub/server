import { Router } from 'express'
import * as moduleController from '../controllers/module.controller'

export const router: Router = Router()

router.route('/subject/:subject_id/modules').get(moduleController.getModulesBySubject)
// router.route('/student/:email&:pwd').get(moduleController.getModuleById)
