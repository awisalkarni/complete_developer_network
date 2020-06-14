const router = require('express').Router();
let User = require('../models/user.model');
let SkillSet = require('../models/skillset.model');
let Hobby = require('../models/hobby.model');
const bcrypt = require('bcryptjs');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/prepare').get((req, res) => {
  Promise.all([
    SkillSet.find(),
    Hobby.find()
]).then(([skillsets, hobbies]) => {
    res.json({
        'skillsets': skillsets,
        'hobbies': hobbies
    });
})
    .catch(err => { res.status(400).json('error: ' + err) });
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;


  const newUser = new User({
    username: username,
    email: email,
    password: password,
    phone_number: phoneNumber,

  });

  // hash password
  if (password) {
    newUser.password = bcrypt.hashSync(newUser.password, 10);
  }

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.phone_number = req.body.phoneNumber;


      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;