/**
 * Test data generator
 */

define([
], function() {

    function randInt(max) {
        return Math.floor(Math.random() * max);
    }

    function formatInt(numb) {
        return ('00' + numb).slice (-2);
    }

    function genCommentData(date) {
        date = date || '2015-03-31 ';

        var testData = {
            data: []
        }

        for(var h = 0; h < 24; h++) {
            for(var min = 0; min < 60; min++) {
                var timePoint = {
                    'date': date + formatInt(h) + ':' + formatInt(min),
                    'total_comments': 12,
                    'topic_comments': {
                        'TestCategory1': randInt(20),
                        'TestCategory2': randInt(20),
                        'TestCategory3': randInt(20),
                        'TestCategory4': randInt(20),
                        'TestCategory5': randInt(20),
                        'TestCategory6': randInt(20)
                    }
                };

                testData.data.push(timePoint);
            }
        }
    }

    return {
        genCommentData: genCommentData
    };
});