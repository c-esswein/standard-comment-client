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

  function getUser(id) {
    return api.apiCall('/users/' + id, 'GET');
  }

  return {
    getUsers: getUsers,
    getUser: getUser
  };
});
