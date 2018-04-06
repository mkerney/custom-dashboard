function pie(options)
{
var duration   = 800,
    transition = 200;

    var container=options.container;
    var data=options.data;
    console.log("container",container);

drawDonutChart(
  container,
   data,
  $(container).width(),
  200,
  ".35em"
);

function drawDonutChart(element, percent, width, height, text_y) {
  console.log("sss",width);
  width = typeof width !== 'undefined' ? width : 100;
  height = typeof height !== 'undefined' ? height : 100;
  text_y = typeof text_y !== 'undefined' ? text_y : "-.10em";

  var dataset = {
        lower: calcPercent(10),
        upper: calcPercent(percent)
      },
      radius = Math.min(width, height) / 3,
      pie = d3.pie().sort(null),
      format = d3.format(".0%");

  var arc = d3.arc()
        .innerRadius(radius - 20)
        .outerRadius(radius);

  var svg = d3.select(element).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var path = svg.selectAll("path")
        .data(pie(dataset.lower))
        .enter().append("path")
        .attr("class", function(d, i) { return "color" + i })
        .attr("d", arc)
        .each(function(d) { this._current = d; }); // store the initial values

  var text = svg.append("text")
        .attr("class","pietext")
        .attr("text-anchor", "middle")
        .attr("dy", text_y);

  
    var progress = 0;
    var timeout = setTimeout(function () {
      clearTimeout(timeout);
      path = path.data(pie(dataset.upper)); // update the data
      path.transition().duration(duration).attrTween("d", function (a) {
        console.log(a);
        // Store the displayed angles in _current.
        // Then, interpolate from _current to the new angles.
        // During the transition, _current is updated in-place by d3.interpolate.
        var i  = d3.interpolate(this._current, a);
        var i2 = d3.interpolate(progress, percent)
        this._current = i(0);
        return function(t) {
          text.text( format(i2(t) / 100) );
          return arc(i(t));
        };
      }); // redraw the arcs
    }, 200);
  
};

function calcPercent(percent) {
  return [percent, 100-percent];
};

}