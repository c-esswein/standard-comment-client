/**
 * filters
 */

define([
  'jquery',
  'd3',
  'utils'
], function($, d3, utils) {

  var filters = $('.filters-form');

  filters.on('submit', function(e) {
    e.preventDefault();
  });

  (function init() {
    var d = new Date();
    $('.filter-date-from').val('2015-01-01'); //getDateString(d));

    d.setMonth(d.getMonth() + 1);
    $('.filter-date-to').val('2015-01-02'); //getDateString(d));

    filters.trigger('submit');
  })();

  function getDateString(dateObj) {
    return dateObj.toISOString().substr(0, 10);
  }

  return {
    getFormData: function() {
      var data = utils.getFormData(filters);
      data['average'] = data['average'] === 'on';
      return data;
    },
    onChange: function(callback) {
      filters.on('submit', callback);
    },
    unbindChange: function(callback) {
      filters.unbind('submit');
      filters.on('submit', function(e) {
        e.preventDefault();
      });
    },
    setVisibility: function(isVisible) {
      if (isVisible) {
        $('.filters').removeClass('hide');
      } else {
        $('.filters').addClass('hide');
      }
    }
  };
});
