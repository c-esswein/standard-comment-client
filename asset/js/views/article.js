/**
 * articles view
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'api/article',

    'text!/asset/templates/article-discussions.html',
    'text!/asset/templates/article.html'
], function($, _, backbone, d3, ArticlesApi, discussionTmplRaw, articleTemplate) {

    var articleView = backbone.View.extend({

        template: _.template(articleTemplate),

        events: {
        },

        render: function(wrapper, args) {
            var articleId = args[0];
            var view = this;

            ArticlesApi.getArticle(articleId).done(function(articleData) {

                var compiledTemplate = view.template(articleData);
                var newEl = $(compiledTemplate);
                wrapper.append(newEl);
                view.setElement(newEl);

                var discussionTmpl = _.template(discussionTmplRaw);
                var parent = $('.discussions');
                for (var i = 0; i < articleData['data'].length; i++) {
                    renderComment(discussionTmpl, parent, articleData['data'][i]);
                }

            });
        }
    });

    function renderComment(discussionTmpl, parent, data) {
        var el = $(discussionTmpl(data));
        console.log(parent, el);
        parent.append(el);

        var subDiscussionsWrapper = $('.sub-discussions', el);
        for (var i = 0; i < data['discussions'].length; i++) {
            renderComment(discussionTmpl, subDiscussionsWrapper, data['discussions'][i]);
        }
    }


    return articleView;
});
