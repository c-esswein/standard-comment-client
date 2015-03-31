/**
 * articles view
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'd3',

    'api/comment-api',

    'text!/asset/templates/articles.html'
], function($, _, backbone, d3, CommentApi, articleTemplate) {

    var articleView = backbone.View.extend({

        template: _.template(articleTemplate),

        events: {
        },

        render: function(wrapper) {
            var data = {};
            var compiledTemplate = this.template(data);
            var newEl = $(compiledTemplate);

            wrapper.append(newEl);
            this.setElement(newEl);


            CommentApi.getCommentHistory().done(function(comments){
                renderStreamGraph(newEl, comments.data, wrapper.width());
            });

        }
    });

    function renderStreamGraph(el, data, width) {
        var n = 6, // number of layers
            m = 24 * 60, // number of samples per layer
            stack = d3.layout.stack().offset('wiggle'),
            area;

        function transformData(totalData) {
            var transData = [];
            for(var i = 0; i < n; i++) {
                var res = [];
                data.forEach(function(item) {
                    if(!(item.date instanceof Date)) {
                        item.date = new Date(item.date);
                    }

                    res.push({
                        x: item.date,
                        y: item['topic_comments']['TestCategory' + (i + 1)]
                    });
                });
                transData.push(res);
            }
            return transData;
        }

        var layers0 = stack(transformData(data));

        var height = 500;

        var x = d3.time.scale()
            .domain([
                data[0].date,
                data[data.length - 1].date
            ])
            .range([0, width]);

        var y = d3.scale.linear()
            .domain([0, d3.max(layers0, function(layer) {
                return d3.max(layer, function(d) {
                    return d.y0 + d.y;
                });
            })])
            .range([height, 0]);


        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks(d3.time.hours, 1)
            .tickFormat(d3.time.format('%H:%M'))
            .tickSize(0)
            .tickPadding(8);

        var color = d3.scale.linear()
            .range(['#b0e4e2', '#dce09f']);

        area = d3.svg.area()
            .x(function(d) {
                return x(d.x);
            })
            .y0(function(d) {
                return y(d.y0);
            })
            .y1(function(d) {
                return y(d.y0 + d.y);
            });

        var svg = d3.select(el.toArray()[0]).append('svg')
            .attr('width', width)
            .attr('height', height);

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + 450 + ')')
            .call(xAxis);

        var colors = ['#ef2212', '#ffffff', '#000000', '#88ddee', '#123eee'];
        svg.selectAll('path')
            .data(layers0)
            .enter().append('path')
            .attr('d', area)
            .style('fill', function(d, i) {
                return colors[i+1];
                //return color(Math.random());
            });
    }



    return articleView;
});