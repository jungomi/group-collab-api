var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var immutablePlugin = require('mongoose-immutable');

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
    ref: 'User',
    immutable: true
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

Project.plugin(immutablePlugin);
module.exports = mongoose.model('Project', Project);
