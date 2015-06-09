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
        res.push({
          x: item.date,
          y: val['avg_comments'] || 0
        });
      });
      transData.push(res);
    }
    return transData;
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

    var layerData = stack(transformData(data, layers));
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
    if (endDate - startDate > 24*60*60*1000) {
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


    var color = d3.scale.linear()
      .range(['#4ba9df', '#80d426', '#f4b723', '#474f60']);
    //var colors = ['#ef2212', '#ffffff', '#000000', '#88ddee', '#123eee'];



    var tooltip = d3.select('body')
    .append('div')
    .attr('class', 'remove')
    .style('position', 'absolute')
    .style('z-index', '20')
    .style('visibility', 'hidden')
    .style('top', '30px')
    .style('left', '55px');


    svg.selectAll('.stream-layer')
      .data(layerData)
      .enter().append('path')
      .attr('class', 'stream-layer')
      .attr('d', area)
      .style('fill', function(d, i) {
        //return colors[i];
        return color(Math.random());
      })

// TODO in own file
      .attr('opacity', 1)
      .on('mouseover', function(d, i) {
        svg.selectAll('.stream-layer').transition()
        .duration(250)
        .attr('opacity', function(d, j) {
          return j != i ? 0.6 : 1;
      })})

      .on('mousemove', function(d, i) {
        mousex = d3.mouse(this);
        mousex = mousex[0];
        var invertedx = x.invert(mousex);
        invertedx = invertedx.getMonth() + invertedx.getDate();

        console.log(layers[i]);

/*        console.log(invertedx);
        console.log(d);
        var selected = (d.values);
        for (var k = 0; k < selected.length; k++) {
          datearray[k] = selected[k].date
          datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
        }

        mousedate = datearray.indexOf(invertedx);
        pro = d.values[mousedate].value;*/

        d3.select(this)
        .classed('hover', true)
        .attr('stroke', '#fff')
        .attr('stroke-width', '0.5px');
        //tooltip.html( '<p>' + d.key + '<br>' + pro + '</p>' ).style('visibility', 'visible');

      })
      .on('mouseout', function(d, i) {
       svg.selectAll('.stream-layer')
        .transition()
        .duration(250)
        .attr('opacity', '1');
        d3.select(this)
        .classed('hover', false)
        .attr('stroke-width', '0px');
        //tooltip.html( '<p>' + d.key + '<br>' + pro + '</p>' ).style('visibility', 'hidden');
    });
  }

  return {
    render: renderStreamGraph
  };
});
