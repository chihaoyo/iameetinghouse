<script src="https://cdn.firebase.com/js/client/1.0.18/firebase.js"></script>
<script>

var root_ = new Firebase('https://resplendent-fire-8362.firebaseio.com/iameetinghouse/');
var nodes_ = root_.child('nodes2');

nodes_.once('value', function(snapshot) {
	var val = snapshot.val();
	console.log(val)
	root_.child('nodes2backup').set(val);
});

</script>