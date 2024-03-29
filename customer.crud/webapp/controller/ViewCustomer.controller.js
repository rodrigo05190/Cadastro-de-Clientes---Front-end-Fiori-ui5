sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/BusyIndicator",
    "sap/ui/core/ValueState",
    "sap/ui/core/routing/History"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageBox, MessageToast, BusyIndicator,ValueState,History) {
    "use strict";

    return Controller.extend(
      "rodrigo606.customer.crud.controller.ViewCustomer",
      {
        onInit: function (oEvent) {
          var oLocalStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
          if(oLocalStorage.get('user')){
            this.getOwnerComponent().getRouter().navTo("list");
          }
        },
        onLoginPress: function (oEvent) {
          var oEmailInput = this.byId("Email");
          var oPasswordInput = this.byId("Password");

          var sEmail = this.byId("Email").getValue();
          var sPassword = this.byId("Password").getValue();
          
          if(sEmail.length === 0){
            oEmailInput.setValueState(ValueState.Error);
          }else{
            oEmailInput.setValueState(ValueState.None);
          }
          
          if(sPassword.length === 0){
            oPasswordInput.setValueState(ValueState.Error);
          }else{
            oPasswordInput.setValueState(ValueState.None);
          }
          BusyIndicator.show();
          var oModel = this.getOwnerComponent().getModel();

          oModel.callFunction("/Login", {
            method: "POST",
            urlParameters: {
              Email: sEmail,
              Password: sPassword,
            },
            success: function (oData, response) {
              BusyIndicator.hide();
              var oLocalStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
              oLocalStorage.put("user", oData);
              this.getOwnerComponent().getRouter().navTo("list");
            }.bind(this),
            error: function (oError) {
              BusyIndicator.hide();
              const jsonResponse = JSON.parse(oError.responseText);
              MessageBox.error(jsonResponse.error.message.value);
            },
          });
        },
      }
    );
  }
);

