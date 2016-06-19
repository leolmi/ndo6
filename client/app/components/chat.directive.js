/* Created by Leo on 19/06/2016. */
'use strict';
s
angular.module('ndo6App')
  .directive('chat',['$timeout',
    function ($timeout) {
      return {
        restrict: 'E',
        templateUrl: 'app/components/chat.html',
        scope: { options:'=' },
        link: function(scope, ele, atr) {
          scope.options = scope.options || {};
          _.defaults(scope.options, {
            maxlength: 300,
            timeout: 1000,
            enter: true,
            messages: [{
              attributes:'i',
              time: new Date(),
              user: '',
              icon: '',
              text: ''
            }]
          });
          scope.user = ndo6.session.user;
          scope.iconOptions = {
            description: false
          };
          var _sendTimeout = null;

          function reset() {
            scope.message = {
              attributes: '',
              time: new Date(),
              user: scope.user.name,
              icon: '',
              text: ''
            };
          }

          function send() {
            if (_sendTimeout || !_.isFunction(scope.options.send) || !scope.message.text) {
              return;
            }
            var msg = _.clone(scope.message);
            _sendTimeout = $timeout(function() {
              msg.time = new Date();
              msg.user = scope.user.name;
              scope.options.send(msg);
              _sendTimeout = null;
            }, scope.options.timeout);
            reset();
          }

          function scroll() {
            var $container = $('.chat-messages', ele);
            var $last = $(".chat-messages>.chat-message:last-child", ele);
            if ($last.length) {
              var top = $last.offset().top + $container.scrollTop();
              $container.animate({scrollTop: top}, 1000);
            }
          }

          scope.getDate = function(d) {
            var now = new Date();
            return (now.toLocaleDateString() == d.toLocaleDateString()) ?
              d.toLocaleTimeString() : d.toLocaleString();
          };

          scope.isImportant = function(m) {
            return m && m.attributes.indexOf('i')>-1;
          };

          var _shift = false;
          ele.bind("keydown keypress", function (e) {
            if (e.which === 16)
              _shift = true;
            if(!_shift && e.which === 13 && scope.options.enter) {
              send();
              e.preventDefault();
              e.stopPropagation();
            }
          });
          ele.bind("keyup", function (e) {
            if (e.which === 16)
              _shift = false;
          });

          scope.$watch(function(){ return scope.options.messages; }, function(){
            scroll();
          }, true);

          scope.sendMessage = function() {
            send();
          };

          reset();
        }
      }
    }]);
