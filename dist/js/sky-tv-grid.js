/*!
sky-tv-grid - 0.0.1
TV Grid for Sky
Build date: 2014-02-05 
*/
angular.module('sky-tv-grid', ['ngResource'])
    .value('skyTvGridOptions', {
        endpoints: {
            sampleEndpoint: 'http://sample.endpoint.com'
        }
    });
angular.module('sky-tv-grid').directive('sampleDirective', ['skyTvGridOptions', function(skyTvGridOptions) {
    return {
        restrict: 'E',
        template: '<div>Epg endpoint: ' + skyTvGridOptions.endpoints.sampleEndpoint + '</div>'
    };
}]);