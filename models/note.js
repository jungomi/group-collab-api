var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Note = new Schema({
  text: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  color: String,
  priority: String,
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Note', Note);

