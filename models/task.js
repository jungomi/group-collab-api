var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var immutablePlugin = require('mongoose-immutable');

var Task = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    immutable: true
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
    ref: 'Project',
    immutable: true
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

Task.plugin(immutablePlugin);
module.exports = mongoose.model('Task', Task);
