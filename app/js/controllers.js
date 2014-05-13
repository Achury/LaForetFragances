'use strict';

/* Controllers */
var LotioncatControllers = angular.module('LotioncatControllers', ['ui.bootstrap']);

function CarouselCtrl($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function(i) {
    var newWidth = 600 + slides.length;
    slides.push({
      image: '../app/img/slides/' + i + '.jpg',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=1; i<11; i++) {
    $scope.addSlide(i);
  }
}

LotioncatControllers.controller('lotionListCtrl', ['$scope', 'lotion',
  function($scope, lotion) {
    $scope.lotions = lotion.query();
    $scope.orderProp = 'brand';
  }]);

LotioncatControllers.controller('lotionDetailCtrl', ['$scope', '$routeParams', 'lotion',
  function($scope, $routeParams, lotion) {
    $scope.lotion = lotion.get({lotionId: $routeParams.lotionId}, function(lotion) {
      $scope.mainImageUrl = lotion.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);


