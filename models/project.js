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
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [{
    type: Schema.Types.ObjectId,
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

