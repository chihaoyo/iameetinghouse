var Node = function(key, val) {
	this.key = key;
	this.val = val;
};
//Node.prototype.getWidth = function() { return Math.ceil(this.val.v.length*X.letterW + 2*X.letterW); };
Node.prototype.getHeight = function() { return Math.ceil(X.lineH); };
