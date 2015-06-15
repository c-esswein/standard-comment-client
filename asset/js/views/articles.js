/**
 * articles view
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'd3',
    'api/article',
    'utils',

    'text!/asset/templates/articles.html',
    'text!/asset/templates/articles-article.html',
    'ui/Filters'
], function($, _, backbone, d3, ArticlesApi, utils, articleTemplate, aricleTmpl, Filters) {

    var articleView = backbone.View.extend({

        template: _.template(articleTemplate),

        events: {
        },

        render: function(wrapper) {
            var data = {};
            var compiledTemplate = this.template(data);
            var newEl = $(compiledTemplate);

            wrapper.append(newEl);
            this.setElement(newEl);

            redrawGraph();
            Filters.onChange(this.onFilterChange.bind(this));
        },

        onFilterChange: function() {
            redrawGraph();
        },

        dispose: function() {
            Filters.unbindChange(this.onFilterChange);
        }
    });

    var articleTmpl;
    function redrawGraph() {
        $('.article-list').html('');
        articleTmpl = _.template(aricleTmpl);

        ArticlesApi.getArticles().done(function(articles) {
            for (var i = 0; i < articles.data.length; i++) {
                drawArticle(articles.data[i]);
            }
        });
    }

    function drawArticle(articleData) {
        articleData['article_url'] = '#articles/' + articleData['article_id'];
        articleData['text_short'] = utils.strip(articleData['text']).substr(0, 300) + '...';

        var html = articleTmpl(articleData);
        $('.article-list').append(html)
    }


    return articleView;
});
