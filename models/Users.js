const mongoose = require('mongoose');


const UsersSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true 
    },
    userRole:{
        type:String,
        required:true 
    }
});
module.exports = mongoose.model('Users', UsersSchema);