<script src="https://cdn.firebase.com/js/client/1.0.18/firebase.js"></script>
<script>

var root_ = new Firebase('https://resplendent-fire-8362.firebaseio.com/iameetinghouse/');
var nodes_ = root_.child('nodes2');
nodes_.on('child_added', function(snapshot) {
	if(snapshot.hasChild('x')) {
		console.log(snapshot.val().v + ' has x');
		snapshot.ref().child('x').remove();
	}
	if(snapshot.hasChild('y')) {
		console.log(snapshot.val().v + ' has y');
		snapshot.ref().child('y').remove();
	}
});

</script>