import { Router } from 'express'
import * as compilerController from '../controllers/compiler.controller'

export const router: Router = Router()

router.route('/run').put(compilerController.runCode)
router.route('/challenge/submit').put(compilerController.submitChallenge)
router.route('/homework/submit').put(compilerController.submitHomework)
