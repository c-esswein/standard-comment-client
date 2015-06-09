/**
 * filters
 */

define([
  'jquery',
  'd3',
  'utils'
], function($, d3, utils) {

  var filters = $('.filters-form');

  (function init() {
    var d = new Date();
    $('.filter-date-from').val('2015-01-01'); //getDateString(d));

    d.setMonth(d.getMonth() + 1);
    $('.filter-date-to').val('2015-01-02'); //getDateString(d));

    filters.trigger('change');
  })();

  filters.on('change', function() {

  });

  function getDateString(dateObj) {
    return dateObj.toISOString().substr(0, 10);
  }

  return {
    getFormData: function() {
      var data = utils.getFormData(filters);
      data['average'] = data['average'] === 'on';
      console.log(data);
      return data;
    },
    onChange: function(callback) {
      filters.on('change', callback);
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
