const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register' , async (req , res) =>{
    try{
    const {name,email,password} = req.body

    const existinguser = await User.findOne({email})
    if (existinguser) return res.status(400).json({message : "user already exists"})

    const hashpassword = await bcrypt.hash(password ,10)

    const newUser =  new User({name,email,password:hashpassword}) 
    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: newUser._id, name, email } });
} catch (err) {
    res.status(500).json({ message: err.message });
  }}
)
module.exports = router

router.post('/login', async (req,res)=>{
    try{
    const {email , password} = req.body
   const existinguser = await User.findOne({email})
   if (!existinguser) return res.status(400).json({message :"email not found"})
  
   const isMatch= await bcrypt.compare(password,existinguser.password)
   if (!isMatch) return res.status(400).json({message:"wrong password"})
   
   const token = jwt.sign({ id: existinguser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
   res.json({ token, user: { id: existinguser._id,  email } });}
   catch(err) {
    res.status(500).json({ message: err.message });
  }
})

