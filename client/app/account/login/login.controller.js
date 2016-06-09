'use strict';

angular.module('ndo6App')
  .controller('LoginCtrl', ['$scope','$timeout','Auth','$location', '$window', 'ndo6','Logger',
    function ($scope, $timeout,Auth, $location, $window, ndo6, Logger) {
      $scope.user = {};
      $scope.errors = {};
      $scope.loading = false;
      $scope.product = {
        name: 'Ndo6',
        version: '1.0.32'
      };

      function setDefaultFocus() {
        var e = $('#default-control');
        if (e) e.focus();
      }

      function beforeSubmit(cb) {
        cb = cb || angular.noop;
        $scope.loading = true;
        $scope.errors = {};
        ndo6.checkGeo()
          .then(function () {
            $scope.submitted = true;
            $timeout(cb, 100);
          }, function (err) {
            $scope.loading = false;
            Logger.error('Error', err);
          });
      }


      $scope.toggle = function () {
        $scope.signin = !$scope.signin;
        setDefaultFocus();
      };

      function logIn() {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            // Logged in, redirect to home
            $location.path('/main');
          })
          .catch(function (err) {
            $scope.errors.other = err.message;
            $scope.loading = false;
          });
      }

      function signIn(form) {
        Auth.createUser({
          email: $scope.user.email,
          name: $scope.user.name,
          password: $scope.user.password
        })
          .then(function () {
            $location.path('/main');
          })
          .catch(function (err) {
            err = err.data;
            $scope.errors = {};
            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
      }

      $scope.go = function (form) {
        beforeSubmit(function () {
          $scope.submitted = true;
          if (form.$valid) {
            if ($scope.signin)
              signIn(form);
            else
              logIn();
          }
          else {
            $scope.loading = false;
          }
        });
      };

      $scope.loginOauth = function (provider) {
        $window.location.href = '/auth/' + provider;
      };
    }]);
