
var visualizeitPie = function(data){
	var width = 600;
	var height = 550;
	var radius = 250;
	var color = d3.scale.category20b()
	var tip = d3.tip()
	  	.attr('class', 'd3-tip')
	 	 .offset([-10, 0])
	  	.html(function(d) {
	   	 return "<strong>Quantity:</strong> <span style='color:pink'>" + d.data.key +' : '+ d.value  + "</span>";
	});
	var arc = d3.svg.arc()
		.outerRadius(250)
		.innerRadius(5);

	var arcOver = d3.svg.arc()
		.outerRadius(270)
		.innerRadius(5);

	var pie = d3.layout.pie()
		.value(function(d){
			return d.values})
	var svg = d3.select('#pie').append('svg')
		.attr('width', width)
		.attr('height', height)
			.append('g')
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	svg.call(tip);

	var g = svg.selectAll('#pie')
		.data(pie(data))
		.enter().append('g');
	g.append('path')
		.attr('d', arc)
		.style("fill", function(d) {return color(d.value)})
		.style('stroke', 'black')
		.style('stroke-width', '1px')
		.on("mouseover", function(d){
			d3.select(this).transition()
		        .duration(100)
		        .attr("d", arcOver);
				tip.show(d)
		})
		.on("mouseout", function(d){
			d3.select(this).transition()
		        .duration(100)
		        .attr("d", arc);
				tip.show(d)
			tip.hide(d)	
		})
};

var visualizeit = function(data){
	var color = d3.scale.category20b();
	var tip = d3.tip()
	  	.attr('class', 'd3-tip')
	 	 .offset([-10, 0])
	  	.html(function(d) {
	   	 return "<strong>Quantity:</strong> <span style='color:pink'>" + d.key +' : '+ d.values  + "</span>";
	});
	var yScale = d3.scale.linear()
		.range([500, 0])
		.domain([0, 7000])
	var xScale = d3.scale.ordinal()
		.rangeRoundBands([0, 800])
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom');
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient('left');
	var svg = d3.select('#bar').append('svg')	
		.attr('width',1000)
		.attr('height',700)

	svg.selectAll('g').data(data).enter()
		.append('rect')
			.attr('x', function(d, i){return i * 25+70})
			.attr('y', function(d, i){return yScale(d.values) + 10})
			.attr('fill', function(d, i){return color(d.values)})
			.attr('width', 18)
			.attr('height', function(d, i){return 500 - yScale(d.values)})
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)

	svg.selectAll('g').data(data).enter()
		.append('text')
			.text(function(d){return d.key;})
			.attr('x', function(d, i){return i * 25-15})
			.attr('y', function(d, i){return 455})
			.attr('transform', function(d, i){return 'rotate(90 '+i * 25+' 528)'})
	svg.append('g')
		.call(yAxis)
		.attr('transform', 'translate(60 10)')
		.style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
	svg.append('g')
		.call(xAxis)
		.attr('transform', 'translate(60 510)')
		.style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
	svg.call(tip);
};

var data1 = function(data){
	var juice = {};
	var juice = d3.nest()
		.key(function(d) {return d.drinkName; })
		.rollup(function(v) {
			return d3.sum(v, function(d){
				return d.quantity;
			})})
		.entries(data);
	for(var i = 0; i < juice.length; i++){
		if(juice[i].key == 'CTL' || juice[i].key == 'ctl' ||juice[i].key == 'Fruits' || juice[i].key == 'Register User' ){
			juice.splice(i,1);
		}
	};
	visualizeit(juice);
	visualizeitPie(juice);
};

