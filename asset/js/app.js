

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
        'underscore',
        'router',
        'ui/Filters'
    ], function(_, router, Filters) {

        var app = {
            navigate: router.navigate
        };
        window.app = app;

        _.template.formatdate = function(date) {
            var d = new Date(date)
                fragments = [
                    d.getDate(),
                    d.getMonth() + 1,
                    d.getFullYear()
                ];
            return fragments.join('.');
        };

        console.log('app initialized');
});
