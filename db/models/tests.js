const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../db')
const Student = require('./students')

const Test = db.define('test', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
    },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

//Class Method:  Find all test with a score of 70 or more
Test.passing = function() {
  return Test.findAll({
    where: {
      grade: {
        [Op.gt]: 70
      }
    }
  })
}

//Class Method:  Find all tests for a particular subject
Test.findBySubject = function(subject){
  return Test.findAll({
    where: {
      subject: subject
    }
  })
}

Test.belongsTo(Student)

module.exports = Test
