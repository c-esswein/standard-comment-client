/**
 * Api connector
 */


define([
    'backbone'
], function(backbone) {

    var baseUrl = '/api';

    function apiCall(url, method) {
        var request = $.ajax({
            method: method || 'GET',
            url: baseUrl + url,
            dataType: 'json'
        });

        request.fail(function(jqXHR, textStatus){
            alert("Request failed: " + textStatus);
        });

        return request;
    }

    return {
        apiCall: apiCall
    };
});
