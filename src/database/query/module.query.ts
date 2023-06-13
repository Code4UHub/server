import { Module } from '../models/module.model'
import { ModuleType } from '../../types/module.type'

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

export const selectModuleByTitle = async (module_title: string) => {
  try {
    const module = await Module.findOne({
      raw: true,
      attributes: ['module_id', 'title', 'subject_id'],
      where: {
        title: module_title
      }
    })

    return module
  } catch (e) {
    throw e
  }
}

export const createModule = async (moduleDB: ModuleType): Promise<Module | null> => {
  try {
    const res = await selectModuleByTitle(moduleDB['title'])
    const exists: boolean = res !== null && typeof res === 'object' ? true : false

    if (!exists) {
      const res = await Module.create(moduleDB)

      return res
    } else {
      return null
    }
  } catch (e: any) {
    throw e
  }
}
