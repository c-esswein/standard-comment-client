/**
 * user view
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'api/user',
    'api/comment-api',
    'ui/StreamGraph',

    'text!/asset/templates/user.html'
], function($, _, backbone, d3, UserApi, CommentApi, StreamGraph, userTemplate) {

    var usersView = backbone.View.extend({
        hideFilters: true,

        template: _.template(userTemplate),

        events: {
            //'click #transition-btn': changeGraph
        },

        render: function(wrapper, params) {
            var view = this;
            var userName = params[0];

            UserApi.getUser(userName).done(function(userData) {
                var tmplData = userData['statistics'];
                tmplData['user_name'] = userName;
                var compiledTemplate = view.template(tmplData);
                var newEl = $(compiledTemplate);

                wrapper.append(newEl);
                view.setElement(newEl);

                var categories = CommentApi.categories;
                var el = $('.comment-graph', newEl);
                StreamGraph.render(el, wrapper.width(), userData['data'], categories);
            });
        }
    });

    return usersView;
});
