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

  it('should return a welcome message on GET /', async () => {
    const res = await request(app).get('/v1/student')

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('status', 'success')
    expect(res.body).toHaveProperty('data')
    expect(Array.isArray(res.body.data)).toBe(true)
  })
})
