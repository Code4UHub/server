import { ClassType } from '../../types/class.type'
import { Class } from '../models/class.model'

export const selectClasses = async () => {
  try {
    const classes = await Class.findAll({
      raw: true
    })

    return classes
  } catch (e) {
    throw e
  }
}

export const selectClass = async (id: string): Promise<Class[]> => {
  try {
    const classDb = await Class.findAll({
      raw: true,
      where: {
        class_id: id
      }
    })
    return classDb
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const createClass = async (classDb: ClassType): Promise<Class[] | string> => {
  try {
    const res = await selectClass(classDb['class_id'])
    const classExists = res.length > 0 ? true : false

    if (!classExists) {
      const res = await Class.create(classDb)
      const user = res.get({ plain: true })
      console.log('Class succcesfully created')
      return user
    } else {
      return 'Class already exists'
    }
  } catch (e) {
    // throw e
    console.log(e)
    return 'Error at creating class'
  }
}
