
NETCONFIG_MODULE=node_modules/netconfig/build/Release/netconfig.node
RESTIFY_DTRACE_MODULE=node_modules/restify/node_modules/dtrace-provider/build/Release/DTraceProviderBindings.node
NATIVE_MODULES=$(NETCONFIG_MODULE) $(RESTIFY_DTRACE_MODULE)

all: $(NATIVE_MODULES)
	node_modules/.bin/jake

run:
	node src/server/jsUnixApi

gen_dependencies=$(shell find $1 -type f | grep -v $1/build | grep -v 'README')

$(NETCONFIG_MODULE): $(call gen_dependencies,node_modules/netconfig)
	cd node_modules/netconfig && ../../node_modules/.bin/node-gyp clean || exit 0
	cd node_modules/netconfig && ../../node_modules/.bin/node-gyp configure build

$(RESTIFY_DTRACE_MODULE):  $(call gen_dependencies,node_modules/restify/node_modules/dtrace-provider)
	cd node_modules/restify/node_modules/dtrace-provider && node-waf clean || exit 0
	cd node_modules/restify/node_modules/dtrace-provider && node-waf configure build
