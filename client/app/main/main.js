'use strict';

angular.module('ndo6App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        authenticate: true,
        controller: 'MainCtrl'
      });
  });
