/**
 * Comment Api
 */


define([
    'api/api'
], function(api, testData) {

    function getCommentHistory(date) {
        return api.apiCall('/comments');
    }

    return {
        getCommentHistory: getCommentHistory
    };
});
