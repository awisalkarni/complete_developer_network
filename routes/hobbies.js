const router = require('express').Router();
let Hobby = require('../models/hobby.model');

router.route('/').get((req, res) => {
    Hobby.find()
        .then(hobbies => res.json(hobbies))
        .catch(err => res.status(400).json('Error: ' + err));
});

//add
router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newhobby = new hobby({
        name: name
    });

    newhobby.save()
        .then(() => res.json('hobby added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get one 
router.route('/:id').get((req, res) => {
    Hobby.findById(req.params.id)
        .then(hobby => res.json(hobby))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete one
router.route('/:id').delete((req, res) => {
    Hobby.findByIdAndDelete(req.params.id)
        .then(() => res.json('hobby deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update
router.route('/update/:id').post((req, res) => {
    Hobby.findById(req.params.id)
        .then(hobby => {
            hobby.name = req.body.name
            hobby.save()
                .then(() => res.json('hobby updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;