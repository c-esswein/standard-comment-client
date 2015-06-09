/**
 * comments view
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'd3',

    'api/comment-api',
    'ui/StreamGraph',
    'ui/Filters',

    'text!/asset/templates/comments.html'
], function($, _, backbone, d3, CommentApi, StreamGraph, Filters, commentsTemplate) {

    var commentsView = backbone.View.extend({

        template: _.template(commentsTemplate),

        events: {
        },

        render: function(wrapper) {
            var data = {};
            var compiledTemplate = this.template(data);
            var newEl = $(compiledTemplate);

            wrapper.append(newEl);
            this.setElement(newEl);

            function redrawGraph() {
                CommentApi.getCommentHistory().done(function(comments) {
                    var categories = CommentApi.categories;
                    var el = $('.comment-graph', newEl);
                    el.html('');
                    StreamGraph.render(el, wrapper.width(), comments.data, categories);
                });
            }

            /*CommentApi.getCategories().done(function(data) {
              console.log(data);
            });*/

            redrawGraph();
            Filters.onChange(function() {
                redrawGraph();
            });
        }
    });




    return commentsView;
});
