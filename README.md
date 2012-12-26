jsUnixApi
=========
Node.js javascript REST API for querying and controlling Unix machines (Darwin/Mac OS X, Illumos/Openindiana, Linux)

This project is just a proof of concept I wrote in my spare time, so expect nothing :)

Platform notes
--------------

  1. **Solaris:** Building both node and native extentions for node will not work with default compilers, so you will nedd Rich Lowe's patched gcc 4.4.4.

    * Download and install patched gcc-4.4.4 from http://richlowe.openindiana.org/~richlowe/il-gcc-444-i386.tar.bz2

    * Set environment variables to use this compiler:
```bash
$ export CC=/opt/gcc/4.4.4/bin/gcc
$ export CXX=/opt/gcc/4.4.4/bin/g++
$ export LD_LIBRARY_PATH=/opt/gcc/4.4.4/lib
```

    * Compile and install node.js by downloading the source (from http://nodejs.org).

  2. **MacOS X:** You will need both XCode and Node.js installed.

  3. **Linux:** You will need gcc and g++ compilers, and Node.js installed either from sources or precompiled from nodejs.org

Running
-------

```bash
$ make rebuild-native # rebuilds needed native extensions; run this again on new systems
$ make # runs test suite (unit, end-to-end and performance tests)
$ make run # starts server on port 8080 (by default)
```

Copyright (C) 2012, Dan Vatca <dan.vatca@gmail.com>
