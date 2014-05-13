'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Lotioncat App', function() {

  it('should redirect index.html to index.html#/lotions', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/lotions');
      });
  });


  describe('lotion list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/lotions');
    });


    it('should filter the lotion list as user types into the search box', function() {

      var lotionList = element.all(by.repeater('lotion in lotions'));
      var query = element(by.model('query'));

      expect(lotionList.count()).toBe(20);

      query.sendKeys('nexus');
      expect(lotionList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(lotionList.count()).toBe(8);
    });


    it('should be possible to control lotion order via the drop down select box', function() {

      var lotionNameColumn = element.all(by.repeater('lotion in lotions').column('{{lotion.name}}'));
      var query = element(by.model('query'));

      function getNames() {
        return lotionNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122"
      ]);

      element(by.model('orderProp')).findElement(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"
      ]);
    });


    it('should render lotion specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('nexus');
      element(by.css('.lotions li a')).click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/lotions/nexus-s');
      });
    });
  });


  describe('lotion detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/lotions/nexus-s');
    });


    it('should display nexus-s page', function() {
      expect(element(by.binding('lotion.name')).getText()).toBe('Nexus S');
    });


    it('should display the first lotion image as the main lotion image', function() {
      expect(element(by.css('img.lotion.active')).getAttribute('src')).toMatch(/img\/lotions\/nexus-s.0.jpg/);
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element(by.css('.lotion-thumbs li:nth-child(3) img')).click();
      expect(element(by.css('img.lotion.active')).getAttribute('src')).toMatch(/img\/lotions\/nexus-s.2.jpg/);

      element(by.css('.lotion-thumbs li:nth-child(1) img')).click();
      expect(element(by.css('img.lotion.active')).getAttribute('src')).toMatch(/img\/lotions\/nexus-s.0.jpg/);
    });
  });
});
