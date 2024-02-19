/*global QUnit*/

sap.ui.define([
	"rodrigo606/customer.crud/controller/ViewCustomer.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ViewCustomer Controller");

	QUnit.test("I should test the ViewCustomer controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
