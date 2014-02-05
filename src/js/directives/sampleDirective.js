angular.module('sky-tv-grid').directive('sampleDirective', ['skyTvGridOptions', function(skyTvGridOptions) {
    return {
        restrict: 'E',
        template: '<div>Epg endpoint: ' + skyTvGridOptions.endpoints.sampleEndpoint + '</div>'
    };
}]);