/**
 * StreamGraph
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'd3'
], function($, _, backbone, d3) {

  function transformData(totalData, layers) {
    var transData = [];
    var layerData = {};
    _.each(layers, function(layer) {
      layerData[layer] = 0;
    });

    for (var i = 0; i < layers.length; i++) {
      var res = [];
      totalData.forEach(function(item) {
        if (!(item.date instanceof Date)) {
          // TODO dirty fix
          if (item.date.length < 5) {
            item.date = '2015-01-01 ' + item.date + ':00';
          }

          item.date = new Date(item.date);
        }

        var val = item['categories'][layers[i]] || {};
        var num = val['avg_comments'] || 0;
        res.push({
          x: item.date,
          y: num
        });

        layerData[layers[i]] += num;
      });
      transData.push(res);
    }

    return {
      transData: transData,
      layerData: layerData
    };
  }

  function renderStreamGraph(el, width, data, layers) {
    var wrapper = d3.select(el.toArray()[0]);

    var height = 500;

    var svg = wrapper.append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', '0 0 ' + width + ' ' + height);

    var m = data.length; //24 * 60, // number of samples per layer
    var stack = d3.layout.stack().offset('wiggle');

    var transformedData = transformData(data, layers);
    var layerData = stack(transformedData.transData);
    var height = 500;

    var startDate = data[0].date,
      endDate = data[data.length - 1].date;
    var x = d3.time.scale()
      .domain([startDate, endDate])
      .range([0, width]);

    var y = d3.scale.linear()
      .domain([0, d3.max(layerData, function(layer) {
        return d3.max(layer, function(d) {
          return d.y0 + d.y;
        });
      })])
      .range([height, 0]);

    var tickFormat = d3.time.format('%H:%M');
    // set tickFormat for greater ranges:
    if (endDate - startDate > 24 * 60 * 60 * 1000) {
      tickFormat = d3.time.format('%d.%m');
    }


    var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      //.ticks(d3.time.hours, 1)
      .ticks(20)
      .tickFormat(tickFormat)
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

    var svg = wrapper.select('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', '0 0 ' + width + ' ' + height);

    // render x-Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + (height - 20) + ')')
      .call(xAxis);

    var colors = ['#4ba9df', '#474f60', '#f4b723', '#80d426', '#123eee',
      '#8F98B9', '#383B45', '#F4D611', '#BED83C', '#6EF486', '#C5D0F3', '#D8853C'];

    var tooltip = wrapper
      .append('div')
      .attr('class', 'tooltip');

    svg.selectAll('.stream-layer')
      .data(layerData)
      .enter().append('path')
      .attr('class', 'stream-layer')
      .attr('d', area)
      .style('fill', function(d, i){
        return colors[i];
      })

    .attr('opacity', 1)
      .on('mouseover', function(d, i) {
        svg.selectAll('.stream-layer').transition()
          .duration(250)
          .attr('opacity', function(d, j) {
            return j != i ? 0.6 : 1;
          })
      })

    .on('mousemove', function(d, i) {
        d3.select(this)
          .classed('hover', true)
          .attr('stroke', '#fff')
          .attr('stroke-width', '0.5px');

        var mousex = d3.mouse(this);
        mousex = mousex[0];
        var invertedx = x.invert(mousex);

        var min = Infinity;
        var minVal = null;
        for (var k = 0; k < d.length; k++) {
          var diff = Math.abs(d[k].x - invertedx);
          if (diff < min) {
            min = diff;
            minVal = d[k];
          }
        }

        var info = 'At cursor: ' + minVal.y;

        var cat = layers[i];
        var total = transformedData.layerData[cat];
        tooltip.html('<p>Category: <b>' + cat + '</b><br />Total: ' + total + ' comments</p>' + info).style('visibility', 'visible');

      })
      .on('mouseout', function(d, i) {
        svg.selectAll('.stream-layer')
          .transition()
          .duration(250)
          .attr('opacity', '1');
        d3.select(this)
          .classed('hover', false)
          .attr('stroke-width', '0px');

        tooltip.style('visibility', 'hidden');
      });
  }

  return {
    render: renderStreamGraph
  };
});
