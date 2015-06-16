/**
 * ColorVal
 */

define([
  'jquery',
  'd3'
], function($, d3) {

  function attach(wrapper) {
    $('.color-val, .color-val-rate', wrapper).each(function() {
      var val = parseFloat($(this).data('value'));
      var colorR = d3.scale.linear()
                    .range(['#D42626', '#80D426']);
      var color = colorR(val);

      if ($(this).hasClass('.color-val-rate')) {
        if (val < 0) {
          color = '#D42626';
        } else if (val > 0) {
          color = '#80D426';
        }
      }

      $(this).css('color', color);
    });

  }

  return {
    attach: attach
  };
});
