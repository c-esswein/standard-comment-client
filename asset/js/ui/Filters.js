/**
 * filters
 */

define([
  'jquery',
  'd3'
], function($, d3) {

  var filters = backbone.View.extend({

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

  return {

  };
});
