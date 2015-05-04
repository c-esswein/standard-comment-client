/**
 * Comment Api
 */


define([
  'jquery',
  'api/api'
], function($, api, testData) {

  function getCommentHistory(date) {
    return api.apiCall('/comments');
  }

  var categories;
  function getCategories() {
    var deferred;

    // cache categories
    if (categories) {
      deferred = $.Deferred();
      deferred.resolve(categories);
    } else {
      deferred = api.apiCall('/categories.json');
      deferred.done(function(data) {
        categories = data;
      });
    }

    return deferred;
  }

  return {
    getCommentHistory: getCommentHistory,
    getCategories: getCategories
  };
});
