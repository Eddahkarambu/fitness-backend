const express = require('express');
const router = express.Router();
const Users = require('../models/Users');


// gets back all the posts
router.get('/', async(req,res) => {
    try{
        const users = await Users.find()
        res.json(users);
        
    }catch(err){
        res.json({massage : err})
    }
});

// submit a post
router.post('/', async (req,res) => {
    console.log(req.body)
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        userRole:req.body.userRole,
    });
    try{
    const savedUser = await user.save()
    res.json(savedUser);
    }catch(err){
        res.json({massage : err})
    }
});

// specific post
router.get('/:postId',async(req,res) =>{
    try{
    const user = await Users.findById(req.params.postId);
    res.json(user);
}catch(err){
    res.json({message:err});
}
});

// delete a post
router.delete('/:postId',async (req,res) =>{
    try{
   const removedUser = await Users.deleteOne({_id: req.params.postId});
   res.json(removedUser);
}catch(err){
    res.json({message:err});
}
})

// update a post
router.patch('/:postId',async (req,res) =>{
    try{
        const UpdatedUser = await Users.updateOne({_id: req.params.postId},
            {$set:{name : req.body.name}});
            res.json(UpdatedUser);
    }catch(err){
        res.json({message:err});
    
    }
});

module.exports = router;