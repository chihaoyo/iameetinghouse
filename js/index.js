// data
var root_ = new Firebase('https://iameetinghouse.firebaseio.com/');
var initialized = false;

var nodes_local = {};
var nodes_ = root_.child('nodes');
nodes_.once('value', function(snapshot) {
	console.log('nodes on value');
	// this executes when app first launched locally, right?
	if(!initialized) {
		console.log('draw nodes for the first time');
		draw_nodes();
	}
	initialized = true;
	console.log('initialized');
});
nodes_.on('child_added', function(snapshot) {
	var key = snapshot.name();
	var val = snapshot.val();
	console.log('nodes on child_added ' + key + ' ' + JSON.stringify(val));

	var node = new Node(key, val);
	nodes_local[key] = node;

	if(initialized) {
		console.log('draw nodes at added child event');
		draw_nodes();
	}
}, function(error) {
	console.log('error: ' + error.code);
});
nodes_.on('child_changed', function(snapshot) {
	var key = snapshot.name();
	var val = snapshot.val();
	console.log('nodes on child_changed ' + key + ' ' + JSON.stringify(val));

	nodes_local[key].val = val;
	redraw_node(key, val);
});
nodes_.on('child_removed', function(snapshot) {
	var key = snapshot.name();
	var val = snapshot.val();
	console.log('nodes on child_removed ' + key + ' ' + JSON.stringify(val));

	delete nodes_local[key];
	draw_nodes();
});

var $window = $(window);
var $document = $(document);
$(init);
$window.on('resize', function() {
	console.log('unevent: resize');
}, 500);
