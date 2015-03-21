/**
 * App router
 */


define([
    'backbone',
    'views/about',
    'views/users'
], function(backbone, AboutView, UserView) {

    var viewWrapper = $('#view-wrapper');
    var curView = undefined;

    var AppRouter = Backbone.Router.extend({
        routes: {
            'about': 'showAbout',
            'users': 'showUsers',

            '*actions': 'defaultAction'
        },

        showAbout: function(param) {
            return new AboutView();
        },
        showUsers: function(param) {
            return new UserView();
        },
        defaultAction: function(actions) {
            console.log('No route:', actions);
        },

        initialize: function() {

            this.on('route', function(route, params) {
                console.log('Route match: ', route, params);
            });

        },
        execute: function(callback, args) {
            if(curView && curView.remove) {
                curView.remove();
            }

            if (callback) {
                curView = callback.apply(this, args);

                if(curView && curView.render) {
                    curView.render(viewWrapper);
                }
            }
        }
    });

    var instance = new AppRouter();
    Backbone.history.start();

    return instance;
});
