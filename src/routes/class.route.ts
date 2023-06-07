import { Router } from 'express'
import * as classController from '../controllers/class.controller'
import protectMiddleware from '../middleware/protect.middleware'

export const router: Router = Router()

router.route('/class').get(classController.getClasses) //.post(classController.postController)
router.route('/class/:class_id').get(classController.getClass)
router.route('/class/create').post(classController.postClass)

router.route('/class/:class_id/register').post(classController.postRegisterStudent)
router.route('/class/:class_id/students').get(classController.getStudentsByClass)

router.route('/class/accept_student').put(classController.putStudentClass)
router.route('/class/reject_student').delete(classController.deleteStudentClass)

router.route('/class/accept_students').put(classController.putManyStudentClass)
router.route('/class/reject_students').delete(classController.deleteManyStudentClass)

router
  .route('/class/:class_id/modules')
  .get(classController.getEnabledModulesByClass)
  .put(classController.putEnabledModulesByClass)

router.route('/class/:class_id/leaderboard').get(classController.getLeaderboardByClass)

// router.route('/class/:class_id/modules/stats').get(classController.getModulesStatsByClass)

// route to get homework of a class
router.route('/class/:class_id/homework').get(classController.getHomeworks)

// route to get average of a class by challenge
router.route('/class/:class_id/challenge_averages').get(classController.getChallengeAveragesByClass)
