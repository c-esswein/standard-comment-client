/**
 * loading spinner
 */

define([
  'jquery'
], function($) {

  var loadingCount = 0;
  var spinner = $('#page-spinner');

  function checkSpinner() {
    if (loadingCount > 0) {
      spinner.addClass('visible');
    } else {
      spinner.removeClass('visible');
    }
  }

  return {
    startSpinner: function() {
      loadingCount++;
      checkSpinner();
    },
    stopSpinner: function() {
      loadingCount--;
      checkSpinner();
    }
  };
});
