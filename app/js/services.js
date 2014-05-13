'use strict';

/* Services */

var LotioncatServices = angular.module('LotioncatServices', ['ngResource']);

LotioncatServices.factory('lotion', ['$resource',
  function($resource){
    return $resource('lotions/:lotionId.json', {}, {
      query: {method:'GET', params:{lotionId:'lotions'}, isArray:true}
    });
  }]);
