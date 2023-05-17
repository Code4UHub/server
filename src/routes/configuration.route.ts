import { Router } from 'express'
import * as configurationController from '../controllers/configuration.controller'

export const router: Router = Router()

router.route('/time').get(configurationController.getCurrentTime)
