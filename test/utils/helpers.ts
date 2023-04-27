import { agent as _request } from 'supertest'
import getApp from '../../src/app'
export const request = _request(getApp())
