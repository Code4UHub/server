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
