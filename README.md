jsUnixApi
=========
Node.js javascript REST API for querying and controlling Unix machines (Darwin/Mac OS X, Illumos/Openindiana, Linux)

This project is just a proof of concept I wrote in my spare time, so expect nothing :)

Platform notes
--------------

* **Openindiana/Illumos:** Building both node and native extensions for node will not work with default compilers.
You need Rich Lowe's patched gcc 4.4.4. Download and install from
http://richlowe.openindiana.org/~richlowe/il-gcc-444-i386.tar.bz2

* **MacOS X:** You will need both XCode and Node.js installed.
* **Linux:** You will need gcc and g++ compilers, and Node.js installed either from sources or pre-compiled
from nodejs.org

Running
-------

```bash
$ make # runs test suite (unit, end-to-end and performance tests)
$ make run # starts server on port 8080 (by default)
```

Copyright (C) 2012, Dan Vatca <dan.vatca@gmail.com>
