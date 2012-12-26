
(function() {
	"use strict";

	require(__dirname + "/hello_world.js");
	var h = new HelloWorldJs();
	console.log(h.hello());
	console.log(h.hello());
}());
