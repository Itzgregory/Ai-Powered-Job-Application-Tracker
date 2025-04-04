const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  appliedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const getApplicationModel = mongoose.model('Application', applicationSchema);
module.exports = getApplicationModel;
