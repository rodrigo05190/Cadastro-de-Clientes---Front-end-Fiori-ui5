sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller,MessageBox) {
    "use strict";

    return Controller.extend(
      "rodrigo606.customer.crud.controller.ViewCustomer",
      {
        onInit: function () {},
        onPressAdd: function () {
          this.getOwnerComponent().getRouter().navTo("create");
        },
        onPressEdit: function (oEvent) {
          var oSelectdItem = oEvent.getSource();
          var oContext = oSelectdItem.getBindingContext();
          var sPath = oContext.getPath();
          var obj = oContext.getObject();
          this.getOwnerComponent().getRouter().navTo("edit",{
            custumerId : obj.CustomerId
          });
        },
        onPressDelete: function (oEvent) {
          var sPath = oEvent.getSource().getBindingContext().getPath();
          var oModel = this.getView().getModel();
          var oClientToDelete = oModel.getProperty(sPath);
          MessageBox.confirm(
            "Deseja realmente excluir o cliente ," + oClientToDelete.FirstName + "?",
            {
              title: "Confirm", // default
              onClose: function (oAction) {
                // Callback function that gets executed when the user closes the confirmation dialog
                if (oAction === sap.m.MessageBox.Action.OK) {
                  this.getView().getModel().remove(sPath,{
                    success:function(){
                    },
                    error:function(){
                    },
                  })
                } else {
                  console.log("User clicked Close or closed the dialog");
                }
              }, // default
              styleClass: "", // default
              actions: [
                MessageBox.Action.OK, MessageBox.Action.CANCEL
              ], // default
              emphasizedAction: sap.m.MessageBox.Action.OK, // default
              initialFocus: null, // default
              textDirection: sap.ui.core.TextDirection.Inherit, // default
              
            }
          );
          
        },
      }
    );
  }
);
