const router = require('express').Router();
const { body } = require('express-validator');
const { register } = require('../controllers/registerController');
const { login } = require('../controllers/loginController');
const { getUser } = require('../controllers/getUserController');
const { getGroups } = require('../controllers/getUserGroupController');
const { createGroup } = require('../controllers/newGroupController');
const { updateGroup } = require('../controllers/updateGroupController');

router.post('/register', [
  body('name', "The name must be of minimum 4 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
  body('email', "Invalid email address")
    .notEmpty()
    .escape()
    .trim()
    .isEmail(),
  body('password', "The Password must be of minimum 8 characters length")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
], register);

router.post('/login', [
  body('email', "Invalid email address")
    .notEmpty()
    .escape()
    .trim()
    .isEmail(),
  body('password', "The Password must be of minimum 4 characters length")
    .notEmpty()
    .trim()
    .isLength({ min: 4 }),
], login);

router.post('/addGroup', [
  body('groupName', "Group name must be at least 3 characters long")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
  body('members', "Members must be an array of user IDs")
    .isArray(),
], createGroup);

router.put('/updateGroup', [
  body('groupId', "Invalid group ID")
    .isInt(),
  body('members', "Members must be an array of user IDs")
    .isArray(),
], updateGroup);

router.get('/getuser', getUser);
router.get('/groups', getGroups);


module.exports = router;
