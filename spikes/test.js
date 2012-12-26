
(function() {
	var ncBinding = require("netconfig");
	var nc = new ncBinding.NetConfig();

	console.log(nc.getAllInterfaces());
}());
