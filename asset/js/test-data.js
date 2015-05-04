/**
 * Test data generator
 */

define([
], function() {

    function randInt(max) {
        return Math.floor(Math.random() * max);
    }

    function translateValue(obj, key, prevObj) {
        var changePerc = (Math.random() -.5),
            prev = prevObj['key'] || 0;

        obj[key] = Math.floor(prev + 2000*changePerc);
        if(obj[key] < 0) {
            obj[key] = 0;
        }
    }

    function formatInt(numb) {
        return ('00' + numb).slice (-2);
    }

    function genCommentData(date) {
        date = date || '2015-03-31 ';

        var testData = {
            data: []
        }
        var prevValue = {'topic_comments':{}};

        for(var h = 0; h < 24; h++) {
            for(var min = 0; min < 60; min++) {
                var timePoint = {
                    'date': date + formatInt(h) + ':' + formatInt(min),
                    'total_comments': 12,
                    'topic_comments': {}
                };

                for(var k = 0; k < 7; k++) {
                    translateValue(timePoint['topic_comments'], 'TestCategory' + k, prevValue['topic_comments']);
                }

                prevValue = timePoint;
                testData.data.push(timePoint);
            }
        }

        return testData;
    }

    return {
        genCommentData: genCommentData
    };
});