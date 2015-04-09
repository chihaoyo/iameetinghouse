<script src="https://cdn.firebase.com/js/client/1.0.18/firebase.js"></script>
<script>

var nodes_ = new Firebase('https://resplendent-fire-8362.firebaseio.com/iameetinghouse/nodes');

nodes_.on('child_added', function(snapshot) {
	var key = snapshot.name();
	var val = snapshot.val();
	console.log(key + ' ' + JSON.stringify(val));
//	nodes_.child(key + '/note').set('');
});

</script>