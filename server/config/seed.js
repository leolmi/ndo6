/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var User = require('../api/user/user.model');
User.find({}).remove(function() {
  User.create({
    _id: '54b3e04cde6279a8211b42fe',
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    _id: '54b3e04cde6279a8211b42fd',
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});

var Map = require('../api/map/map.model');
Map.find({}).remove(function() {
  Map.create({
    _id: '54b3e04cde6279a8211b42c1',
    name: 'Mappina',
    description: 'Mappa d\'esempio per il test.',
    owner: '54b3e04cde6279a8211b42fe',
    center: '',
    active: true
  },{
    _id: '54b3e04cde6279a8211b42c2',
    name: 'Mappona',
    description: 'Altra mappa d\'esempio per il test.',
    owner: '54b3e04cde6279a8211b42fd',
    center: '',
    active: true
  }, function() {
    console.log('finished populating maps');
  });
});

var Invitation = require('../api/invitation/invitation.model');
var exp = new Date('2016-08-30');
Invitation.find({}).remove(function() {
  Invitation.create({
    _id: '54b3e04cde6279a8211b4200',
    owner: '54b3e04cde6279a8211b42fd',
    target: 'test@test.com',
    map:'54b3e04cde6279a8211b42c2',
    message:'<p>Hi, Admin invite you to the map "Mappona".</p>'+
      '<p>Follow the link: <a href="http://localhost:9000/map#54b3e04cde6279a8211b42c2">Mappona</a></p>' +
      '<p>Otherwise go on <a href="http://localhost:9000/">Ndo6</a>, register or log in if you already registered.</p>' +
      '<p>Once you entered you will see the notification to access the shared map.</p>',
    userMessage:'',
    accepted: false,
    refused: false,
    banned: false,
    expiration: exp.getTime()
  }, function() {
    console.log('finished populating invitations');
  });
});


//http://localhost:9000/map#54b3e04cde6279a8211b4200
