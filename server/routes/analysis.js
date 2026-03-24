const express = require('express')
const axios = require('axios')
const multer = require('multer')
const FormData = require('form-data')
const Analysis = require('../models/Analysis')
const authmid = require('../middleware/authmiddleware')

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({storage})

router.post('/run', authmid, upload.single('resume'), async (req, res) => {
  try {
    const job_description = req.body.job_description
    const file_buffer = req.file.buffer

    const formdata = new FormData()
    formdata.append('resume', file_buffer, 'resume.pdf')
    formdata.append('job_description', job_description)

    const response = await axios.post('https://hirematch-ml.onrender.com/analyze', formdata, {
      headers: formdata.getHeaders()
    })
    const result = response.data

    const newAnalysis = new Analysis({
      userId: req.user.id,
      jobDescription: job_description,
      matchScore: result.score,
      matchedSkills: result.matched_skills,
      missingSkills: result.missing_skills
    })
    await newAnalysis.save()

    res.json(result)
  } catch(err) {
    console.error('Analysis error:', err.message)
    res.status(500).json({ message: err.message })
  }
})

router.get('/history' , authmid, async(req,res)=>{
  try{
    const history = await Analysis.find({userId:req.user.id})
  
  res.json(history)}
 catch(err){
  res.status(500).json({ message: err.message })
}}
)

module.exports = router