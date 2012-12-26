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
	var child_process = require("child_process");
	var netconfig = require("netconfig");

	exports.getAll = function(callback) {
		var cmd_osx = "ifconfig -a | grep -Ev '^\\s' | awk -F ':' '{print $1}' | sort -u";
		var cmd_sol1 = "/usr/sbin/dladm show-link -p -o LINK";
		var cmd_sol2 = "ifconfig -a4 | /usr/gnu/bin/grep -Pv '^\\s+' | /usr/gnu/bin/awk -F ':' '{print $1}' | sort -u";
		child_process.exec(cmd_osx, function (error, stdout, stderr) {
			callback(stdout.split("\n"));
		});
	};

	exports.getAllNative = function(callback) {
		var nc = new netconfig.NetConfig();
		callback(nc.getAllInterfaces());
	};

}());
