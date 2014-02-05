describe('sample spec', function () {
    // load the controller's module
    beforeEach(module('sky-tv-grid'));

    var _$injector;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($injector) {
        _$injector = $injector;
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(_$injector.get('options').endpoints.sampleEndpoint).toBe('http://sample.endpoint.com');
    });
});
