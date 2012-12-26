#include <stdio.h>

#if defined(sun) || defined(__sun)
#  if defined(__SVR4) || defined(__svr4__)
#    define OS_SOLARIS 1
#  endif
#endif

#ifdef OS_SOLARIS
#include <libdllink.h>

static dladm_handle_t g_handle = NULL;

int dladm_init() {
	dladm_status_t dlstat;
	char errmsg[DLADM_STRSIZE];

	if (dladm_open(&g_handle) != DLADM_STATUS_OK) {
		fprintf(stderr, "dladm_open: %s", dladm_status2str(dlstat, errmsg));
		return 1;
	}
	return 0;
}

static int dladm_callback(dladm_handle_t dh, datalink_id_t linkid, void *arg)
{
	dladm_status_t		status;
	char			link[MAXLINKNAMELEN];
	datalink_class_t	dl_class;
	uint_t			mtu;
	uint32_t		flags;

	if ((status = dladm_datalink_id2info(g_handle, linkid, &flags, &dl_class,
	    NULL, link, sizeof (link))) != DLADM_STATUS_OK) {
		return (status);
	}

	printf("%s\n", link);
	return (DLADM_WALK_CONTINUE);
}

void print_if_list(void)
{
	dladm_init();
	
	uint32_t flags = DLADM_OPT_ACTIVE;
	(void) dladm_walk_datalink_id(dladm_callback, g_handle,
	    NULL, (datalink_class_t) DATALINK_CLASS_ALL, DATALINK_ANY_MEDIATYPE,
	    flags);

	return;
}
#else

#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/ioctl.h>
#include <net/if.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <unistd.h>

#ifndef _SIZEOF_ADDR_IFREQ
#define _SIZEOF_ADDR_IFREQ sizeof
#endif

void print_if_list(void)
{
	int socketfd;
	struct ifconf conf;
	char data[4096];
	struct ifreq *ifr;
	char addrbuf[1024];

	socketfd = socket(AF_INET, SOCK_DGRAM, 0);
	if (socketfd >= 0) {
		conf.ifc_len = sizeof(data);
		conf.ifc_buf = (caddr_t) data;
		if (ioctl(socketfd,SIOCGIFCONF,&conf) < 0)
			perror("ioctl");

		ifr = (struct ifreq*)data;
		while ((char*)ifr < data+conf.ifc_len) {
			switch (ifr->ifr_addr.sa_family) {
				case AF_INET:
					// printf("%s : %s\n", ifr->ifr_name, inet_ntop(ifr->ifr_addr.sa_family, &((struct sockaddr_in*)&ifr->ifr_addr)->sin_addr, addrbuf, sizeof(addrbuf)));
					printf("%s\n", ifr->ifr_name);
					break;
			}
			ifr = (struct ifreq*)((char*)ifr +_SIZEOF_ADDR_IFREQ(*ifr));
		}
		close(socketfd);
	}
}
#endif

int main(int argc, char **argv)
{
	print_if_list();
	return 0;
}
