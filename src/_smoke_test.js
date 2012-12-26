/**
 * Copyright (C) 2012, Dan Vatca <dan.vatca@gmail.com>
 * All rights reserved.
 *  Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function() {
	"use strict";

	var jake = require("jake");
	var http = require("http");
	var child_process = require("child_process");

	exports.test_forSmoke = function(test) {
		runServer("8080", function(serverProcess) {
			httpGet("http://localhost:8080", function () {
				serverProcess.kill("SIGTERM");
				test.done();
			});
		});
	};

	var speedTestRequests;
	var speedTestStart;
	var speedTestServerProcess;
	var speedTest;
	var speedTestTasks = 10;
	exports.test_forInterfaceListSpeed = function(test) {
		runServer("8080", function(serverProcess) {
			speedTestRequests = speedTestTasks;
			speedTestStart = (new Date()).getTime();
			speedTestServerProcess = serverProcess;
			speedTest = test;
			for (var i = 0; i<speedTestTasks; i++) {
				httpGet("http://localhost:8080/network", handleSpeedTestResponse);
			}
		});
	};

	exports.test_forInterfaceListNativeSpeed = function(test) {
		runServer("8080", function(serverProcess) {
			speedTestRequests = speedTestTasks;
			speedTestStart = (new Date()).getTime();
			speedTestServerProcess = serverProcess;
			speedTest = test;
			for (var i = 0; i<speedTestTasks; i++) {
				httpGet("http://localhost:8080/networkNative", handleSpeedTestResponse);
			}
		});
	};

	function handleSpeedTestResponse(response, data) {
		speedTestRequests--;
		if (speedTestRequests === 0) {
			var speedTestEnd = (new Date()).getTime();
			console.log('Multithreaded get of ' + speedTestTasks + ' pages: ' + (speedTestEnd-speedTestStart)/1000 + "s");
			speedTestServerProcess.kill("SIGTERM");
			speedTest.done();
		}
	}

	function runServer(port, callback) {
		var serverProcess = child_process.spawn("node", ["src/server/jsUnixApi", port]);
		serverProcess.stdout.setEncoding("utf8");
		serverProcess.stdout.on("data", function(chunk) {
			if (chunk.match("jsUnixApi")) callback(serverProcess);
		});
		serverProcess.stderr.on("data", function(chunk) {
			process.stderr.write(chunk);
		});
	}

	function httpGet(url, callback) {
		http.get(url, function(response) {
			var data = "";
			response.on("data", function(chunk) {
				data += chunk;
			});
			response.on("end", function () {
				callback(response, data);
			});
		});
	}
}());
