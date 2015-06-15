/**
 * User Api
 */


define([
  'jquery',
  'api/api',
  'ui/Filters'
], function($, api, Filters) {

  function getUsers() {

    //unit -> minutes, hours, days, months, years

    var filters = Filters.getFormData();

    var data = {
      'from': filters.from + ' 00:00:00',
      'to': filters.to + ' 00:00:00',
      //'username': 'Z\'fleiß-garnix',
      'unit': 'hours'
      //'category': 'Inland'
    };

    return api.apiCall('/users', 'GET', data);
  }

  function getTopUsers(type, sort) {
    sort = sort || 'desc'; //asc

    return api.apiCall('/users?type=' + type + '&sort=' + sort, 'GET');
  }

  function getUser(id) {
    return api.apiCall('/users/' + id, 'GET');
  }

  return {
    getUsers: getUsers,
    getTopUsers: getTopUsers,
    getUser: getUser
  };
});
