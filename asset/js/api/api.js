/**
 * Api connector
 */


define([
    'jquery'
], function($) {

    var baseUrl = 'http://138.232.65.250:8080/api';

    function apiCall(url, method, data) {
        var request = $.ajax({
            method: method || 'GET',
            url: baseUrl + url,
            dataType: 'json',
            data: data || null
        });

        request.fail(function(jqXHR, textStatus) {
            alert('Request failed: ' + textStatus);
        });

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
