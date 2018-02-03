'use strict';
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');
const agent = request.agent(app);

const db = require('../db/db');
const Student = require('../db/models/students');
const Test = require('../db/models/tests');
describe('Routes', () => {
  before(() => {
    return db.sync({ force: true });
  });

  afterEach(() => {
    return Student.truncate({ cascade: true });
  });

  describe('Student Routes', () => {
    let pepper;
    let peter;
    let charlie;

    beforeEach(() => {
      const creatingStudents = [
        {
          firstName: 'Pepper',
          lastName: 'Potts',
          email: 'saltn@pepper.com'
        },
        {
          firstName: 'Peter',
          lastName: 'Parker',
          email: 'spidey@email.com'
        },
        {
          firstName: 'Charlie',
          lastName: 'Brown',
          email: 'cb@cbdb.com'
        }
      ].map(data => Student.create(data));
      return Promise.all(creatingStudents).then(createdStudents => {
        pepper = createdStudents[0];
        peter = createdStudents[1];
        charlie = createdStudents[2];
      });
    });

    describe('GET /student', () => {
      it('retrieves all the students', () => {
        return agent
          .get('/student')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(res => {
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body).to.have.length(3);
          });
      });
    });

    describe('GET /student/:id', () => {
      it('retrieves a single student by their id', () => {
        return agent
          .get(`/student/${pepper.id}`)
          .expect(200)
          .expect(res => {
            if (typeof res.body === 'string') res.body = JSON.parse(res.body);
            expect(res.body.fullName).to.equal('Pepper Potts');
          });
      });

      it('returns a 404 error if student does not exist in DB', () => {
        return agent.get('/student/09432').expect(404);
      });
    });

    describe('POST /student', () => {
      it('creates a new Student instance', () => {
        return agent
          .post('/student')
          .send({
            firstName: 'SQL',
            lastName: 'PRK',
            email: 'sqlprk@db.com'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body.fullName).to.equal('SQL PRK');
          });
      });
    });

    describe('PUT /student/:id', () => {
      it('updates an instance of a student', () => {
        return agent
          .put(`/student/${pepper.id}`)
          .send({ firstName: 'Salty' })
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body.fullName).to.equal('Salty Potts');
          });
      });
    });

    describe('DELETE /student/:id', () => {
      it('deletes an instance of a student', () => {
        return agent
          .delete(`/student/${charlie.id}`)
          .expect(204)
          .expect(()=> {
            return Student.findById(charlie.id)
            .then(res => expect(res).to.equal(null))
          })
      })
    })
  });
});
