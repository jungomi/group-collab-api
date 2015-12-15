var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var immutablePlugin = require('mongoose-immutable');

var Comment = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    immutable: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    immutable: true
  }
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

Comment.plugin(immutablePlugin);
module.exports = mongoose.model('Comment', Comment);
