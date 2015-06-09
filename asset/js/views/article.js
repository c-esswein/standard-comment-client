/**
 * articles view
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'utils',
    'd3',
    'api/article',

    'text!/asset/templates/article-discussions.html',
    'text!/asset/templates/article.html'
], function($, _, backbone, utils, d3, ArticlesApi, discussionTmplRaw, articleTemplate) {

    var articleView = backbone.View.extend({
        hideFilters: true,

        template: _.template(articleTemplate),

        events: {
        },

        render: function(wrapper, args) {
            var articleId = args[0];
            var view = this;

            ArticlesApi.getArticle(articleId).done(function(articleData) {
                articleData['article']['text_short'] = utils.strip(articleData['article']['text']).substr(0, 300) + '...';
                var compiledTemplate = view.template(articleData['article']);
                var newEl = $(compiledTemplate);
                wrapper.append(newEl);
                view.setElement(newEl);


                var color = d3.scale.linear()
                    .range(['#D42626', '#80D426']);

                var discussionTmpl = _.template(discussionTmplRaw);
                var parent = $('.discussions');
                for (var i = 0; i < articleData['data'].length; i++) {
                    renderComment(discussionTmpl, parent, articleData['data'][i]);
                }

                function renderComment(discussionTmpl, parent, data) {
                    var senti = data['avg_quality_score'];
                    data['discussion_color'] = color(senti / 100);

                    var el = $(discussionTmpl(data));
                    parent.append(el);

                    var subDiscussionsWrapper = $('.sub-discussions', el);
                    for (var i = 0; i < data['discussions'].length; i++) {
                        renderComment(discussionTmpl, subDiscussionsWrapper, data['discussions'][i]);
                    }
                }

            });
        }
    });

    return articleView;
});
