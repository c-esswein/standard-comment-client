/**
 * user view
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'api/user',

    'text!/asset/templates/users.html'
], function($, _, backbone, d3, UserApi, userTemplate) {

    var usersView = backbone.View.extend({

        template: _.template(userTemplate),

        events: {
            //'click #transition-btn': changeGraph
        },

        render: function(wrapper) {
            var data = {};
            var compiledTemplate = this.template(data);
            var newEl = $(compiledTemplate);

            wrapper.append(newEl);
            this.setElement(newEl);

            UserApi.getUsers().done(function(usersData) {

            });
        }
    });

    return usersView;
});
