const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require("bcrypt");




// gets back all the users
router.get('/', async(req,res) => {
    try{
        const users = await Users.find({}, '-password')
        res.status(200).send(users);
        
        
    }catch(err){
        res.status(500).json({message : err})
    }
});

// login user
router.post('/login',async(req,res) =>{

    try{
        const hashedPassword = await bcrypt.hash(req.body.password,13);
        Users.findOne({ email: req.body.email }, (error, result) =>{
            if (result) { 
                if(result.password == hashedPassword){
                    res.status(200).json({message:"logged in successfully"})
                }else{
                    res.status(401).json({ message: "incorrect email or password" });
                }
            } else {
                res.status(404).json({ message: "Account does not exist" });
            }
        });
        
        }catch(err){
            res.status(500).json({message: err})
            
        }
})



// submit a user
router.post('/', async (req,res) => {
    const hashedPassword = await bcrypt.hash(req.body.password,13);
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        userRole:req.body.userRole,
    });
    try{
    await user.save();
    res.status(200).json({message: "You have registerd successfully" })
    }catch(err){
        res.status(500).json({message : err})
        
    }
});

// specific user
router.get('/:usersId',async(req,res) =>{
    try{
    const user = await Users.findById(req.params.usersId, '-password');
    res.status(200).json(user);
    
}catch(err){
    res.status(500).json({message:err});

}
});

// delete a user
router.delete('/:usersId',async (req,res) =>{
    try{
   const removedUser = await Users.deleteOne({_id: req.params.usersId});
   res.status(200).json({message:"User deleted successfully"});
}catch(err){
    res.status(500).json({message:err});
}
})


// update a user
router.patch('/:usersId',async (req,res) =>{
    try{
        const UpdatedUser = await Users.updateOne({_id: req.params.usersId},
            {$set:{name : req.body.name}});
            res.status(200).json(UpdatedUser);
    }catch(err){
        res.status(500).json({message:err}); 
    }
});
module.exports = router;