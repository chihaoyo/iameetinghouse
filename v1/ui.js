var svg = d3.select('svg');
var font_size = 14.0;
var a = (font_size*0.60).toFixed(4); // letter width
var u = (font_size*1.25).toFixed(4); // line height

// http://bost.ocks.org/mike/join/
// http://bl.ocks.org/mbostock/3808218
function draw_nodes() {
	// join
	var nodes = svg.selectAll('g.node').data($.map(nodes_local, function(o, i) { return [o]; }), function(o) { return JSON.stringify(o.val); });
	// http://stackoverflow.com/questions/6857468/a-better-way-to-convert-js-object-to-array

	// enter
	var new_nodes = nodes.enter().append('g');
	console.log('adding ' + new_nodes.size() + ' nodes');

	// draw new nodes
	new_nodes.attr('class', function(o, i) { return 'node draggable ' + o.val.c; })
		.attr('id', function(o, i) { return o.key; })
		.attr('transform', function(o, i) { return 'translate(' + o.val.x + ',' + o.val.y + ')'; })
		.on('mouseover', function(o, i) {
			d3.select(this).classed('focus', true);
		})
		.on('mouseout', function(o) {
			d3.select(this).classed('focus', false);
		});
	new_nodes.append('rect').attr('class', 'block')
		.attr('x', function(o) { return -o.getWidth()/2; })
		.attr('y', function(o) { return -o.getHeight()/2; })
		.attr('width', function(o) { return o.getWidth(); })
		.attr('height', function(o) { return o.getHeight(); });
	new_nodes.append('text').attr('text-anchor', 'middle')
		.attr('y', function(o) { return o.getHeight()/4; })
		.text(function(o) { return o.val.v; });
	new_nodes.append('circle').attr('class', 'red')
		.attr('cx', function(o) { return -o.getWidth()/2; })
		.attr('cy', function(o) { return -o.getHeight()/2; })
		.attr('r', (a/3*2).toFixed(4))
		.on('click', function(o, i) { remove_node(o, i); });
/*	new_nodes.append('foreignObject')
		.attr('x', function(o) { return -o.getWidth()/2; })
		.attr('y', function(o) { return o.getHeight()/2; })
		.attr('width', 20*a)
		.attr('height', 10*a)
			.append('xhtml:body')
			.attr('class', 'foreign_object')
				.append('textarea')
				.attr('class', 'note')
				.attr('style', 'padding: 2px ' + a + 'px;')
				.attr('placeholder', 'Take notes here.')
				.html(function(o) { return o.val.note; }); */
//			.html('<textarea class="note" placeholder="Take notes here."></textarea>');
		
//	new_nodes.append('circle').attr('r', 2).attr('cx', 0).attr('cy', 0).attr('fill', 'white'); // center point

	// exit
	var old_nodes = nodes.exit();
	console.log('removing ' + old_nodes.size() + ' nodes');
	old_nodes.remove();

	// enable dnd
	new_nodes.call(drag);
};
var draw_node = function(k, v) {
	svg.select('g.node#' + k).attr('transform', 'translate(' + v.x + ', ' + v.y + ')');
};

var add_node = function(c, v) {
	console.log('add node ' + c + ' ' + v);
	var val = {c: c, v: v, x: 3*u, y: 5*u}; // default position on the map
	nodes_.push(val);
};
var remove_node = function(o, i) {
	console.log('remove node @' + o.key + ' ' + JSON.stringify(o.val));
	nodes_.child(o.key).remove();
};
var save_node = function(o, i) {
	console.log('save node @' + o.key  + ' ' + JSON.stringify(o.val));
	nodes_.child(o.key).update(o.val);
};

// dnd
var drag = d3.behavior.drag()
	.on('drag', function(o, i) {
		o.val.x += d3.event.dx;
		o.val.y += d3.event.dy;
		d3.select(this).attr('transform', 'translate(' + o.val.x + ', ' + o.val.y + ')');
	})
	.on('dragend', function(o, i) {
		o.val.x = Math.ceil(o.val.x);
		o.val.y = Math.ceil(o.val.y);
		save_node(o, i);
	});

// ui
var category = $('#category');
var input = $('#input');
var submit = $('#submit');
category.change(function() {
	input.attr('category', category.val());
});
submit.click(function() {
	var c = category.val();
	var v = input.val();
	if(c != '' && v != '')
		add_node(c, v);

	input.val('');
	return false;
});
category.change();