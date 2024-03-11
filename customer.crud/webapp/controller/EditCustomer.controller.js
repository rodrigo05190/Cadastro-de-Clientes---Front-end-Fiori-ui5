sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, History) {
    "use strict";

    return Controller.extend(
      "rodrigo606.customer.crud.controller.EditCustomer",
      {
        getRouter: function () {
          return this.getOwnerComponent().getRouter();
        },

        onInit: function () {
          var oRouter = this.getOwnerComponent().getRouter();
          this.getRouter()
            .getRoute("edit")
            .attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
          var oArgs = oEvent.getParameter("arguments");
          var sPath = oArgs.custumerId;
          var oDataPath = `/CUSTOMERSet(${sPath})`;
          this.getView().bindElement({
            path: oDataPath,
            expand: "customer",
          });
        },
        onCancelPress: function () {
          this.getOwnerComponent().getRouter().navTo("RouteViewCustomer");
        },
        onSavePress: function () {
          //var oModel = this.getView().getModel();
          //console.log(oModel.oData);
        },
        onNavBack: function () {
          var oHistory, sPreviousHash;
          oHistory = History.getInstance();
          sPreviousHash = oHistory.getPreviousHash();
          sPreviousHash !== undefined
            ? window.history.go(-1)
            : this.getRouter().navTo("RouteViewCustomer", {}, true);
        },
      }
    );
  }
);
