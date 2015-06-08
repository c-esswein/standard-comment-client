/**
 * Article Api
 */


define([
  'jquery',
  'api/api',
  'ui/Filters'
], function($, api, Filters) {

  function getArticles() {

    //unit -> minutes, hours, days, months, years

    var filters = Filters.getFormData();

    var data = {
      'from': filters.from + ' 00:00:00',
      'to': filters.to + ' 00:00:00',
      //'username': 'Z\'fleiß-garnix',
      'unit': 'hours'
      //'category': 'Inland'
    };

    if (filters['average']) {
      delete data['unit'];
      data['average'] = 'days';
    }

    return api.apiCall('/articles', 'GET', data);
  }

  function getArticle(id) {
    return api.apiCall('/articles/' + id, 'GET');
  }

  return {
    getArticles: getArticles,
    getArticle: getArticle
  };
});
