/**
 * Api connector
 */


define([
    'jquery',
    'ui/Spinner'
], function($, Spinner) {

    var baseUrl = 'http://138.232.65.250:8080/api';

    if (document.location.search == '?fake') {
        baseUrl = '/api';
    }

    function apiCall(url, method, data) {
        var request = $.ajax({
            method: method || 'GET',
            url: baseUrl + url,
            dataType: 'json',
            data: data || null
        });

        request.done(function() {
            Spinner.stopSpinner();
        });

        request.fail(function(jqXHR, textStatus) {
            Spinner.stopSpinner();
            alert('Request failed: ' + textStatus);
        });

        Spinner.startSpinner();

        return request;
    }

    function formatServerDate(date) {
        if ($.type(date) === 'string') {
            date = new Date(date);
        }

        return date.toISOString().substr(0, 19).replace('T', ' ');
    }

    return {
        apiCall: apiCall,
        formatServerDate: formatServerDate
    };
});
