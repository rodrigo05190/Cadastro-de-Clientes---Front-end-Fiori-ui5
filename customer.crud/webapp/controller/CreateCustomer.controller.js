sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, History) {
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
          var oModel = this.getView().getModel();
          sap.ui.core.BusyIndicator.show()
          var sBirthDateISO = this.byId('BirthDate').getValue();
          var oBirthDate = new Date(sBirthDateISO);
          var sFormattedBirthDate = this.formatDate(oBirthDate);
          var oCustomerData = {
            FirstName:this.byId('FirstName').getValue(),
            LastName:this.byId('LastName').getValue(),
            PhoneNumber:this.byId('PhoneNumber').getValue(),
            Email:this.byId('Email').getValue(),
            BirthDate: sFormattedBirthDate
          };
          
          oModel.create('/CUSTOMERSet', oCustomerData, {
            success: function (data, response) {
                console.log(response);
            }.bind(this),
            error: function (e) {
                console.error("Erro durante a criação:", e);
            }.bind(this)
          });
          
        },
        onNavBack: function () {
          var oHistory, sPreviousHash;
          oHistory = History.getInstance();
          sPreviousHash = oHistory.getPreviousHash();
          sPreviousHash !== undefined
            ? window.history.go(-1)
            : this.getRouter.navTo(
                "RouteViewCustomer",
                {},
                true 
              );
        },
        formatDate: function (oDate) {
          var oDateFormat = sap.ui.core.format.DateFormat.getInstance({
              pattern: "yyyy-MM-dd"
          });
          return oDateFormat.format(oDate);
        }
      }
    );
  }
);
