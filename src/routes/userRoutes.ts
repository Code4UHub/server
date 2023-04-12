import express, { Express, Router } from "express";
import * as userController from './../controllers/userController'

export const router: Router = Router();

router
  .route('/')
  .get(userController.getAllUsers)
//   .post(userController.createUser);

router
  .route('/:email&:pwd')
  .get(userController.getUser)