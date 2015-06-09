/**
 * user view
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'api/user',

    'text!/asset/templates/user.html'
], function($, _, backbone, d3, UserApi, userTemplate) {

    var usersView = backbone.View.extend({

        template: _.template(userTemplate),

        events: {
            //'click #transition-btn': changeGraph
        },

        render: function(wrapper, params) {
            var data = {};
            var compiledTemplate = this.template(data);
            var newEl = $(compiledTemplate);

            wrapper.append(newEl);
            this.setElement(newEl);

            UserApi.getUser(params[0]).done(function(userData) {
                console.log(userData);
            });
        }
    });

    return usersView;
});
