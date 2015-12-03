var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Comment', Comment);

