import request from 'supertest'
import app from '../../src/app'
import { Sequelize } from 'sequelize-typescript'
import { createDb } from '../../src/database/connection'

describe('GET /v1/students', () => {
  let sequelize: Sequelize

  beforeAll(async () => {
    sequelize = await createDb()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('Unauthorized -> Token not provided', async () => {
    const res = await request(app).get('/v1/student')

    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty('status', 'failed')
    expect(res.body).toMatchObject({ data: 'Unauthorized' })
  })

  it('Sucess -> Student login', async () => {
    const res = await request(app).get('/v1/student/login?email=a00000001@tec.mx&password=Abc123456')

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('status', 'success')
    expect(res.body).toHaveProperty('data')
  })
})
