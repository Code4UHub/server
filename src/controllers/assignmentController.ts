import { Request, Response } from 'express'
import { selectAssignments, selectQuestionsByAssignment } from '../database/query/assignment'

export const getAssignments = async (req: Request, res: Response) => {
  // res.status(200).send('It works!')
  try {
    const query = await selectAssignments()
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}

export const getQuestionsByAssignment = async (req: Request, res: Response) => {
  const assignment_id: string = req.params.id
  try {
    const query = await selectQuestionsByAssignment(assignment_id)
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}

// export const getAssignmentsByModule = async (req: Request, res: Response) => {
//   // res.status(200).send('It works!')
//   const module_id: string = req.params['module-id'].replace('module-id=', '')
//   try {
//     const query = await selectAssignmentsByModule(module_id)
//     res.status(200).json({
//       status: 'success',
//       data: query
//     })
//   } catch (e) {
//     throw e
//   }
// }
