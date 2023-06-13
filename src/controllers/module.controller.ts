import { Request, Response } from 'express'
import { selectModulesBySubject, createModule } from '../database/query/module.query'
import { ModuleType } from '../types/module.type'

export const getModulesBySubject = async (req: Request, res: Response) => {
  // res.status(200).send('It works!')
  try {
    const subject_id: string = req.params.subject_id
    console.log(subject_id)
    const query = await selectModulesBySubject(subject_id)
    res.status(200).json({
      status: 'success',
      data: query
    })
  } catch (e) {
    throw e
  }
}

// export const getModuleById = async (req: Request, res: Response) => {
//   // res.status(200).send('It works!')
//   try {
//     const module_id: number = parseInt(req.params.module_id)
//     console.log(module_id)
//     const query = await selectModuleById(module_id)
//     res.status(200).json({
//       status: 'success',
//       data: query
//     })
//   } catch (e) {
//     throw e
//   }
// }

export const postModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const newModule: ModuleType = req.body
    const query = await createModule(newModule)

    // If class valid and code available
    if (query !== null && typeof query === 'object') {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'Module created successfully',
          module: query
        }
      })
      return
    }

    // If class already exists
    res.status(409).json({
      status: 'failed',
      data: 'Module title already exists'
    })
    return
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt create module'
    })
  }
}
