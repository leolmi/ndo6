'use strict';
var u = require('../../components/utils/utils');
var Invitation = require('./invitation.model');
var Map = require('../map/map.model');
var MESSAGE_TEMPLATE = '<p>Hi, [OWNER-NAME] invite you to the map [MAP-NAME].</p>'+
  '<p>Follow the link: <a href="[MAP-URL]">[MAP-NAME]</a></p>' +
  '<p>Otherwise go on <a href="[NDO6-URL]">Ndo6</a>, register or log in if you already registered.</p>' +
  '<p>Once you entered you will see the notification to access the shared map.</p>'

function getMessage(req, invitation, map) {
  var host = req.headers.host;
  var message = MESSAGE_TEMPLATE.replace(/\[MAP\-URL\]/g, host + '/map#' + invitation._id);
  message = message.replace(/\[NDO6\-URL\]/g, host);
  message = message.replace(/\[OWNER\-NAME\]/g, req.user.name);
  message = message.replace(/\[MAP\-NAME\]/g, map.name);
  return message;
}


exports.index = function(req, res) {
  var filter = { $or:[
    {target: req.user.email, banned: false, refused: false, accepted: false},
    {owner: req.user._id}] };
  u.index(Invitation, req, res, filter);
};


exports.create = function(req, res) {
  var invitation = req.body;
  invitation.owner = req.user._id;
  if (!invitation.target) return u.error(res, 'Undefined target!');
  var targets = u.getMails(invitation.target);
  if (!targets || targets.length <= 0)  return u.error(res, 'Invalid target!');
  if (!invitation.map) return u.error(res, 'Undefined map!');
  invitation.accepted = false;
  invitation.refused = false;
  invitation.banned = false;
  var exp = new Date();
  exp.setDate(exp.getDate() + 10);
  invitation.expiration = invitation.expiration || exp.getTime();
  Map.findById(invitation.map, function (err, map) {
    if (err) return u.error(res, err);
    if (!map) return u.error(res, 'Map not found!');
    // invia una mail ad ogni invitato...
    targets.forEach(function (t, ti) {
      if (t && t != req.user.email) {
        //TODO: verifica che l'utente non abbia già un invito valido sulla mappa
        invitation._id = u.guid();
        invitation.target = t;
        invitation.message = getMessage(req, invitation, map);
        Invitation.create(invitation, function (err, i) {

          if (err) {
            console.log('Target n°' + ti + '  Error: '+JSON.stringify(err));
          } else {
            //TODO: send mail.....
            console.log('Target n°' + ti + ' invitation:'+JSON.stringify(i));
          }
        });
      }
    });
    return u.created(res);
  });
};


exports.show = function(req, res) {
  Invitation.findById(req.params.id, function (err, invitation) {
    if (err) return u.error(res, err);
    if (!invitation) return u.notfound(res);
    if (invitation.target != req.user.email) return u.error(res, 'Not allowed!');
    if (invitation.banned) return u.error(res, 'Not allowed!');
    if (invitation.refused) return u.error(res, 'Just refused!');
    if (invitation.accepted) return u.error(res, 'Just accepted!');
    var exp = new Date();
    if (invitation.expiration < exp.getTime()) return u.error(res, 'Invitation expired!');
    Map.findById(invitation.map, function (err, map) {
      if (err) return u.error(res, err);
      if (!map) return u.error(res, 'Map not found!');
      map.setInvite(invitation);
      u.ok(res, {invitation: invitation, map: map});
    });
  });
};


exports.execute = function(req, res) {
  var invId = req.body.id || req.body._id;
  var action = req.params.action;
  if (!action) return u.error(res, 'Undefined action!');
  if (!invId) return u.error(res, 'Undefined invitation!');
  Invitation.findById(invId, function (err, invitation) {
    if (err) return u.error(res, err);
    if (!invitation) return u.notfound(res);

    switch (action) {
      case 'ban':
        if (req.user._id != invitation.owner) return u.error(res, 'Not allowed!');;
        invitation.banned = true;
        break;
      case 'refuse':
        if (req.user.email != invitation.target) return u.error(res, 'Not allowed!');;
        invitation.refused = true;
        break;
      case 'accept':
        if (req.user.email != invitation.target) return u.error(res, 'Not allowed!');;
        invitation.accepted = true;
        break;
      default:
        return u.notfound(res);
    }
    invitation.save(function (err) {
      if (err) return u.error(res, err);
      return u.ok(res);
    });
  });
};
