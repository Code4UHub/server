import { ClassType } from '../../types/class.type'
import { StudentClassType } from '../../types/studentClass.type'
import { EnabledModuleType } from '../../types/enabledModule.type'
import { Class } from '../models/class.model'
import { StudentClass } from '../models/studentClass.model'
import { Subject } from '../models/subject.model'
import { Teacher } from '../models/teacher.model'
import { Student } from '../models/student.model'
import { StudentNotFoundError } from '../../errors/studentNotFoundError'
import { ClassNotFoundError } from '../../errors/classNotFoundError'
import { Op, Sequelize } from 'sequelize'
import { EnabledModule } from '../models/enabledModule'
import { Module } from '../models/module.model'
import { Challenge } from '../models/challenge.model'
import { StudentModule } from '../models/studentModule.model'
import { StudentChallenge } from '../models/studentChallenge.model'
import { Homework } from '../models/homework.model'
import { StudentHomework } from '../models/studentHomework'

export const selectClasses = async (): Promise<Class[]> => {
  try {
    const classes: Class[] = await Class.findAll({
      raw: true,
      attributes: [
        'class_id',
        'is_finished',
        'subject_id',
        'subject.subject_name',
        'teacher_id',
        [Sequelize.literal('"teacher"."first_name" || \' \' || "teacher"."last_name"'), 'teacher_name']
      ],
      include: [
        {
          model: Subject,
          attributes: [],
          required: true
        },
        {
          model: Teacher,
          attributes: [],
          required: true
        }
      ]
    })
    return classes
  } catch (e: any) {
    throw e
  }
}

