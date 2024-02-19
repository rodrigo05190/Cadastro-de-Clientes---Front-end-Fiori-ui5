sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend(
      "rodrigo606.customer.crud.controller.ViewCustomer",
      {
        onInit: function () {},
        onPressAdd: function () {
          // Navegue para a view de criação

          this.getOwnerComponent().getRouter().navTo("create");
        },
      }
    );
  }
);
