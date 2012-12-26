
all:
	node_modules/.bin/jake

run:
	node src/server/jsUnixApi

rebuild-native:
	cd node_modules/netconfig && ../../node_modules/.bin/node-gyp clean || exit 0
	cd node_modules/netconfig && ../../node_modules/.bin/node-gyp configure build
	cd node_modules/restify/node_modules/dtrace-provider && node-waf clean || exit 0
	cd node_modules/restify/node_modules/dtrace-provider && node-waf configure build
