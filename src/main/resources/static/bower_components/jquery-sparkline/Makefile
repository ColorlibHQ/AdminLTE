SRC_DIR = src
DIST_DIR = dist
COMPILER ?= `which uglifyjs` --no-copyright


SRC_FILES = $(SRC_DIR)/header.js\
	$(SRC_DIR)/defaults.js\
	$(SRC_DIR)/utils.js\
	$(SRC_DIR)/simpledraw.js\
	$(SRC_DIR)/rangemap.js\
	$(SRC_DIR)/interact.js\
	$(SRC_DIR)/base.js\
	$(SRC_DIR)/chart-line.js\
	$(SRC_DIR)/chart-bar.js\
	$(SRC_DIR)/chart-tristate.js\
	$(SRC_DIR)/chart-discrete.js\
	$(SRC_DIR)/chart-bullet.js\
	$(SRC_DIR)/chart-pie.js\
	$(SRC_DIR)/chart-box.js\
	$(SRC_DIR)/vcanvas-base.js\
	$(SRC_DIR)/vcanvas-canvas.js\
	$(SRC_DIR)/vcanvas-vml.js\
	$(SRC_DIR)/footer.js


VERSION = $(shell cat version.txt)

all: jqs-gzip jqs-min-gzip Changelog.txt

jqs: ${SRC_FILES}
	cat ${SRC_FILES} | sed 's/@VERSION@/${VERSION}/'  >${DIST_DIR}/jquery.sparkline.js

jqs-min: jqs
	cat minheader.txt | sed 's/@VERSION@/${VERSION}/' >dist/jquery.sparkline.min.js
	${COMPILER} dist/jquery.sparkline.js  >>dist/jquery.sparkline.min.js

jqs-gzip: jqs
	gzip -9 < dist/jquery.sparkline.js >dist/jquery.sparkline.js.gz

jqs-min-gzip: jqs-min
	gzip -9 < dist/jquery.sparkline.min.js >dist/jquery.sparkline.min.js.gz
