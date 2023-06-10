import { Sequelize } from 'sequelize'
import { HomeworkType } from '../../types/homework.type'
import { HomeworkQuestionType } from '../../types/homeworkQuestion.type'
import { QuestionHType } from '../../types/questionH.type'
import { Homework } from '../models/homework.model'
import { HomeworkQuestion } from '../models/homeworkQuestion'
import { Module } from '../models/module.model'
import { QuestionH } from '../models/questionH.model'
import { Student } from '../models/student.model'
import { StudentHomework } from '../models/studentHomework'
import { StudentHomeworkQuestion } from '../models/studentHomeworkQuestion.model'
import { Subject } from '../models/subject.model'
import { selectDifficulty } from './difficulty.query'

export const selectHomework = async (homework_id: string) => {
  try {
    const challenge = await Homework.findOne({
      raw: true,
      // attributes: [],
      where: {
        homework_id: homework_id
      }
    })

    return challenge
  } catch (e) {
    throw e
  }
}

export const selectQuestions = async () => {
  try {
    const questions = await QuestionH.findAll({
      raw: true
    })

    return questions
  } catch (e) {
    throw e
  }
}

export const selectQuestionsBySubjectAndDifficultyId = async (
  subject_id: string,
  difficulty_id: string
): Promise<QuestionH[]> => {
  try {
    const questionsByDifficulty = await QuestionH.findAll({
      attributes: ['question_h_id', 'difficulty_id', 'type', 'module_id', 'module.title', 'question'],
      raw: true,
      where: {
        difficulty_id: difficulty_id
      },
      include: [
        {
          model: Module,
          attributes: [],
          required: true,
          include: [
            {
              model: Subject,
              attributes: [],
              required: true,
              where: {
                subject_id: subject_id
              }
            }
          ]
        }
      ]
    })
    return questionsByDifficulty
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const selectQuestionsByModuleAndDifficultyId = async (
  module_id: string,
  difficulty_id: string
): Promise<QuestionH[]> => {
  try {
    const questionsByDifficulty = await QuestionH.findAll({
      attributes: ['question_h_id', 'difficulty_id', 'type', 'module_id', 'module.title', 'question'],
      raw: true,
      where: {
        difficulty_id: difficulty_id
      },
      include: [
        {
          model: Module,
          attributes: [],
          required: true,
          where: {
            module_id: module_id
          }
        }
      ]
    })
    return questionsByDifficulty
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const createQuestion = async (newQuestion: QuestionHType): Promise<QuestionH | null> => {
  try {
    const res = await QuestionH.create(newQuestion)
    return res
  } catch (e: any) {
    throw e
  }
}

export const createHomework = async (newHomework: HomeworkType, arrQuestions: string[]): Promise<Homework | null> => {
  try {
    const difficultyId = newHomework.difficulty_id
    const openQuestions = newHomework.open_questions
    const closedQuestions = newHomework.closed_questions
    const difficultyObj = await selectDifficulty(difficultyId)

    if (!difficultyObj) {
      throw new Error('Difficulty not valid')
    }

    newHomework.total_points = (openQuestions + closedQuestions) * difficultyObj.points_per_question
    const res = await Homework.create(newHomework)

    console.log("open: ", openQuestions)
    console.log("closed: ", closedQuestions)
    console.log("arrQuestions: ", arrQuestions)

    // Link the homework id with the questions
    const homework_id = res.homework_id
    arrQuestions.map(async (question_h_id) => {
      await HomeworkQuestion.create({
        homework_id: homework_id,
        question_h_id: question_h_id
      })
    })

    
    return res
  } catch (e: any) {
    throw e
  }
}

export const createQuestionHomework = async (
  newHomeworkQuestion: HomeworkQuestionType
): Promise<HomeworkQuestion | null> => {
  try {
    const res = await HomeworkQuestion.create(newHomeworkQuestion)
    return res
  } catch (e: any) {
    throw e
  }
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//

export const selectHomeworkQuestionsByStudent = async (homework_id: string, student_id: string) => {
  try {
    const res = await QuestionH.findAll({
      attributes: [
        'question_h_id',
        'question',
        'student_homework_question.solution',
        'student_homework_question.passed',
        'type',
        'difficulty_id',
        'module_id',
        'module.title'
      ],
      raw: true,
      order: [['question_h_id', 'ASC']],
      include: [
        {
          model: StudentHomeworkQuestion,
          required: true,
          attributes: [],
          where: { student_id: student_id, homework_id: homework_id }
        },
        {
          model: Module,
          required: true,
          attributes: []
        },
        {
          model: HomeworkQuestion,
          required: true,
          attributes: [],
          where: { homework_id: homework_id }
        },

      ]
    })
    return res
  } catch (e: any) {
    console.log(e.message)
    throw e
  }
}

export const selectHomeworkOpenQuestions = async (homework_id: string) => {
  try {
    const res = await QuestionH.findAll({
      raw: true,
      attributes: ['question_h_id', 'type'],
      where: { type: 'open' },
      include: [
        {
          model: HomeworkQuestion,
          required: true,
          where:{homework_id: homework_id}
        }
      ]
    })
    return res
  } catch (e: any) {
    throw e
  }
}

export const selectHomeworkClosedQuestions = async (homework_id: string) => {
  try {
    const res = await QuestionH.findAll({
      raw: true,
      attributes: ['question_h_id', 'type'],
      where: { type: 'closed' },
      include: [
        {
          model: HomeworkQuestion,
          required: true,
          where:{homework_id: homework_id}
        }
      ]
    })
    return res
  } catch (e: any) {
    throw e
  }
}

export const createHomeworkQuestions = async (homework_id: string, student_id: string) => {
  try {
    // Obtener la info del challenge -> openquestions y closedquestion
    const homework: Homework | null = await selectHomework(homework_id)

    if (!homework) {
      throw new Error('Homework not found')
    }

    // Obtener todas las preguntas que tengan el challenge id
    const openQuestions = await selectHomeworkOpenQuestions(homework_id)
    openQuestions.sort(() => Math.random() - 0.5)

    const closedQuestions = await selectHomeworkClosedQuestions(homework_id)
    closedQuestions.sort(() => Math.random() - 0.5)

    if (homework.closed_questions > closedQuestions.length) {
      throw new Error('Not enough closed question')
    }
    if (homework.open_questions > openQuestions.length) {
      throw new Error('Not enough open question')
    }

    // Insert random dependiendo de la cantidad de preguntas

    const arrStudentHomeworkQuestion = []

    for (let i = 0; i < homework.open_questions; i++) {
      const element = {
        homework_id: homework_id,
        question_h_id: openQuestions[i].question_h_id,
        student_id: student_id,
        solution: {},
        passed: false
      }
      arrStudentHomeworkQuestion.push(element)
    }

    for (let i = 0; i < homework.closed_questions; i++) {
      const element = {
        homework_id: homework_id,
        question_h_id: closedQuestions[i].question_h_id,
        student_id: student_id,
        solution: {},
        passed: false
      }
      arrStudentHomeworkQuestion.push(element)
    }

    const res = await StudentHomeworkQuestion.bulkCreate(arrStudentHomeworkQuestion)

    return res
  } catch (e: any) {
    throw e
  }
}

export const selectStudentScoresByClassId = async (homework_id: string): Promise<StudentHomework[]> => {
  try {
    const studentHomework = await StudentHomework.findAll({
      raw: true,
      attributes: [
        [Sequelize.literal('"student"."first_name" || \' \' || "student"."last_name"'), 'student_name'],
        'student_id',
        'score'
      ],
      where: {
        homework_id: homework_id
      },
      order: [['score', 'ASC']],
      include: [
        {
          model: Student,
          required: true,
          attributes: []
        }
      ]
    })
    return studentHomework
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const updateStudentHomeworkQuestion = async (
  homework_id: string,
  student_id: string,
  question_id: string,
  newSolution: object
): Promise<number[] | string> => {
  try {
    // If student registered then update his status
    const stuHome = await StudentHomeworkQuestion.update(
      { solution: newSolution },
      {
        where: {
          homework_id: homework_id,
          student_id: student_id,
          question_h_id: question_id
        }
      }
    )

    // Check if a row was updated or not
    if (stuHome[0] == 0) {
      return 'Student homework question not updated'
    } else {
      return stuHome
    }
  } catch (e: any) {
    console.log('ERROR')
    console.log(e)
    throw e
  }
}