var visualizeCircle = function(data){

	var color = d3.scale.category20b();
	var arc = d3.svg.arc()
			.outerRadius(250)
			.innerRadius(5);

	var arcOver = d3.svg.arc()
		.outerRadius(270)
		.innerRadius(5);

		var pie = d3.layout.pie()
			.value(function(d){
				return (d.withoutSuger.values / d.total.values) *100})
		var svg = d3.select('#circle').append('svg')
			.attr('width', 700)
			.attr('height', 700)
				.append('g')
				.attr("transform", "translate(" + 300 + "," + 300 + ")");
		var tip = d3.tip()
		  	.attr('class', 'd3-tip')
		 	 .offset([-10, 0])
		  	.html(function(d) {
		   	 return "<strong>Quantity:</strong> <span style='color:pink'>" +((d.data.withoutSuger.values / d.data.total.values) *100).toFixed(2) +'% '+ d.data.total.key + "</span>";
		});
		svg.call(tip)
		var g = svg.selectAll('#circle')
			.data(pie(data))
			.enter().append('g');
		g.append('path')
			.attr('d', arc)
			.attr('fill', function(d, i){return color(d.value)})
			.style('stroke-width', '1px')
			.style('stroke', 'black')
			.on("mouseover", function(d){
				d3.select(this).transition()
					.duration(100)
					.attr('d', arcOver)
					tip.show(d)
				}) 
			.on("mouseout", function(d){
				d3.select(this).transition()
					.duration(100)
					.attr('d', arc)
					tip.hide(d)
				}) 
};

 var data2 = function(data){
	var juice = {};
		juice["withoutSuger"] = d3.nest()
			.key(function(d) {return d.drinkName})
			.rollup(function(v) {
				return d3.sum(v, function(d){
					if(d.isSugarless) return d.quantity;
				})
			})
			.entries(data)
		juice["total"] = d3.nest()
			.key(function(d) {return d.drinkName})
			.rollup(function(v) {
				return d3.sum(v, function(d){
					return d.quantity;
				})
			})
			.entries(data)
 		var totalAndWithoutSugar = [];
 		for(var j = 0; j < juice['total'].length; j++){
 			var obj = {};
	 		for(var i in juice){
				obj[i] = juice[i][j];	 			
	 		};
	 		totalAndWithoutSugar.push(obj);
 		}
 		visualizeCircle(totalAndWithoutSugar)
}

var visualizeWeekPie = function(data){
	var width = 600;
	var height = 550;
	var radius = 250;
	var color = d3.scale.category10();
	var tip = d3.tip()
	  	.attr('class', 'd3-tip')
	 	 .offset([-10, 0])
	  	.html(function(d) {
	   	 return "<strong>Quantity:</strong> <span style='color:black'>" + d.data.key +' : '+ d.value  + " Juices</span>";
	});
	var arc = d3.svg.arc()
		.outerRadius(250)
		.innerRadius(5);
	var pie = d3.layout.pie()
		.value(function(d){
			return d.values})
	var svg = d3.select('#weekPie').append('svg')
		.attr('width', width)
		.attr('height', height)
			.append('g')
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	svg.call(tip);

	var g = svg.selectAll('#weekPie')
		.data(pie(data))
		.enter().append('g');
	g.append('path')
		.attr('d', arc)
		.style("fill", function(d) { ;return color(d.value)})
		.style('stroke', 'black')
		.style('stroke-width', '1px')
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
};

//------------------------------------------------------------------------------------------------

var data3 = function(data){
	var newdata = d3.nest()
	.key(function(d) {return new Date(d.date).toString().slice(0,3)})	
	.rollup(function(v){
		return d3.sum(v, function(d){
			return d.quantity;
		})
	})
	.entries(data);
	visualizeWeekPie(newdata);
};


var visualizeExoplanets = function(data){
	var color = d3.scale.category20b();
	var tip = d3.tip()
	 	 .offset([-10, 0])
	  	.html(function(d) {
	   	 return "<strong>Emp ID: <span style='color:red'>" + d.key +' : '+ d.value  + " Juices</span></strong>";
	});
	var desc = function(x, y){
		return x.value - y.value;
	}
	var pack = d3.layout.pack()
	    .sort(desc)
	    .size([1000, 1000])
	    .value(function(d) { return d.values})
	    .padding(1);
	var svg = d3.select("#EmpExoplanet").append("svg")
	    .attr("width", 1000)
	    .attr("height", 1000);
	svg.call(tip);
	svg.selectAll("circle")
	      .data(pack.nodes({children: data}))
	    .enter().append("circle")
			.attr("r", function(d) {return d.values/10 + 2; })
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.style("fill", function(d, i) { return color(d.value)})
			.on('mouseover', tip.show) 		
			.on('mouseout', tip.hide) 		
};

var data4 = function(data){
	var newdata = d3.nest()
	.key(function(d) {return d.employeeId})	
	.rollup(function(v){
		return d3.sum(v, function(d){
			return d.quantity;
		})
	})
	.entries(data);
	visualizeExoplanets(newdata);
}

$(document).ready(function(){
	d3.json("/juice_orders.json", function(error, data) {
		data1(data);
		data2(data);
		data3(data);
		data4(data);
	})
});