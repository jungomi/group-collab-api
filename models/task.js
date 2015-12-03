var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Task = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  deadline: Date,
  assignedUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  color: String,
  priority: String,
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  isDone: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Task', Task);

