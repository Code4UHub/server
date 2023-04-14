import express, { Express, Router } from 'express'
import * as userController from './../controllers/userController'

export const router: Router = Router()

router.route('/').get(userController.getUsers).post(userController.postUser)

router.route('/:email&:pwd').get(userController.getUser)
