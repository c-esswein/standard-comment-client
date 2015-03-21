

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../../third-party/jquery-2.1.3.min',
        backbone: '../../third-party/backbone-min',
        d3: '../../third-party/d3.min',
        underscore: '../../third-party/underscore-min',
        text: '../../node_modules/requirejs-text/text'
    }
});

require([
        'router'
    ], function(Router) {


        console.log('app initialized');
});
