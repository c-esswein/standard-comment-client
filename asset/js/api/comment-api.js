/**
 * Comment Api
 */


define([
  'jquery',
  'api/api'
], function($, api, testData) {

  function getCommentHistory(date) {

    //unit -> minutes, hours, days, months, years

    var data = {
      'from': '2015-01-01 00:00:00', //api.formatServerDate()
      'to': '2015-01-02 00:00:00', //api.formatServerDate()
      //'username': 'Z\'fleiß-garnix',
      'unit': 'hours'
      //'category': 'Inland'
    };

    return api.apiCall('/comments', 'GET', data);
  }

  var subCategories;
  function getSubCategories() {
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

  var categories = [
  'Etat',
  'Gesundheit',
  'Inland',
  'International',
  'Kultur',
  'Lifestyle',
  'Panorama',
  'Reisen',
  'Sport',
  'Web',
  'Wirtschaft',
  'Wissenschaft'
  ];

  return {
    getCommentHistory: getCommentHistory,
    categories: categories,
    getSubCategories: getSubCategories
  };
});
