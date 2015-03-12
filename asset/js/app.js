

require.config({
    paths: {
        d3: "http://d3js.org/d3.v3.min"
    }
});

require(['d3', 'utils'], function(d3, utils) {
    console.log(d3);

    console.log('app initialized');
});
