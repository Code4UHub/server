import { Subject } from '../models/subject.model'
import { SubjectType } from '../../types/subject.type'

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

export const createClass = async (classDb: SubjectType): Promise<Subject | null> => {
  try {
    const res = await selectSubject(classDb['subject_id'])
    const exists: boolean = res !== null && typeof res === 'object' ? true : false

    if (!exists) {
      const res = await Subject.create(classDb)

      return res
    } else {
      return null
    }
  } catch (e: any) {
    throw e
  }
}
