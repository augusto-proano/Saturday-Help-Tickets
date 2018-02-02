'use strict';
console.log("DFSDFSDFDSF")
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
    beforeEach(() => {
      return Promise.all([
        Student.create({
          firstName: 'Pepper',
          lastName: 'Potts',
          email: 'saltn@pepper.com'
        }),
        Student.create({
          firstName: 'Peter',
          lastName: 'Parker',
          email: 'spidey@email.com'
        }),
        Student.create({
          firstName: 'Charlie',
          lastName: 'Brown',
          email: 'cb@cbdb.com'
        })
      ]);
    });

    describe('GET /student', () => {
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
});
