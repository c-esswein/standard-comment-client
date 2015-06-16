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

            this.redrawGraph();
            Filters.onChange(this.onFilterChange.bind(this));
        },

        onFilterChange: function() {
            this.redrawGraph();
        },

        dispose: function() {
            Filters.unbindChange(this.onFilterChange.bind(this));
        },

        redrawGraph: function() {
            CommentApi.getCommentHistory().done(function(comments) {
                var categories = CommentApi.categories;
                var el = $('.comment-graph');
                el.html('');
                var wrapper = $('#view-wrapper');
                StreamGraph.render(el, wrapper.width(), comments.data, categories);
            });
        }
    });


    return commentsView;
});
