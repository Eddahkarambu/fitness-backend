const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require("bcrypt");


// const find = details.find({name ,email,userRole},(error, data)=>{
//     if(error){
//         console.log(error)
//     }else {
//         console.log (data)
//     }
// })

// gets back all the posts
router.get('/', async(req,res) => {
    try{
        const users = await Users.find({}, '-password')
        res.json(users);
        
    }catch(err){
        console.log(err)
        res.json({message : err})
    }
});

// submit a post
router.post('/', async (req,res) => {
    const hashedPassword = await bcrypt.hash(req.body.password,13);
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        userRole:req.body.userRole,
    });
    try{
    
    const savedUser = await user.save()
    res.json(savedUser);
    }catch(err){
        console.log(err)
        res.json({message : err})
    }
});

// specific post
router.get('/:usersId',async(req,res) =>{
    try{
    const user = await Users.findById(req.params.usersId);
    res.json(user);
}catch(err){
    res.json({message:err});
}
});

// delete a post
router.delete('/:usersId',async (req,res) =>{
    try{
   const removedUser = await Users.deleteOne({_id: req.params.usersId});
   res.json(removedUser);
}catch(err){
    res.json({message:err});
}
})


// update a post
router.patch('/:usersId',async (req,res) =>{
    try{
        const UpdatedUser = await Users.updateOne({_id: req.params.usersId},
            {$set:{name : req.body.name}});
            res.json(UpdatedUser);
    }catch(err){
        res.json({message:err});
    
    }
});
module.exports = router;