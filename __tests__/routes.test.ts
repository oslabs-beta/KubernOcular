import request from 'supertest';
import app from '../server/server';

describe('route tests', () => {
    describe('/api/cluster', () => {
      it('/namespaces', () => {
        return request(app)
          .get('/api/cluster/namespaces')
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then(res => {
            expect(typeof res).toBe('object')
          })
      }),
      it('/pods', () => {
        return request(app)
          .get('/api/cluster/pods?namespace=default')
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then(res => {
              expect(typeof res).toBe('object')
          })
      }),
      it('/nodes', () => {
        return request(app)
          .get('/api/cluster/nodes')
          .expect('Content-Type', /application\/json/)
              .expect(200)
              .then(res => {
                expect(typeof res).toBe('object')
              })
      })
    }),
    describe('/api/dashboard', () => {
        it('/num', () => {
            return request(app)
              .get('/api/dashboard/num')
              .expect('Content-Type', /application\/json/)
              .expect(200)
              .then(res => {
                expect(typeof res).toBe('object')
              })
        }),
        it('/general', () => {
          return request(app)
            .get('/api/dashboard/general')
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .then(res => {
              expect(typeof res).toBe('object')
            })
        }),
        it('/mem', () => {
          return request(app)
            .get('/api/dashboard/num')
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .then(res => {
              expect(typeof res).toBe('object')
            })
        }),
        it('/cpu', () => {
          return request(app)
            .get('/api/dashboard/cpu')
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .then(res => {
              expect(typeof res).toBe('object')
            })
        }),
        it('/transmit', () => {
          return request(app)
            .get('/api/dashboard/transmit')
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .then(res => {
              expect(typeof res).toBe('object')
            })
        }),
        it('/receive', () => {
          return request(app)
            .get('/api/dashboard/receive')
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .then(res => {
              expect(typeof res).toBe('object')
            })
        })
    })

})