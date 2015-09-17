require('./schema');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var Document = mongoose.model('Document');

//functions to query database
module.exports = {

  createUser: function (first, last) {
    return User.create({firstName: first, lastName: last}, function(err, user) {
      if(err) {
        return err;
      }
      return user;
    });
  },

  getAllUsers: function() {
    return User.find({}, function(err, users) {
      if(err) {
        return err;
      }
      return users;
    });
  },

  createRole: function(title) {
    return Role.create({title: title}, function(err, role) {
      if(err) {
        return err;
      }
      return role;
    });
  },

  getAllRoles: function() {
    return Role.find({}, function(err, roles) {
      if(err) {
        return err;
      }
      return roles;
    });
  },

  createDocument: function(title) {
    return Document.create({title: title}, function(err, doc) {
      if(err) {
        return err;
      }
      return doc;
    });
  },

  getAllDocuments: function(limit) {
    return Document.find({}).sort({date_created: -1}).limit(limit).exec(function(err, docs) {
      if(err){
        return err;
      }
      return docs;
    });
  },

  getAllDocumentsByRole: function(role, limit) {
    return Document.find({role: role}).sort({date_created: -1}).limit(limit).exec(function(err, docs) {
      if(err){
        return err;
      }
      return docs;
    });
  },

  getAllDocumentsByDate: function(date, limit) {
    return Document.find({ '$where': 'this.date_created.toJSON().slice(0, 10) == "'+ date + '"' }).limit(limit).exec(function(err, docs) {
      if(err) {
        return err;
      }
      return docs;
    });
  }



};