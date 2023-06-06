import { Router } from 'express'
import * as compilerController from '../controllers/compiler.controller'

export const router: Router = Router()

router.route('/run').put(compilerController.runCode)
router.route('/submit').put(compilerController.submitCode)
