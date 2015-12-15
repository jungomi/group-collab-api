var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var immutablePlugin = require('mongoose-immutable');

var Note = new Schema({
  text: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    immutable: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  color: String,
  priority: String,
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    immutable: true
  }
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

Note.plugin(immutablePlugin);
module.exports = mongoose.model('Note', Note);
