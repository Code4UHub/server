import { Router } from 'express'
import * as compilerController from '../controllers/compiler.controller'

export const router: Router = Router()

router.route('/run').post(compilerController.runCode)
router.route('/submit').post(compilerController.submitCode)
