const request = require('supertest');
const app = require('../server/server');

describe('route integration tests', () => {
    describe('/api/dashboard', () => {
        it('/num', () => {
            return request(app)
              .get('/api/dashboard/num')
              .expect('Content-Type', /application\/json/)
              .expect(200)
              .then(res => {
                expect(typeof res).toBe('object')
              })
        })
    })

})