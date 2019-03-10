#
# Makefile
# CLIC website software
#
# This is a Makefile to perform various administrative
# tasks on the production server. WARNING : this script is
# not meant to be run on development machines! Some
# commands may destruct unstaged git changes !
#
# author: Alexandre CHAU

# Help body
define HELP_SECTION
-------------------------------------------------------------------------------
CLIC website bash Makefile
-------------------------------------------------------------------------------
This is a Makefile to perform various administrative tasks on the production
server.

WARNING : this script is not meant to be run on development machines! Some
commands may destruct unstaged git changes !

Available commands:

make help
	Display this help

make update
	Update the production server with the latest git version on master.
	WARNING this command is destructive of unstaged git changes !
	WARNING this will kill all running node (and the server) instances !
	This command assumes that theses services are restarted (automatically)
-------------------------------------------------------------------------------
endef
export HELP_SECTION

# When "make" is run, display help
all: help

# Display help body
help:
	$(info $(HELP_SECTION))

# Automates updates on the production server
update:
	git stash
	git checkout master
	git pull
	npm install
	git stash
	killall node