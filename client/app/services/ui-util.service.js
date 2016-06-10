
'use strict';

angular.module('ndo6App')
  .factory('uiUtil', ['$window',
    function($window) {
      var $menu = null;

      $window.onmouseup = function(e) {
        if ($menu) { // && !$menu.is(e.target) && $menu.has(e.target).length === 0)
          $menu.removeClass('open');
          $menu = undefined;
        }
      };

      function toggleClass($target, className) {
        if ($target.hasClass(className)) {
          $target.removeClass(className);
        } else {
          $target.addClass(className);
        }
      }

      function toggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        $menu = $(e.currentTarget.parentElement);
        toggleClass($menu, 'open');
      }

      return {
        toggleMenu:toggleMenu
      }
    }]);
