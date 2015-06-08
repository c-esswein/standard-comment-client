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

            StreamGraph.render($('.comment-graph', newEl), wrapper.width());

            /*CommentApi.getCategories().done(function(data) {
              console.log(data);
            });*/


            Filters.onChange(function() {
                redrawGraph();
            });
        }
    });

    function redrawGraph() {
        CommentApi.getCommentHistory().done(function(comments) {
            var categories = CommentApi.categories;
            StreamGraph.reDraw(comments.data, categories);
        });
    }


    return commentsView;
});
