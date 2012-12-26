
NETCONFIG_MODULE=node_modules/netconfig/build/Release/netconfig.node
RESTIFY_DTRACE_MODULE=node_modules/restify/node_modules/dtrace-provider/build/Release/DTraceProviderBindings.node
NATIVE_MODULES=$(NETCONFIG_MODULE) $(RESTIFY_DTRACE_MODULE)

all: $(NATIVE_MODULES)
	node_modules/.bin/jake

run:
	node src/server/jsUnixApi

$(NETCONFIG_MODULE): node_modules/netconfig/netconfig.cpp
	cd node_modules/netconfig && ../../node_modules/.bin/node-gyp clean || exit 0
	cd node_modules/netconfig && ../../node_modules/.bin/node-gyp configure build

$(RESTIFY_DTRACE_MODULE):
	cd node_modules/restify/node_modules/dtrace-provider && node-waf clean || exit 0
	cd node_modules/restify/node_modules/dtrace-provider && node-waf configure build
