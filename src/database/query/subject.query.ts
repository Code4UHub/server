import { Subject } from '../models/subject.model'

export const selectSubjects = async () => {
  try {
    const subjects = await Subject.findAll({
      raw: true
    })

    return subjects
  } catch (e) {
    throw e
  }
}
