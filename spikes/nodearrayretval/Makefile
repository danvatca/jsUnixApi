
all: build

configure: helloworld.cc binding.gyp
	node-gyp configure

build: helloworld.cc configure
	node-gyp build

install: build
	node-gyp install

clean:
	node-gyp clean

distclean:
	node-gyp distclean
