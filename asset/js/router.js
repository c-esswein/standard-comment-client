/**
 * App router
 */


define([
    'backbone',
    'views/about',
    'views/users',
    'views/articles',
    'views/article',
    'views/comments'
], function(backbone, AboutView, UserView, ArticlesView, ArticleView, CommentsView) {

    var viewWrapper = $('#view-wrapper');
    var curView = undefined;

    var AppRouter = Backbone.Router.extend({
        routes: {
            'about': 'showAbout',
            'users': 'showUsers',
            'articles': 'showArticles',
            'articles/:id': 'showArticle',
            'comments': 'showComments',

            '*actions': 'defaultAction'
        },

        showAbout: function(param) {
            return new AboutView();
        },
        showUsers: function(param) {
            return new UserView();
        },
        showArticles: function(param) {
            return new ArticlesView();
        },
        showArticle: function(param) {
            return new ArticleView();
        },
        showComments: function(param) {
            return new CommentsView();
        },
        defaultAction: function(actions) {
            return this.showComments();
        },

        initialize: function() {

            this.on('route', function(route, params) {
                console.log('Route match: ', route, params);

                // mark links
                var routeHash = document.location.hash;
                $('.active-nav-link').removeClass('active-nav-link');
                $('[href="' + routeHash + '"]').addClass('active-nav-link');
            });

        },
        execute: function(callback, args) {
            if (curView && curView.remove) {
                curView.remove();
            }

            if (callback) {
                curView = callback.apply(this, args);

                if (curView && curView.render) {
                    curView.render(viewWrapper, args);
                }
            }
        }
    });

    var instance = new AppRouter();
    Backbone.history.start();

    return instance;
});
