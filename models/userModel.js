const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
name: {
require:true,
type: String
},
email:{
require:true,
type :String
},
password:{
require:true,
type:String
},
age:{
require:true,
type: String
},
date:{
type: Date,
default:Date.now
}
});

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;