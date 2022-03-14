const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/user');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt  = require('jsonwebtoken');

//MODELS 
const User = require('../models/user')
//login 
router.post("/login", async (request, response) => {
    const { email, password } = request.body;
    User.findOne({ email: email })
      .then(async (user) => {
        if (user) {
          if (user.isApproved && !user.isLocked) {
            const isMatch = await bcryptjs.compare(password, user.password);
            if (isMatch) {
              //create token
              const acc_data = {
                firstName: user.firstName,
                lastName: user.lastName,
                avata: user.avata,
                mobile: user.mobile,
                email: user.email,
                _id: user._id,
              };
  
              const token = await jwt.sign(
                acc_data,
                "A6cXZ9Mj5hM4As2wiIugIz5DHNO3q1VF"
              );
  
              // response
              return response.status(200).json({
                msg: token,
              });
            } else {
              return response.status(200).json({
                msg: "your password is not match",
              });
            }
          } else {
            return response.status(200).json({
              msg: "your account is not approved",
            });
          }
        } else {
          return response.status(200).json({
            msg: "email not exist",
          });
        }
      })
      .catch((err) => {
        return response.status(200).json({
          msg: "user not found",
        });
      });
  });
// create account
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
// verify the pascode
router.post("/verify", async (request, response) => {
    // get passcode and email
    const { email, passcode } = request.body;
    // is user exists
    User.findOne({ email })
      .then(async (user) => {
        // verify code
        if (user) {
          if (user.passcode == passcode) {
            // update isApproved
            user.isApproved = true;
            user.save().then((accountUpdate) => {
              return response.status(200).json({
                msg: accountUpdate,
              });
            });
          } else {
            return response.status(200).json({
              msg: "passcode not match",
            });
          }
        } else {
          // response
          return response.status(200).json({
            msg: "user not found",
          });
        }
      })
      .catch((err) => {
        return response.status(500).json({
          msg: err,
        });
      });
  });
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

