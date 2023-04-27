import { Router } from 'express'
import * as subjectController from '../controllers/subject.controller'

export const router: Router = Router()

router.route('/subject').get(subjectController.getSubjects)
