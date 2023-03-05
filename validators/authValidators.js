const {check, validationResult} = require('express-validator');

const validatRegistration = [
check('name').notEmpty().withMessage('Name is require'),
check('email').isEmail().withMessage('Valid Email is require'),
check("password1","Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,),
check('age').isNumeric().withMessage('Age is require and number only'),
];

const validatlogin = [
check('email').isEmail().withMessage('Valid Email is require'),
check('password1','Please enter One lowercase,One Uppercase and One special character').isLength({min:8}).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,),
];

const validateUpdate = [
check('email').isEmail().withMessage('Valid email is require'),
//check('password1','Please enter One lowercase,One Uppercase and One special character').isLength({min:8}).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,),
];


const isRequestValidated = (req, res, next)=>{
const error = validationResult(req);
if(error.array().length > 0){
return res.status(400).json({ error: error.array()[0].msg });
} 
next();
}

module.exports = {validatRegistration,validatlogin,validateUpdate,isRequestValidated}