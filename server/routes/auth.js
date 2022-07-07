const express = require("express");
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')

//Route 1:register user
router.post('/createuser',
  [body('Name', 'minimum length of name is 3').isLength({ min: 3 }), body('Email', 'Please enter a valid email address').isEmail(), body('Password', 'minimum password length should be 5').isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // to check whether user with this already exists or not
    let user = await User.findOne({ Email: req.body.Email })
    if (user) {
      return res.status(400).json({ error: "This Email already exists please try again with different email address" })
    }
    // securing password before saving it using hash technques
    const salt= bcrypt.genSaltSync(10);
    const secPass= bcrypt.hashSync(req.body.Password,salt);
        
    // saving user data in our database
    try {
      await User.create({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: secPass,
      })
      // jwt web tokenization
      secretkey= process.env.SECRET_KEY;
      authtoken=jwt.sign({
        // exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: User.id
      }, secretkey, { expiresIn: '1h' });

      res.json({jwtdata});
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ msg: 'Internal sever error occured' })
    }
    // .then(user => res.json(user));
  })

//Route 2: login user with correct credentials. login not required
router.post('/login',
  [body('Email', 'Please enter a valid email address').isEmail(), body('Password', 'minimum password length should be 5').isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {Email,Password}= req.body;
    
    try {
      let user= await User.findOne({Email});
      if(!user)
      return res.status(400).json({error: 'please try to login with correct credentials'})

      const passcomp=await bcrypt.compare(Password, user.Password)
      if(!passcomp)
      return res.status(400).json({error: 'please try to login with correct credentials'})

      secretkey= process.env.SECRET_KEY;
      authtoken=jwt.sign({
        // exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: User.id
      }, secretkey, { expiresIn: '1h' });
      res.json({authtoken});
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ msg: 'Internal sever error occured' })
    }
  })

// Route 3:get logged in user details. login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router;