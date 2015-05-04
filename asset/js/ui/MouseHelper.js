/**
 * vertical mouse helper
 */

define([
  'jquery',
  'd3'
], function($, d3) {

  function MouseHelper(wrapper, helper) {
    wrapper
      .on('mousemove', function() {
        mousex = d3.mouse(this);
        mousex = mousex[0] + 5;
        helper.style('left', mousex + 'px')}
      )
      .on('mouseover', function() {
        mousex = d3.mouse(this);
        mousex = mousex[0] + 5;
        helper.style('left', mousex + 'px')}
      );

  }

  return {
    attach: MouseHelper
  };
});
