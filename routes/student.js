const router = require('express').Router()
const Student = require('../db/models/students')

//Get student by id
router.get('/:studentId', function (req, res, next) {
  Student.findById(req.params.studentId)
  .then(student => res.status(200).json(student))
  .catch(next)
})

//Get all students
router.get('/', function(req, res ,next) {
  Student.findAll()
  .then(students => res.status(200).json(students))
})

//Get student by id and return student initials
router.get('/initials/:id', function(req, res ,next) {
  Student.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(student => student.getInitials())
  .then(initials => res.json(initials))
  .catch(next)
})

//Post new student to the database
router.post('/', function(req, res, next) {
  Student.create(req.body)
  .then(student => res.status(201).json(student))
  .catch(next)
})

//Update a student
router.put('/:id', function (req, res, next) {
  Student.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(test => res.status(201).json(test))
  .catch(next)
})

//Delete a student
router.delete('/:id', function (req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((result) => res.json(result))
  .catch(next)
})

module.exports = router
