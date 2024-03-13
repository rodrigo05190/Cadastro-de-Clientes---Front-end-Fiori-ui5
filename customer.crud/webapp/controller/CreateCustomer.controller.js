sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, History, BusyIndicator, MessageToast,MessageBox) {
    "use strict";

    return Controller.extend(
      "rodrigo606.customer.crud.controller.CreateCustomer",
      {
        getRouter: function () {
          return this.getOwnerComponent().getRouter();
        },

        onInit: function () {
         
        },
        onCancelPress: function () {
          this.getOwnerComponent().getRouter().navTo("RouteViewCustomer");
        },
        onSavePress: function () {
          BusyIndicator.show();
          var oModel = this.getView().getModel();
          var sBirthDateISO = this.byId("BirthDate").getValue();
          var oBirthDate = new Date(sBirthDateISO);
          var sFormattedBirthDate = this.formatDate(oBirthDate);
          var oCustomerData = {
            FirstName: this.byId("FirstName").getValue(),
            LastName: this.byId("LastName").getValue(),
            PhoneNumber: this.byId("PhoneNumber").getValue(),
            Email: this.byId("Email").getValue(),
            BirthDate: sFormattedBirthDate + "T00:00:00",
          };
          oModel.create("/CUSTOMERSet", oCustomerData, {
            success: function (data, response) {
              BusyIndicator.hide();
              MessageToast.show("Cliente cadastrado com sucesso");
              this.getOwnerComponent().getRouter().navTo("RouteViewCustomer");
              location.reload();
            }.bind(this),
            error: function (e) {
              BusyIndicator.hide();
              const jsonResponse = JSON.parse(e.responseText);
              MessageToast.show(jsonResponse.error.message.value);
            }.bind(this),
          });
        },
        onNavBack: function () {
          var oHistory, sPreviousHash;
          oHistory = History.getInstance();
          sPreviousHash = oHistory.getPreviousHash();
          sPreviousHash !== undefined
            ? window.history.go(-1)
            : this.getRouter.navTo("RouteViewCustomer", {}, true);
        },
        formatDate: function (oDate) {
          var oDateFormat = sap.ui.core.format.DateFormat.getInstance({
            pattern: "yyyy-MM-dd",
          });
          return oDateFormat.format(oDate);
        },
        //onLiveChange: function (oEvent){
          //alert('teste');
        //}
      }
    );
  }
);
