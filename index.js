var visualizeit = function(juice, data){
	var max = 0;
	var keys = Object.keys(juice).reverse();
	for(var i in juice){
		if(max < juice[i].length) max = juice[i].length;
	};
	max +=2000;
	var margin = {top: 20, right: 20, bottom: 30, left: 70},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;
	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);
	var xScale = d3.scale.linear().range([100,400]).domain([0,data.length]); 
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);
    var svg = d3.select("body").append("svg")
        .attr("width", 1400)
        .attr("height",1000)
        .attr("margin", '200px')
      	.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	y.domain([0, max]);
	svg.append("g")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
	var formatPercent = d3.format(".0%");
	var a = 0;
	var chart = svg.selectAll('#c').data(keys).enter();
	
	chart.append('rect')
				.attr('y', 0)
				.attr('x', function(d,i){
					return i * 25+5}
				)
				.attr("transform", "rotate(180 430 225)")
				.attr('fill', 'green')
				.attr('width', 20)
				.attr('height', function(d){return y(max - juice[d].length)})
				.on("mouseover", function(d) {
					$('#c').html(d +' : '+ juice[d].length)
				})
	chart.append('text')
		  .attr("y", 6)
		  .attr("transform", function(d, i){return "rotate(-90 "+((i * 25)+231)+" 226)"})
		  .attr("x", function(d,i){return  i * 25})
          .text(function(d,i){return keys[keys.length-i-1]})
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
};

var data1 = function(){
	var data, juice = {};
	d3.json("/juice_orders.json", function(error, json) {
	  if (error) return console.warn(error);
	  data = json;
	  for(var i = 0; i < data.length; i++){
	  	if(juice[data[i].drinkName]){
	  		juice[data[i].drinkName].push(data[i]);
	  	}else{
	  		juice[data[i].drinkName] = [];
	  	}
	  };
	  visualizeit(juice, data);
	});
};

$(document).ready(function(){
	var data = data1();
});