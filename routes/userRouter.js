const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');

const {  validatRegistration,validatlogin,validateUpdate,isRequestValidated,} = require('../validators/authValidators');
const {requireSignIn}  = require("../middleware/authMiddleware");
console.log(requireSignIn);
//User Routes
router.get('/', controller.basicController);
router.post('/users',validatRegistration,isRequestValidated,controller.registrationController);
router.post('/login', validatlogin, isRequestValidated, controller.loginController);
router.get('/allusers',requireSignIn, controller.getAllusers);
router.get('/users/:id', requireSignIn, controller.userbyid);
router.put('/users/:id', validateUpdate, isRequestValidated,requireSignIn, controller.updateUser);
router.delete('/users/:id', requireSignIn, controller.deleteUser);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;