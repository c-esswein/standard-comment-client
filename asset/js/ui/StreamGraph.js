/**
 * StreamGraph
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'd3'
], function($, _, backbone, d3, CommentApi, testData, articleTemplate) {

  function transformData(totalData, layers) {
    var transData = [];
    for (var i = 0; i < layers; i++) {
      var res = [];
      totalData.forEach(function(item) {
        if (!(item.date instanceof Date)) {
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

  function renderStreamGraph(el, data, width) {
    var n = 6, // number of layers
      m = 24 * 60, // number of samples per layer
      stack = d3.layout.stack().offset('wiggle');

    var layerData = stack(transformData(data, n));
    var height = 500;

    var x = d3.time.scale()
      .domain([
        data[0].date,
        data[data.length - 1].date
      ])
      .range([0, width]);

    var y = d3.scale.linear()
      .domain([0, d3.max(layerData, function(layer) {
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

    var area = d3.svg.area()
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
      .attr('height', height)
      .attr('viewBox', '0 0 ' + width + ' ' + height);

    // render x-Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + (height - 20) + ')')
      .call(xAxis);


    var color = d3.scale.linear()
      .range(['#b0e4e2', '#dce09f']);
    //var colors = ['#ef2212', '#ffffff', '#000000', '#88ddee', '#123eee'];

    svg.selectAll('path')
      .data(layerData)
      .enter().append('path')
      .attr('d', area)
      .classed('comments-graph', true)
      .style('fill', function(d, i) {
        //return colors[i];
        return color(Math.random());
      });
  }

  return {
    render: renderStreamGraph
  };
});
