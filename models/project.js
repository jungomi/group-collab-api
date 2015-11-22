var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
  name: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  owner: {
    type: String,
    ref: 'User'
  },
  members: [{
    type: String,
    ref: 'User'
  }]
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Project', Project);

