/**
 * articles view
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'd3',

    'text!/asset/templates/articles.html'
], function($, _, backbone, d3, articleTemplate) {

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

        }
    });


    return articleView;
});
