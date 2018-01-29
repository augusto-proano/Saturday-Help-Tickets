const router = require('express').Router()
const Test = require('../db/models/tests')
const Student = require('../db/models/students')

//Get all tests with scores at or above 70
router.get('/passing', function (req, res, next) {
  Test.passing()
  .then(tests => res.status(200).json(tests))
  .catch(next)
})

//Get all tests
router.get('/', function (req, res, next) {
  Test.findAll()
  .then(tests => res.json(tests))
  .catch(next)
})

//Get test by id
router.get('/:id', function (req, res, next) {
  Test.findById(req.params.id)
  .then(test => res.status(200).json(test))
  .catch(next)
})

//Get all tests of a particular subject
router.get('/subject/:subject', function (req, res, next) {
  Test.findAll({
    where: {
      subject: req.params.subject
    }
  })
  .then(test => res.status(200).json(test))
  .catch(next)
})

//Create a test and 'set' student associated with it
router.post('/:studentId', function(req, res, next) {
  let studentInstance
  Student.findOne({
    where: {
      id: req.params.studentId
    }
  })
  .then(student => {
    studentInstance = student
    return Test.create(req.body)
  })
  .then(test => {
    test.setStudent(studentInstance)
    res.status(201).json(test)
  })
  .catch(next)
})


//Delete a test
router.delete('/:id', function (req, res, next) {
  Test.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.send('Test deleted successfully!'))
  .catch(next)
})

module.exports = router