export const selectClass = async (id: string): Promise<Class | null> => {
  try {
    const classDb: Class | null = await Class.findOne({
      raw: true,
      attributes: [
        'class_id',
        'is_finished',
        'finished_date',
        'days',
        'start_time',
        'end_time',
        'teacher_id',
        'subject_id',
        'subject.subject_name',
        [Sequelize.literal('"teacher"."first_name" || \' \' || "teacher"."last_name"'), 'teacher_name']
      ],
      where: {
        class_id: id
      },
      include: [
        {
          model: Subject,
          attributes: [],
          required: true
        },
        {
          model: Teacher,
          attributes: [],
          required: true
        }
      ]
    })
    return classDb
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const createClass = async (classDb: ClassType): Promise<Class | null> => {
  try {
    const res = await selectClass(classDb['class_id'])
    const exists: boolean = res !== null && typeof res === 'object' ? true : false

    if (!exists) {
      const res = await Class.create(classDb)
      // const user = res.get({ plain: true })
      // console.log('Class succcesfully created')
      return res
    } else {
      return null
    }
  } catch (e: any) {
    throw e
  }
}

export const selectStudentClass = async (studentClass: StudentClassType): Promise<StudentClass | null> => {
  try {
    const student = await Student.findByPk(studentClass.student_id)
    if (!student) {
      throw new StudentNotFoundError(`Cannot find student with ID ${studentClass.student_id}`)
    }

    const class_ = await Class.findByPk(studentClass.class_id)
    if (!class_) {
      throw new ClassNotFoundError(`Cannot find class with ID ${studentClass.student_id}`)
    }

    const studentsByClass = await StudentClass.findOne({
      where: {
        class_id: studentClass.class_id,
        student_id: studentClass.student_id
      }
    })
    return studentsByClass
  } catch (e: any) {
    throw e
  }
}

export const registerStudentToClass = async (newStudentClass: StudentClassType): Promise<StudentClass | null> => {
  try {
    const res: StudentClass | null = await selectStudentClass(newStudentClass)
    const studentRegistered: boolean = res !== null && typeof res === 'object' ? true : false

    if (!studentRegistered) {
      const res = await StudentClass.create(newStudentClass)

      // const user = res.get({ plain: true })
      // console.log('Student succcesfully registered')
      return res
    }
    return null
  } catch (e: any) {
    throw e
  }
}

export const selectStudentsByClass = async (class_id: string): Promise<StudentClass[]> => {
  try {
    const studentsByClass = await StudentClass.findAll({
      raw: true,
      attributes: ['student_id', 'pending', 'request_date', 'student.first_name', 'student.last_name'],
      where: {
        class_id: class_id,
        pending: false
      },
      include: [
        {
          model: Student,
          attributes: [],
          required: true
        }
      ]
    })
    return studentsByClass
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const acceptStudentToClass = async (studentClass: StudentClassType): Promise<number[] | string> => {
  try {
    const res = await selectStudentClass(studentClass)
    const studentClassExists = res ? true : false

    // If student hasnt registered to class
    if (!studentClassExists) {
      return 'Student is not registered to that class'
    }

    // If student registered then update his status
    const acceptedStudent = await StudentClass.update(
      { pending: false },
      {
        where: {
          class_id: studentClass.class_id,
          student_id: studentClass.student_id,
          pending: true
        }
      }
    )

    // Check if a row was updated or not
    if (acceptedStudent[0] == 0) {
      return 'Student already registered to that class'
    } else {
      return acceptedStudent
    }
  } catch (e: any) {
    console.log('ERROR')
    console.log(e)
    throw e
  }
}

export const rejectStudentToClass = async (studentClass: StudentClassType): Promise<number | string> => {
  try {
    const res = await selectStudentClass(studentClass)
    const studentClassExists = res ? true : false

    // If student hasnt registered to class
    if (!studentClassExists) {
      return 'Student is not registered to that class'
    }

    // If student registered then update his status
    const deletedStudent = await StudentClass.destroy({
      where: {
        class_id: studentClass.class_id,
        student_id: studentClass.student_id,
        pending: true
      }
    })

    // Check if a row was updated or not
    if (deletedStudent == 0) {
      return 'Student is already accepted into that class'
    } else {
      return deletedStudent
    }
  } catch (e: any) {
    throw e
  }
}

export const acceptManyStudentToClass = async (arrStudentClass: StudentClassType[]) => {
  try {
    const arrStudentClassStatus = arrStudentClass.map(async (stuCla) => {
      const query = await acceptStudentToClass(stuCla)

      // If the student is successfully accepted
      if (Array.isArray(query)) {
        return {
          student_id: stuCla.student_id,
          class_id: stuCla.class_id,
          status: 'Accepted'
        }
      }
      // If there was an error at accepting the student
      else {
        return {
          student_id: stuCla.student_id,
          class_id: stuCla.class_id,
          status: query
        }
      }
    })

    return arrStudentClassStatus
  } catch (e: any) {
    // return 'Error at acepting students'
    throw e
  }
}

export const rejectManyStudentToClass = async (arrStudentClass: StudentClassType[]) => {
  try {
    const arrStudentClassStatus = arrStudentClass.map(async (stuCla) => {
      const query = await rejectStudentToClass(stuCla)

      // if the student is successfully rejected
      if (typeof query == 'number' && query > 0) {
        return {
          student_id: stuCla.student_id,
          class_id: stuCla.class_id,
          status: 'Rejected'
        }
      }
      // If there was an error at rejecting the student
      else {
        return {
          student_id: stuCla.student_id,
          class_id: stuCla.class_id,
          status: query
        }
      }
    })
    return arrStudentClassStatus
  } catch (e: any) {
    // return 'Error at rejecting student'
    throw e
  }
}

export const selectLeaderboardByClass = async (class_id: string) => {
  try {
    const arrStudentsClass = (await selectStudentsByClass(class_id)).map((stu) => stu.student_id)


    const challengesByClass = await EnabledModule.findAll({
      raw: false,
      attributes: ['class_id'],
      where: {
        class_id: class_id
      },
      
      include: [
        {
          model: Module,
          attributes: ['module_id'],
          required: true,
          include: [
            {
              model: Challenge,
              attributes: ['challenge_id'],
              required: true,
              include: [
                {
                  model: StudentChallenge,
                  attributes: ['student_id', 'score'],
                  required: true,
                  include: [
                    {
                      model: Student,
                      attributes: ['first_name', 'last_name'],
                      required: true,
                      where: {
                        student_id: {
                          [Op.in]: arrStudentsClass
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    })

    // return challengesByClass

    // Format to leaderboard
    const leaderBoard: { [key: string]: any } = {}
    const leaderBoardArray: { student: string; score: number; name: string; position?: number }[] = []

    console.log("----modules-------")
    console.log(challengesByClass.length)
    console.log("-----------")

    for (let i = 0; i < challengesByClass.length; i++) {
      const element = challengesByClass[i].module.challenge as any
 
      for (let j = 0; j < element.length; j++) {
        const newElement = element[j].student_challenge

        console.log("Second",  newElement.length)
        

        for (let k = 0; k < newElement.length; k++) {
          const stuChall = newElement[k];

          
          if (stuChall.student_id in leaderBoard) {
            leaderBoard[stuChall.student_id].score += stuChall.score
          } else {
            leaderBoard[stuChall.student_id] = {
              score: stuChall.score,
              name: stuChall.student.first_name + ' ' + stuChall.student.last_name
            }
          }
        }
        
      }
    }

    console.log(leaderBoard)

    Object.keys(leaderBoard).forEach((key) => {
      const value = leaderBoard[key]
      leaderBoardArray.push({ student: key, score: value.score, name: value.name })
    })

    leaderBoardArray.sort((a, b) => {
      return b.score - a.score
    })

    const finalLeaderboard = leaderBoardArray.map((el, idx) => {
      el['position'] = idx + 1
      return el
    })

    // return challengesByClass

    return finalLeaderboard
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const selectEnabledModulesByClass = async (class_id: string): Promise<EnabledModule[]> => {
  try {
    const challengesByClass = await EnabledModule.findAll({
      raw: true,
      attributes: ['module_id', 'module.title', 'is_active'],
      where: {
        class_id: class_id
      },
      order: [['module_id', 'ASC']],
      include: [
        {
          model: Module,
          attributes: [],
          required: true
        }
      ]
    })
    return challengesByClass
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const updateEnabledModulesByClass = async (class_id: string, modulesClass: EnabledModuleType[]) => {
  try {
    // const challengesByClass = await EnabledModule.update(
    //   { pending: true },
    //   where: {
    //     class_id: 'class_id'
    //   }
    //   )
    const enabledModuleClassStatus = modulesClass.map(async (module) => {
      const query = await EnabledModule.update(
        { is_active: module.is_active },
        {
          where: {
            class_id: class_id,
            module_id: module.module_id
          }
        }
      )

      if (Array.isArray(query)) {
        return {
          status: 'success',
          module_id: module.module_id,
          is_active: module.is_active
        }
      } else {
        return {
          status: 'failed',
          module_id: module.module_id,
          is_active: module.is_active
        }
      }
    })

    return enabledModuleClassStatus
  } catch (e: any) {
    throw e
  }
}

export const selectHomeworksByClassId = async (
  class_id: string,
  queryFilters: { limit?: string; startDate?: Date; endDate?: Date }
): Promise<Homework[]> => {
  const startDate = queryFilters.startDate ? queryFilters.startDate : new Date('2023-01-01')
  const currentDate = new Date()
  const endDate = queryFilters.endDate
    ? queryFilters.endDate
    : new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())

  try {
    const homeworksByClass = await Homework.findAll({
      raw: true,
      limit: queryFilters.limit ? parseInt(queryFilters.limit) : undefined,
      order: [['deadline', 'ASC']],
      where: {
        class_id: class_id,
        deadline: {
          [Op.between]: [startDate, endDate]
        }
      }
    })
    return homeworksByClass
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const selectChallengeAverageByClass = async (class_id: string): Promise<Module[]> => {
  const arrStudentsClass = (await selectStudentsByClass(class_id)).map((stu) => stu.student_id)
  
  try {
    const modulesByClass = await Module.findAll({
      raw: false,
      attributes: ['module_id', 'title'],
      order: [['module_id', 'ASC']],
      include: [
        {
          model: EnabledModule,
          attributes: [],
          where: {
            class_id: class_id
          },
          required: true
        },
        {
          model: StudentModule,
          attributes: [],
          required: true
        },
        {
          model: Challenge,
          attributes: ['challenge_id', 'title', 'total_points', "difficulty_id"],
          required: false,
          include: [
            {
              model: StudentChallenge,
              attributes: ['student_id', 'score', 'status'],
              required: true,
              where: {
                student_id: {
                  [Op.in]: arrStudentsClass
                }
              }
            }
          ]
        }
      ]
    })

    const hashDif = {
      1: "Fácil",
      2: "Medio",
      3: "Difícil"
    } as any

    const modulesFormatted = []
    const arrayChallenges = [] as any

    for (let i = 0; i < modulesByClass.length; i++) {
      const module = modulesByClass[i]
      const currentModule = {} as any
      currentModule['module_id'] = module.module_id
      currentModule['title'] = module.title

      const challenges = module.challenge as any
      const challengesFormatted = []

      let numberStudents
      for (let j = 0; j < challenges.length; j++) {
        const challenge = challenges[j]

        const studentChallenges = challenge.student_challenge as any
        numberStudents = studentChallenges.length
        let sumScores = 0
        for (let k = 0; k < studentChallenges.length; k++) {
          const stuChall = studentChallenges[k]
          sumScores += stuChall.score
        }
        const avgChallenge = sumScores / numberStudents

        challengesFormatted.push({
          id: challenge.challenge_id,
          title: module.title + " - " + hashDif[challenge.difficulty_id],
          percentage: Math.floor((avgChallenge / challenge.total_points) * 100)
        })
      }
      challengesFormatted.sort((a, b) => a.id - b.id)
      arrayChallenges.push(...challengesFormatted)
      // currentModule['challenges'] = challengesFormatted
      // modulesFormatted.push(currentModule)
    }

    return arrayChallenges
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const selectChallengeProgressByClass = async (class_id: string): Promise<Module[]> => {
  try {
    const arrStudentsClass = (await selectStudentsByClass(class_id)).map((stu) => stu.student_id)

    const modulesByClass = await Module.findAll({
      raw: false,
      attributes: ['module_id', 'title'],
      order: [['module_id', 'ASC']],

      include: [
        {
          model: EnabledModule,
          attributes: [],
          where: {
            class_id: class_id
          },
          required: true
        },
        {
          model: StudentModule,
          attributes: [],
          required: true
        },
        {
          model: Challenge,
          attributes: ['challenge_id', 'title', 'total_points', "difficulty_id"],
          required: false,
          include: [
            {
              model: StudentChallenge,
              attributes: ['student_id', 'score', 'status'],
              required: true,
              where: {
                student_id: {
                  [Op.in]: arrStudentsClass
                }
              }
            }
          ]
        }
      ]
    })

    const hashDif = {
      1: "Fácil",
      2: "Medio",
      3: "Difícil"
    } as any

    const modulesFormatted = []
    const arrayChallenges = [] as any

    for (let i = 0; i < modulesByClass.length; i++) {
      const module = modulesByClass[i]
      const currentModule = {} as any
      currentModule['module_id'] = module.module_id
      currentModule['title'] = module.title

      const challenges = module.challenge as any
      const challengesFormatted = []

      let numberStudents
      for (let j = 0; j < challenges.length; j++) {
        const challenge = challenges[j]

        const studentChallenges = challenge.student_challenge as any
        numberStudents = studentChallenges.length
        let approvedStudents = 0
        for (let k = 0; k < studentChallenges.length; k++) {
          const stuChall = studentChallenges[k]

          if (stuChall.score / challenge.total_points >= 0.7) {
            approvedStudents += 1
          }
        }

        const avgProgress = approvedStudents / numberStudents

        challengesFormatted.push({
          id: challenge.challenge_id,
          title: module.title + " - " + hashDif[challenge.difficulty_id],
          percentage: Math.floor(avgProgress * 100)
        })
      }

      challengesFormatted.sort((a, b) => a.id - b.id)
      currentModule['challenges'] = challengesFormatted
      modulesFormatted.push(currentModule)
      arrayChallenges.push(...challengesFormatted)
    }

    return arrayChallenges
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const selectTotalPointsByModule = async (module_id: number) => {
  try {
    const totalPointsByModule: any = await Challenge.findAll({
      raw: true,
      attributes: [[Sequelize.literal('SUM("Challenge"."total_points")'), 'sumValue']],
      group: ['module.module_id'],
      include: [
        {
          model: Module,
          required: true,
          attributes: ['module_id'],
          where: {
            module_id: module_id
          }
        }
      ]
    })

    return totalPointsByModule[0].sumValue
  } catch (e: any) {
    throw e
  }
}

export const selectModuleAverageByClass = async (class_id: string): Promise<Module[]> => {
  try {
    const arrStudentsClass = (await selectStudentsByClass(class_id)).map((stu) => stu.student_id)
    
    const modulesByClass = await Module.findAll({
      raw: false,
      attributes: ['module_id', 'title'],
      order: [['module_id', 'ASC']],
      include: [
        {
          model: EnabledModule,
          attributes: [],
          where: {
            class_id: class_id
          },
          required: true
        },
        {
          model: StudentModule,
          attributes: ['score'],
          required: true,
          where: {
            student_id: {
              [Op.in]: arrStudentsClass
            }
          }
        }
      ]
    })

    const modulesFormatted = []

    for (let i = 0; i < modulesByClass.length; i++) {
      const module = modulesByClass[i]
      const currentModule = {} as any
      currentModule['id'] = module.module_id
      currentModule['title'] = module.title
      const totalPointsByModule = await selectTotalPointsByModule(module.module_id)

      const studentModules = module.student_module as any
      let numberStudents = studentModules.length
      let sumScores = 0

      for (let k = 0; k < studentModules.length; k++) {
        const stuMod = studentModules[k]
        sumScores += stuMod.score
      }

      const avgModule = sumScores / numberStudents
      currentModule['percentage'] = Math.floor((avgModule / totalPointsByModule) * 100)
      modulesFormatted.push(currentModule)
    }

    return modulesFormatted
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const selectModuleProgressByClass = async (class_id: string): Promise<Module[]> => {
  try {
    const arrStudentsClass = (await selectStudentsByClass(class_id)).map((stu) => stu.student_id)

    const modulesByClass = await Module.findAll({
      raw: false,
      attributes: ['module_id', 'title'],
      order: [['module_id', 'ASC']],
      include: [
        {
          model: EnabledModule,
          attributes: [],
          where: {
            class_id: class_id
          },
          required: true
        },
        {
          model: StudentModule,
          attributes: ['score'],
          required: true,
          where: {
            student_id: {
              [Op.in]: arrStudentsClass
            }
          }
        }
      ]
    })

    const modulesFormatted = []

    for (let i = 0; i < modulesByClass.length; i++) {
      const module = modulesByClass[i]
      const currentModule = {} as any
      currentModule['id'] = module.module_id
      currentModule['title'] = module.title
      const totalPointsByModule = await selectTotalPointsByModule(module.module_id)

      const studentModules = module.student_module as any
      let numberStudents = studentModules.length
      let approvedStudents = 0

      for (let k = 0; k < studentModules.length; k++) {
        const stuMod = studentModules[k]

        if (stuMod.score / totalPointsByModule >= 0.7) {
          approvedStudents += 1
        }
      }

      const avgProgress = approvedStudents / numberStudents
      currentModule['percentage'] = Math.floor(avgProgress * 100)
      currentModule['number_of_students'] = numberStudents
      currentModule['number_approved_students'] = approvedStudents
      modulesFormatted.push(currentModule)
    }

    return modulesFormatted
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

//
//
//
//
// "security"
export const selectClassByStudent = async (class_id: string, student_id: string): Promise<Class | null> => {
  try {
    const classDb: Class | null = await Class.findOne({
      raw: true,
      attributes: [
        'class_id',
        'is_finished',
        'finished_date',
        'days',
        'start_time',
        'end_time',
        'teacher_id',
        'subject_id',
        'subject.subject_name',
        [Sequelize.literal('"teacher"."first_name" || \' \' || "teacher"."last_name"'), 'teacher_name']
      ],
      where: {
        class_id: class_id
      },
      include: [
        {
          model: Subject,
          attributes: [],
          required: true
        },
        {
          model: Teacher,
          attributes: [],
          required: true
        },
        {
          model: StudentClass,
          attributes: [],
          required: true,
          where: {
            student_id: student_id,
            pending: false
          }
        }
      ]
    })
    return classDb
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const selectClassByTeacher = async (class_id: string, teacher_id: string): Promise<Class | null> => {
  try {
    const classDb: Class | null = await Class.findOne({
      raw: true,
      attributes: [
        'class_id',
        'is_finished',
        'finished_date',
        'days',
        'start_time',
        'end_time',
        'teacher_id',
        'subject_id',
        'subject.subject_name',
        [Sequelize.literal('"teacher"."first_name" || \' \' || "teacher"."last_name"'), 'teacher_name']
      ],
      where: {
        class_id: class_id,
        teacher_id: teacher_id
      },
      include: [
        {
          model: Subject,
          attributes: [],
          required: true
        },
        {
          model: Teacher,
          attributes: [],
          required: true
        }
      ]
    })
    return classDb
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}


export const selectProgressByClassStudentId = async (class_id:string,
  student_id:string)  => {
  try {

    const res = await selectStudentClass({class_id, student_id}as any)

    const studentClassExists = res ? true : false

    if (!studentClassExists) {
      return 'Student is not registered to that class'
    }

    // If student registered
    const challengesByClass  = await Class.findAll({
      raw: true,
      attributes: ["class_id"],
      include: [
        {
          model: EnabledModule,
          attributes: ["class_id"],
          required: true,
          where:{
            class_id: class_id
          },
          include: [
            {
            model: Module,
            attributes: ["module_id"],
            required: true,
            include: [
              {
              model: Challenge,
              attributes: ["challenge_id", "total_points"],
              required: true,
              include: [
                {
                model: StudentChallenge,
                attributes: ["score"],
                required: true,
                where:{
                  student_id: student_id
                }
                }
              ]
              }
            ]
            }
          ]
        }
      ]
    }) as any

    const numberChallenges = challengesByClass.length
    let approvedChallenges = 0
    for (let i = 0; i < challengesByClass.length; i++) {
      const challenge = challengesByClass[i] 

      if(challenge["enabled_module.module.challenge.student_challenge.score"] / challenge["enabled_module.module.challenge.total_points"] >= 0.7){
        approvedChallenges += 1
      }
    }
    

    return (approvedChallenges / numberChallenges) * 100
  } catch (e: any) {
    throw e
    
  }
}



export const selectProgressByClassTeacherId = async (class_id:string,
  teacher_id:string)  => {
  try {

    const challenges = await selectChallengeProgressByClass(class_id)

    const totalChalleges = challenges.length
    let approvedChallenges = 0
    for (let i = 0; i < totalChalleges; i++) {
      const chall = challenges[i] as any
      if(chall.percentage >= 70){
        approvedChallenges += 1
      }
    }


    return (approvedChallenges / totalChalleges) * 100
  } catch (e: any) {
    throw e
    
  }
}



export const selectHomeworksByStudentId = async (class_id:string, student_id: string) => {
  try {
    const homeworks = await Homework.findAll({
      raw: true,
      attributes:["homework_id", "title", "is_active", "student_homework.score", "deadline", "difficulty_id", "total_points"],
      order: [["deadline", "ASC"]],
      include: [
        {
          model: StudentHomework,
          required: true,
          attributes: [],
          where: {
            student_id: student_id,
          },
        },
        {
          model: Class,
          required: true,
          attributes: [],
          where:{
            class_id: class_id
          }
        }
      ]
    }) as any

    homeworks.sort((a:any, b:any) => a.deadline - b.deadline)
    
    return homeworks
  } catch (e: any) {
    throw e
  }
}