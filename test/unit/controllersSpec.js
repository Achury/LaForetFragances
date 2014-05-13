'use strict';

/* jasmine specs for controllers go here */
describe('lotioncat controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('lotioncatApp'));
  beforeEach(module('lotioncatServices'));

  describe('lotionListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('lotions/lotions.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller('lotionListCtrl', {$scope: scope});
    }));


    it('should create "lotions" model with 2 lotions fetched from xhr', function() {
      expect(scope.lotions).toEqualData([]);
      $httpBackend.flush();

      expect(scope.lotions).toEqualData(
          [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });


  describe('lotionDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xyzlotionData = function() {
          return {
            name: 'lotion xyz',
                images: ['image/url1.png', 'image/url2.png']
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('lotions/xyz.json').respond(xyzlotionData());

      $routeParams.lotionId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('lotionDetailCtrl', {$scope: scope});
    }));


    it('should fetch lotion detail', function() {
      expect(scope.lotion).toEqualData({});
      $httpBackend.flush();

      expect(scope.lotion).toEqualData(xyzlotionData());
    });
  });
});
