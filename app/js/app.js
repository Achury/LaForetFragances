'use strict';

/* App Module */

var LotioncatApp = angular.module('LotioncatApp', [,
  'ngRoute',
  'LotioncatAnimations',
  'LotioncatControllers',
  'LotioncatFilters',
  'LotioncatServices'
]);

LotioncatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/lotions', {
        templateUrl: 'partials/lotion-list.html',
        controller: 'lotionListCtrl'
      }).
      when('/lotions/:lotionId', {
        templateUrl: 'partials/lotion-detail.html',
        controller: 'lotionDetailCtrl'
      }).
      otherwise({
        redirectTo: '/lotions'
      });
  }]);
