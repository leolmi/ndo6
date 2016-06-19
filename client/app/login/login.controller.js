'use strict';

angular.module('ndo6App')
  .directive('compareTo',[function() {
    return {
      require: "ngModel",
      scope: { otherModelValue: "=compareTo" },
      link: function(scope, elm, atr, ngModel) {
        var compareIf = atr['compareIf'];

        ngModel.$validators.compareTo = function(modelValue) {
          if (compareIf && !elm.scope().$eval(compareIf)) return true;
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  }])
  .controller('LoginCtrl', ['$scope','$rootScope','$timeout','Auth','User','$location', '$window', 'ndo6','Logger',
    function ($scope, $rootScope, $timeout,Auth, User, $location, $window, ndo6, Logger) {
      $scope.user = ndo6.session.user;
      $scope.errors = {};
      $scope.loading = false;
      $scope.product = $rootScope.product;

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
        $scope.signup = !$scope.signup;
        setDefaultFocus();
      };

      function logIn() {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            ndo6.reset();
            $location.path('/main');
          })
          .catch(function (err) {
            $scope.errors.other = err.message;
            $scope.loading = false;
          });
      }

      function signUp(form) {
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
            $scope.loading = false;
          });
      }

      $scope.go = function (form) {
        $scope.recovering = false;
        $scope.submitted = true;
        if (form.$valid) {
          beforeSubmit(function () {
            if ($scope.signup)
              signUp(form);
            else
              logIn();
          });
        } else {
          $scope.loading = false;
        }
        // beforeSubmit(function () {
        //   $scope.submitted = true;
        //   if (form.$valid) {
        //     if ($scope.signup)
        //       signUp(form);
        //     else
        //       logIn();
        //   }
        //   else {
        //     $scope.loading = false;
        //   }
        // });
      };

      $scope.recover = function(form) {
        $scope.submitted = false;
        $scope.recovering = true;
        if (form.email.$error.email) {
          $scope.submitted = true;
        } else {
          Auth.recover({
            email: $scope.user.email
          })
            .then(function () {
              Logger.info('An email was sent to the address indicated.');
            })
            .catch(function (err) {
              Logger.error('Error recovering', err);
            })
        }
      };


      $scope.loginOauth = function (provider) {
        $window.location.href = '/auth/' + provider;
      };
    }]);
