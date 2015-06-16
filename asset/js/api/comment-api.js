/**
 * Comment Api
 */


define([
  'jquery',
  'api/api',
  'ui/Filters'
], function($, api, Filters) {

  function getCommentHistory() {

    //unit -> minutes, hours, days, months, years

    var filters = Filters.getFormData();

    var data = {
      'from': filters.from + ' 00:00:00',
      'to': filters.to + ' 00:00:00',
      //'username': 'Z\'fleiß-garnix',
      'unit': filters['unit']
      //'category': 'Inland'
    };

    if (filters['average']) {
      delete data['unit'];
      data['average'] = 'days';
    }

    return api.apiCall('/comments', 'GET', data);
  }

  var subCategories;
  function getSubCategories() {
    var deferred;

    // cache categories
    if (subCategories) {
      deferred = $.Deferred();
      deferred.resolve(subCategories);
    } else {
      deferred = api.apiCall('/categories.json');
      deferred.done(function(data) {
        subCategories = data;
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
