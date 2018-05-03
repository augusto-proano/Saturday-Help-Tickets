const router = require('express').Router();
const Test = require('../db/models/tests');
const Student = require('../db/models/students');

router.get('/', (req, res, next) => {
    Test.findAll()
    .then(tests => res.send(tests))
    .catch(next)
});

router.get('/passing', (req, res, next) => {
    Test.passing()
    .then(tests => res.send(tests))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Test.findById(Number(req.params.id))
    .then(test => res.send(test))
    .catch(next)
});

router.get('/subject/:subject', (req, res, next) => {
    Test.findBySubject(req.params.subject).then(tests => res.send(tests))
    .catch(next)
});

router.post('/student/:studentId', (req, res, next) => {
    req.body.studentId = Number(req.params.studentId)
    Test.create(req.body)
    .then(student => res.status(201).send(student))
    .catch(next)

    // Student.findById(Number(req.params.studentId))
    // .then(student => {
    //     return Test.create(req.body)
    //     .then(newTest => newTest.setStudent(student))
    // })
    // .then(test => res.status(201).send(test))
    // .catch(next)
});

router.delete('/:id', (req, res, next) => {
    Test.destroy({
        where: {id: Number(req.params.id)}
    })
    .then(() => res.status(204).send())
    .catch(next)
});

module.exports = router;
