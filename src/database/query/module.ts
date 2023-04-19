import { Module } from '../models/module'

export const selectModulesBySubject = async (subject_id: string) => {
  try {
    const modules = await Module.findAll({
      // attributes: ['module_id', 'title', 'subject_id'],
      where: {
        subject_id: subject_id
      },
      raw: true
    })
    return modules
  } catch (e) {
    throw e
  }
}

export const selectModuleById = async (module_id: number) => {
  try {
    const module = await Module.findAll({
      attributes: ['module_id', 'title', 'subject_id'],
      raw: true,
      where: {
        module_id: module_id
      }
    })
    return module
  } catch (e) {
    throw e
  }
}
