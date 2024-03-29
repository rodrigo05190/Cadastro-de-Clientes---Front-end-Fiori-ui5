sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/BusyIndicator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageBox, MessageToast, BusyIndicator) {
    "use strict";

    return Controller.extend(
      "rodrigo606.customer.crud.controller.ListCustomer.controller",
      {
        onInit: function (oEvent) {
          this.onReadCustomer();
          var oLocalStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
          var userData = oLocalStorage.get("user");
          if(userData){
            var oModel = new sap.ui.model.json.JSONModel(userData);
            this.getView().setModel(oModel, "user");
            var sName = oModel.getProperty("/Name");
            var sTypeUser = oModel.getProperty("/TypeId");
            var sGreeting = "Bem-vindo usuário(a): " + sName + ' - ' + (sTypeUser === 1 ? 'Administrado(a)' : 'Atendimento(a)');
            oModel.setProperty("/Greeting", sGreeting);
          }
         this.isCount();
        },
        onReadCustomer:function (){
          var oModel = this.getOwnerComponent().getModel();
          var oJSONModel = new sap.ui.model.json.JSONModel();
          oModel.read('/CUSTOMERSet',{
            success:function(response) {
              oJSONModel.setData(response.results);
              this.getView().setModel(oJSONModel,'CustomerDataModel');
            }.bind(this),
            error:function(error) {
              
            }.bind(this)
          })
        },
        onPressAdd: function () {
          this.getOwnerComponent().getRouter().navTo("create");
        },
        onPressEdit: function (oEvent) {
          var oSelectdItem = oEvent.getSource();
          var oContext = oSelectdItem.getBindingContext();
          debugger;
          var sPath = oContext.getPath();
          var obj = oContext.getObject();
          this.getOwnerComponent().getRouter().navTo("edit", {
            custumerId: obj.CustomerId,
          });
        },
        onPressDelete: function (oEvent) {
          var sPath = oEvent.getSource().getBindingContext().getPath();
          var oModel = this.getView().getModel();
          var oClientToDelete = oModel.getProperty(sPath);
          MessageBox.confirm(
            "Deseja realmente excluir o cliente ," +
              oClientToDelete.FirstName +
              "?",
            {
              title: "Confirm",
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  oModel.remove(sPath, {
                    success: function () {
                      MessageToast.show("Cliente, excluido com sucesso!");
                      this.isCount();
                    }.bind(this),
                    error: function () {},
                  });
                } else {
                  console.log("User clicked Close or closed the dialog");
                }
              }.bind(this),
              styleClass: "",
              actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
              emphasizedAction: sap.m.MessageBox.Action.OK,
              initialFocus: null,
              textDirection: sap.ui.core.TextDirection.Inherit,
            }
          );
        },
        isCount: function () {
          var count = this.byId("panel");
          var sCount = "";
          var oModel = this.getOwnerComponent().getModel();
          oModel.read("/CUSTOMERSet/$count", {
            success: function (response) {
              sCount = "Clientes(" + response + ")";
              count.setHeaderText(sCount);
              BusyIndicator.hide();
            }.bind(this),
            error: function (e) {}.bind(this),
          });
        },
      }
    );
  }
);
