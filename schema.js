var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema for database
var userSchema = new Schema({
  firstName : {
    type: String,
    unique: true,
    required: true
  },
  lastName : {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'admin'
  }
});

var roleSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  }
});

var documentSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    enum: ['history', 'marketing'],
    default: 'history'
  },
  date_created: Date,

  last_modified: Date

});

documentSchema.pre('save', function(next) {
  var user = this;
  var currentDate = new Date();

  user.last_modified = currentDate;
  if(!user.date_created) {
    user.date_created = currentDate;
    next();
  }
});

mongoose.model('User', userSchema);
mongoose.model('Role', roleSchema);
mongoose.model('Document', documentSchema);


