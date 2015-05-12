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

    'text!/asset/templates/comments.html'
], function($, _, backbone, d3, CommentApi, StreamGraph, commentsTemplate) {

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

            CommentApi.getCommentHistory().done(function(comments) {
                var categories = CommentApi.categories;
                StreamGraph.render($('.comment-graph', newEl), comments.data, categories, wrapper.width());
            });

            /*CommentApi.getCategories().done(function(data) {
              console.log(data);
            });*/
        }
    });
/*
 from=date  &  to=date  &  category=bla  & sub-category=blub  &  username=user  &  with_comments=true
 */

    return commentsView;
});
