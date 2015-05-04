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
    'test-data',

    'text!/asset/templates/comments.html'
], function($, _, backbone, d3, CommentApi, StreamGraph, testData, commentsTemplate) {

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


            /*CommentApi.getCommentHistory().done(function(comments){
                renderStreamGraph(newEl, comments.data, wrapper.width());
            });*/

            var comments = testData.genCommentData();
            StreamGraph.render(newEl, comments.data, wrapper.width());

        }
    });


    return commentsView;
});
