angular.module('sky-tv-grid', ['ngResource'])
    .value('skyTvGridOptions', {
        endpoints: {
            sampleEndpoint: 'http://sample.endpoint.com'
        }
    });