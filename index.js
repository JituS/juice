var visualizeit = function(juice){
	var colors = ['#F42F98', "#50f4FF", "#9B2DFF", "#FFFDDE", "#FF562E", "#1F05FF", "#26FF4F", "#128128", "#812574", "#561134", "#243754", "#266219", "#446554", "#251399", "#227186", "#542625", "#530176", "#87941", "#695397", "#396707", "#371830", "#725629", "#479539", "#972173", "#161016", "#369194", "#203283", "#571481", "#927284", "#670136", "#807413", "#170631", "#750094", "#697640"].slice(0,30).reverse()
	var color = d3.scale.ordinal().range(colors);
	var max = 0;
	var keys = Object.keys(juice).reverse();
	for(var i in juice){
		if(max < juice[i].length) max = juice[i].length;
	};
	max +=2000;
	var margin = {top: 20, right: 0, bottom: 30, left: 70},
	    width = 850 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;
	var x = d3.scale.ordinal()
	    .rangeRoundBands([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);
	var xScale = d3.scale.linear().range([100,400]).domain([0,max]); 
    var xAxis = d3.svg.axis()
    	.scale(x);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("#bar").append("svg")
        .attr("width", 900)
        .attr("height",800)
      	.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	y.domain([0, max]);
	svg.append("g")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
    svg.append("g")
        .call(yAxis)
	var chart = svg.selectAll('rect').data(keys).enter();
	chart.append('rect')
				.attr('y', 0)
				.attr('x', function(d,i){
					return i * 25-25;
				})
				.attr("transform", function(d, i){return "rotate(180 "+i * 25+" 225)"})
				.attr("fill", function(d) { return color(juice[d].length)})
				.attr('width', 20)
				.attr('height', function(d){return y(max - juice[d].length)})
				.on("mouseover", function(d) {
					$('#color').css('background-color', color(juice[d].length))
					$('p').html(d +' : '+ juice[d].length)
				})
	var chart = svg.selectAll('#bar').data(keys.reverse()).enter();
	chart.append('text')
		  .attr("y", 0)
		  .attr("transform", function(d, i){return "rotate(90 "+((i * 25-240))+" 250)"})
		  .attr("x", function(d,i){return  i * 25 -25})
          .text(function(d,i){return keys[keys.length-i-1]})
};
var visualizeitPie = function(data){
	var width = 600;
	var height = 550;
	var radius = 250;
	var colors = ['#F42F98', "#50f4FF", "#9B2DFF", "#FFFDDE", "#FF562E", "#1F05FF", "#26FF4F", "#128128", "#812574", "#561134", "#243754", "#266219", "#446554", "#251399", "#227186", "#542625", "#530176", "#87941", "#695397", "#396707", "#371830", "#725629", "#479539", "#972173", "#161016", "#369194", "#203283", "#571481", "#927284", "#670136", "#807413", "#170631", "#750094", "#697640"]
	var color = d3.scale.ordinal().range(colors);
	var arc = d3.svg.arc()
		.outerRadius(250)
		.innerRadius(5);
	var pie = d3.layout.pie()
		.value(function(d){
			return data[d].length})
	var svg = d3.select('#pie').append('svg')
		.attr('width', width)
		.attr('height', height)
			.append('g')
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	var g = svg.selectAll('#pie')
		.data(pie(Object.keys(data)))
		.enter().append('g');
	g.append('path')
		.attr('d', arc)
		.style("fill", function(d) { return color(d.value)})
		.on("mouseover", function(d) {
			$('p').html(d.data +' : '+ d.value )
			$('#color').css('background-color', color(d.value))
		})
};



var data1 = function(){
	var juice = {};
	d3.json("/juice_orders.json", function(error, data) {
		if (error) return console.warn(error);
		for(var i = 0; i < data.length; i++){
			if(juice[data[i].drinkName]){
				juice[data[i].drinkName].push(data[i]);
			}else{
				juice[data[i].drinkName] = [];
			}
		};
		delete juice['CTL'];
		delete juice['ctl'];
		delete juice['Fruits'];
		delete juice['Register User'];
		visualizeit(juice);
		visualizeitPie(juice);
	});
};


$(document).ready(function(){
	data1();
});