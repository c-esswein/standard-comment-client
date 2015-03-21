/**
 * About project layer.
 */

define([
    'jquery',
    'underscore',
    'backbone',

    'text!/asset/templates/about.html'
], function($, _, backbone, aboutTemplate) {

    var AboutView = backbone.View.extend({

        template: _.template(aboutTemplate),

        events: {
            'click .layer-close': 'closeLayer',
        },

        render: function(wrapper) {
            var data = {};
            var compiledTemplate = this.template(data);
            var newEl = $(compiledTemplate);

            wrapper.append(newEl);
            this.setElement(newEl);
        },


        closeLayer: function() {
            this.$el.removeClass('visible');
        }
    });

    return AboutView;
});
