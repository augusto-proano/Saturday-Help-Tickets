const router = require('express').Router();
const Student = require('../db/models/students');

router.get('/', (req, res, next) => {
    Student.findAll()
    .then(students => res.send(students))
    .catch(next)
});


router.get('/:id', (req, res, next) => {
    Student.findById(Number(req.params.id))
    .then(student => {
        if(!student) res.status(404);
        res.send(student);
    })
    .catch(next);
});


router.post('/', (req, res, next) => {
    Student.create(req.body)
    .then(newStudent => res.send(newStudent))
    .catch(next)
});

router.put('/:id', (req, res, next) => {
    Student.findById(Number(req.params.id))
    .then(student => {
        student.update(req.body)
        res.status(201).send(student)
    })
    .catch(next)
});

router.delete('/:id', (req, res, next) => {
    Student.destroy({
        where: {id: Number(req.params.id)}
    })
    .then(() => res.status(204).send())
    .catch(next)
});







module.exports = router;
