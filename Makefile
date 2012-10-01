MQ_PLUGIN = ./vendor/tinymce/jscripts/tiny_mce/plugins/mathquill/vendor/
MQ_JS = ${MQ_PLUGIN}/mathquill.js
MQ_CSS = ${MQ_PLUGIN}/mathquill.css

VENDOR_MQ = ./vendor/mathquill/
VENDOR_MQ_CSS = ${VENDOR_MQ}/mathquill.css
VENDOR_MQ_JS = ${VENDOR_MQ}/build/mathquill.js
VENDOR_MQ_SRC = ${VENDOR_MQ}/src

all: ${MQ_JS} ${MQ_CSS}

${MQ_JS}: ${VENDOR_MQ_JS}
	cp $^ $@

${MQ_CSS}: ${VENDOR_MQ_CSS}
	cp $^ $@

${VENDOR_MQ_JS}: ${VENDOR_MQ_SRC}
	cd ${VENDOR_MQ} && make cat
