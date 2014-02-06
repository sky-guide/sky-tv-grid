describe('sky-tv-grid', function() {

    beforeEach(function() {
        browser().navigateTo('index.html');
    });

    it('should show a cool title', function () {
        expect(element('title').text()).toBe('Sky TV Grid');
    });

    it('should have a cool content', function () {
        expect(element('div').text()).toBe('Epg endpoint: http://sample.endpoint.com');
    });

});

