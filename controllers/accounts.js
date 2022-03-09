const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/user');
const router = express.Router();
const bcryptjs = require('bcryptjs');

//MODELS 
const User = require('../models/user')

router.post('/createAccount',async(request, response) => {
    //  get user inputs
    const {firstname,lastname,email,password,mobile} = request.body;
    //  check if user exists
    User.findOne({email: email})
    .then(async account =>{
        if(account)
        {
            return response.status(200).json({
                message:'account already exists'
            });
    
        }else
         //  encrypt password 
        {
            const formatted_password = await bcryptjs.hash(password,10)
            // generate passcode 
            const passcode = generateRandomIntegerInRange(1000,9999)
            // create user in MongoDB
             const _user = new User({
                 _id: mongoose.Types.ObjectId(),
                 email: email,
                 password: formatted_password,
                 mobile :mobile,
                 firstname :firstname,
                 lastname :lastname,
                 passcode: passcode
            

             })
             _user.save()
             .then(account_created=>{
                return response.status(200).json({
                    massage: account_created
             })
            
             }); 
        
        }

        
    })
    .catch(err=>{
        return response.status(500).json({
            message:err
        });
    })
    // generate passcode 2 factor authentication
    function generateRandomIntegerInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
   


    // Response  from server

})


router.get('/sayhello',async(req,res) =>{
    try {
        const users = await User.find()
        return res.status(200).json({
            message:users
        });
    } catch (error) {
         return res.status(500).json({
        message:error
    });
    }
   
})



module.exports = router;

