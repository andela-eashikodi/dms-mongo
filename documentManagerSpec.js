var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdms');
require('./schema');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var Document = mongoose.model('Document');
var dmsService = require('./documentManager');

//spec for functions to be created
describe('Document Manager', function() {

  describe('User', function() {

    beforeEach(function(done) {
      User.remove({}, function() {
        dmsService.createUser('john', 'james').then(function() {
          done();
        });
      });
    });

    it('should validate that a new user created is unique', function(done) {
      User.find({firstName: 'john'}).then(function(data) {
        expect(data.length).toBe(1);
        done();
      });
    });

    it('should validate that a new user created has a role defined', function(done) {
      User.find({firstName: 'john'}).then(function(data) {
        expect(data[0].role).toBeDefined();
        done();
      });
    });

    it('should validate that a new user created both first and last names', function(done) {
      User.find({}).then(function(data) {
        expect(data[0].firstName).toEqual(jasmine.any(String));
        expect(data[0].lastName).toEqual(jasmine.any(String));
        done();
      });
    });

    it('should validate that all users are returned when getAllUsers is called', function(done) {
      dmsService.createUser('andrew', 'adams').then(function() {
        dmsService.getAllUsers().then(function(data) {
          expect(data.length).toBe(2);
          done();
        });
      });
    });

  });

  describe('Role', function() {

    beforeEach(function(done) {
      Role.remove({}, function() {
        dmsService.createRole('manager').then(function() {
          done();
        });
      });
    });

    it('should validate that a new role created has a unique title', function(done) {
      Role.find({title: 'manager'}).then(function(data) {
        expect(data.length).toBe(1);
        done();
      });
    });

    it('should validate that all roles are returned when getAllRoles is called', function(done) {
      dmsService.createRole('director').then(function() {
        dmsService.getAllRoles().then(function(data) {
          expect(data.length).toBe(2);
          done();
        });
      });
    });

  });

  describe('Document', function() {

    beforeEach(function(done) {
      Document.remove({}, function() {
        dmsService.createDocument('chapter-1').then(function() {
          done();
        });
      });
    });

    it('should validate that a new user document created has a published date defined', function(done) {
      Document.find({title: 'chapter-1'}).then(function(data) {
        expect(data[0].date_created).toBeDefined();
        done();
      });
    });

    it('should validate that getAllDocuments returns all documents limited by a specified number and in order of their published dates, starting from the most recent', function(done) {

      dmsService.createDocument('chapter-2').then(function() {
        dmsService.createDocument('chapter-3').then(function() {
          dmsService.getAllDocuments(2).then(function(data) {
            expect(data.length).toBe(2);
            expect(data[0].date_created).toBeGreaterThan(data[1].date_created);
            done();
          });
        });
      });
      
    });

  });

  describe('Search', function() {

    beforeEach(function(done) {
      Document.remove({}, function() {
        dmsService.createDocument('page-1').then(function() {
          dmsService.createDocument('page-2').then(function() {
            dmsService.createDocument('page-3').then(function() {
              done();
            });
          });
        });
      });
    });

    it('should validate that getAllDocumentsByRole returns all documents, limited by a specified number and ordered by published date, that can be accessed by a specified role', function(done) {
      
      dmsService.getAllDocumentsByRole('history', 2).then(function(data) {
        expect(data.length).toBe(2);
        expect(data[0].date_created).toBeGreaterThan(data[1].date_created);
        expect(data[0].role).toBe('history');
        expect(data[1].role).toBe('history');
        done();
      });

    });

    it('should validate that getAllDocumentsByDate returns all documents, limited by a specified number, that were published on a certain date', function(done) {

      var today = new Date().toJSON().slice(0, 10);

      dmsService.getAllDocumentsByDate(today, 2).then(function(data) {
        expect(data.length).toBe(2);
        expect(data[0].date_created).toMatch(jasmine.objectContaining(today));
        expect(data[1].date_created).toMatch(jasmine.objectContaining(today));
        done();
      });

    });

  });





});