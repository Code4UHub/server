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

export const selectSubject = async (subject_id: string) => {
  try {
    const subject = await Subject.findOne({
      raw: true,
      attributes: ['subject_name'],
      where: {
        subject_id: subject_id
      }
    })

    return subject
  } catch (e) {
    throw e
  }
}
