const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({path:'./config/.env'});

const db = require('./config/dbConfig');
const routes = require('./routes/userRouter');

const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, "./frontendside/dist")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use(cors());

app.use('/api', routes);

app.use('*', function(req, res){
res.sendFile(path.join(__dirname, "./frontendside/dist/index.html"));
})
//Mongodb connection
mongoose.set('strictQuery',false);
mongoose.connect(db.DB, {useNewUrlParser:true}).then(()=>{
console.log("Mongodb Connection Successful");
}).catch(err=>{
console.log("Check Error : "+err);
})

//server create on the port
const port = process.env.PORT || 4000;
app.listen(port, (err)=>{
if(err){
console.log("Check Error : "+err);
}else{
console.log(`Server is running on ${port}`);
}
})