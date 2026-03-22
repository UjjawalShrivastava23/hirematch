const mongoose = require('mongoose')

const analysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeText: { type: String },
  jobDescription: { type: String },
  matchScore: { type: Number },
  matchedSkills: [String],
  missingSkills: [String],
}, { timestamps: true })

module.exports = mongoose.model('Analysis', analysisSchema)