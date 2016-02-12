var getData = function(data){
	var color = d3.scale.category20b();
		var tip = d3.tip()
		 	.offset([-10, 0])
		  	.html(function(d) {
		   	 return "<strong>Bus Name: <span style='color:red'>" + d.key +' : '+ d.value  + " Stops</span></strong>";
		});
		var desc = function(x, y){
			return x.value - y.value;
		}
		var pack = d3.layout.pack()
		    .sort(null)
		    .size([1000, 1000])
		    .value(function(d) { return d.value})
		    .padding(1);
		var svg = d3.select("#Exoplanet").append("svg")
		    .attr("width", 1000)
		    .attr("height", 1000);
		svg.call(tip);
		svg.selectAll("circle")
		      .data(pack.nodes({children: data}))
		    .enter().append("circle")
				.attr("r", function(d) {return d.value/50 + 2; })
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; })
				.style("fill", function(d, i) { return color(d.value)})
				.on('mouseover', tip.show) 		
				.on('mouseout', tip.hide) 		
};

$(document).ready(function(){
	d3.json('/bangalore.json', function(error, data){
		var bus = [];
		for(var i in data){
			var obj = {}
			obj.key = i;
			obj.value = data[i].length;
			obj.values = data[i].length;
			bus.push(obj);
		}
		console.log(bus.length)
		getData(bus);
	});
});


