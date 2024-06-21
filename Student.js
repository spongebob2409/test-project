const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String },
  preferences: { type: String },
  requirements: { type: String }
});

module.exports = mongoose.model('Student', StudentSchema);