const Data = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config({path:'../config/.env'});

//Basic Route Create
const basicController = (req, res, next)=>{
try{
res.status(200).send({'message':'Welcome Mr Vikas Singh'});
}catch(err){
res.status(400).send({'Error':'Check Error : '+err});
}
}

//Registration Route Create
const registrationController = async (req, res)=>{
const {name, email, password1, age} = req.body;
const user = await Data.findOne({email:email});
if(user){
res.status(403).send({
"status": false,
"message": "Email is already exist",
});
}else{
const password = await bcrypt.hash(password1, 10);
const bodyData = {
name,
email,
password,
age
}
const userData = new Data(bodyData);
userData.save().then((val)=>{
res.status(201).send({
"status": true,
"message": "Registration Successfull",
"Data":val
})
}).catch(err=>{
res.send(400).send({
"status": false,
"message": "Some Error",
"Error": err
})
})
}
}

//Login Route Create
const loginController = async(req, res)=>{
const {email, password1, name, cpassword} = req.body;
const user = await Data.findOne({$or:[{name: name}, {email: email}]});
if(user){

const password = await bcrypt.compare(password1, user.password);

const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"30d"});
if(password){
res.status(200).json({
	            status: true,
	            "token":token,
                message: "login successful",
                data: user
            });
}else{
res.status(400).json({
                status: false,
                message: "User and Passwords Doesn't Match",
            });
}
}else{
if(name){
res.status(403).send({
"status": false,
"message":"Username Is Not Match"
});
}else{
res.status(403).send({
"status": false,
"message":"Email Is Not Match"
});
}
}
}

//get all user
const getAllusers = async(req, res)=>{
await Data.find({}).then((val)=>{
res.status(200).send({
	'status':true,
	'message':'All Data Fetch successful',
	'data':val
});
}).catch(err=>{
res.status(400).send({
	'status':false,
	'message':'Some error',
	'Data':'Check Error '+err
});
})
}

// One user view
const userbyid = async(req, res)=>{
const id = req.params.id;
var val = await Data.findById(id);
try{
res.status(200).send({
'status':true,
'Message': 'Data Match',
'Data':val
})
}catch(err){
res.status(400).json({
'status':false,
'error': 'Invalid Data',
error:"Check error "+err
})
}
}

//update user data
const updateUser = async(req, res)=>{
const {name,email,age} = req.body;
const password1 = req.body.password1;
if(!req.body){
	res.status(404).send({'message':"All field is require"});
}
const id=req.params.id;
// const password = await bcrypt.hash(password1, 10);
const data = {
name:name,
email: email,
// password:password,
age:age
}

await Data.findByIdAndUpdate({_id:id}, data,{ new: true}).then((val)=>{
res.status(201).send({
'status':true,
'message':'Update Successfull',
'Data':val
});
}).catch(err=>{
res.status(400).send({
'status':false,
'message':'Some Error',
'Error':'Check error '+err
})
})
}


//Delete Data 
const deleteUser = async(req, res)=>{
var id = req.params.id;
let user = await Data.findByIdAndRemove(id);
try{
res.status(200).json({
'status':true,
'Message':'Delete user successful'
})
}catch(err){
res.status(400).json({
'status':false,
'error':"Check Error : "+err
})
}
}

module.exports = {basicController, registrationController,loginController,getAllusers,userbyid,updateUser,deleteUser}