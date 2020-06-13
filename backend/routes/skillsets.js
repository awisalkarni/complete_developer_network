const router = require('express').Router();
let SkillSet = require('../models/SkillSet.model');

router.route('/').get((req, res) => {
    SkillSet.find()
        .then(skillsets => res.json(skillsets))
        .catch(err => res.status(400).json('Error: ' + err));
});

//add
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const proficiency = req.body.proficiency;

    const newSkillSet = new SkillSet({
        name: name,
        proficiency: proficiency
    });

    newSkillSet.save()
        .then(() => res.json('SkillSet added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get one 
router.route('/:id').get((req, res) => {
    SkillSet.findById(req.params.id)
        .then(SkillSet => res.json(SkillSet))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete one
router.route('/:id').delete((req, res) => {
    SkillSet.findByIdAndDelete(req.params.id)
        .then(() => res.json('SkillSet deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update
router.route('/update/:id').post((req, res) => {
    SkillSet.findById(req.params.id)
        .then(skillset => {
            skillset.name = req.body.name
            skillset.proficiency = req.body.proficiency

            skillset.save()
                .then(() => res.json('skillset updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;