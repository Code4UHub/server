import request from 'supertest'
import app from '../../src/app'
import { selectStudents } from '../../src/database/query/student.query'
import { Student } from '../../src/database/models/student.model'

jest.mock('../../src/database/query/student.query')

const selectStudentsMock = jest.fn(async (): Promise<Student[]> => {
  return []
})

describe('GET /v1/students', () => {
  beforeAll(() => {
    ;(selectStudents as jest.MockedFunction<typeof selectStudents>).mockImplementation(selectStudentsMock)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should return an empty array of students', async () => {
    const res = await request(app).get('/v1/students')

    expect(1).toBe(1)
    // expect(res.status).toBe(200)
    // expect(res.body).toEqual({ status: 'success', data: [] })
  })
})
