/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"rodrigo606/customer.crud/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
