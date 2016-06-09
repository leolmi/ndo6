'use strict';

var Invitation = require('./invitation.model');

exports.register = function(socket) {
  Invitation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('invitation:save', doc);
}
