
UNAME := $(shell uname)

ifeq ($(UNAME), Linux)
LDFLAGS=

endif

ifeq ($(UNAME), Solaris)
LDFLAGS=-ldladm
endif

ifeq ($(UNAME), Darwin)
LDFLAGS=
endif

show_links: show_links.cpp
