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
          
          var CustomerId = 0;
          var oModel = this.getView().getModel();
          var birthDateValue = this.byId("BirthDate").getValue() + "T00:00:00";
          
          var oCustomerData = {
            FirstName: this.byId("FirstName").getValue(),
            LastName: this.byId("LastName").getValue(),
            PhoneNumber: this.byId("PhoneNumber").getValue(),
            Email: this.byId("Email").getValue(),
            BirthDate: birthDateValue,
            Gender : this.byId("rbMaleId").getSelected() ? "MALE" : "FEMALE"
          };


          var oAddressData = {
            PostCode: this.byId("PostCode").getValue(),
            Street: this.byId("Street").getValue(),
            Neighborhood: this.byId("Neighborhood").getValue(),
            City: this.byId("City").getValue(),
            District: this.byId("District").getValue(),
            HouseNumber: this.byId("house_number").getValue(),
            Complement: this.byId("complement").getValue(),
            CustomerId :CustomerId
          };

          // Create CUSTOMERSet entity
          oModel.create("/CUSTOMERSet", oCustomerData, {
            success: function(data, response) {
                // Retrieve the CustomerId from the response
                var CustomerId = response.data.CustomerId;

                // Add the retrieved CustomerId to the AddressSet payload
                oAddressData.CustomerId = CustomerId;

                // Create AddressSet entity using the updated payload
                oModel.create("/AddressSet", oAddressData, {
                    success: function(data, response) {
                        // Success handling for AddressSet creation
                        BusyIndicator.hide();
                        MessageToast.show("Cliente e endereço cadastrados com sucesso");
                        this.getOwnerComponent().getRouter().navTo("RouteViewCustomer");
                        location.reload();
                    }.bind(this),
                    error: function(e) {
                        // Error handling for AddressSet creation
                        BusyIndicator.hide();
                        MessageToast.show("Erro ao cadastrar endereço");
                    }.bind(this)
                });
            }.bind(this),
            error: function(e) {
                // Error handling for CUSTOMERSet creation
                BusyIndicator.hide();
                MessageToast.show("Erro ao cadastrar cliente");
            }.bind(this)
          });

          
          /*console.log(oCustomerData);
          oModel.create("/CUSTOMERSet", oCustomerData, {
            success: function (data, response) {
              console.log(response.data.CustomerId,'asdas');
            }.bind(this),
            error: function (e) {
              BusyIndicator.hide();
              const jsonResponse = JSON.parse(e.responseText);
              MessageToast.show(jsonResponse.error.message.value);
            }.bind(this),
          });

         var oAddressData = {
            PostCode: this.byId("PostCode").getValue(),
            Street: this.byId("Street").getValue(),
            Neighborhood: this.byId("Neighborhood").getValue(),
            City: this.byId("City").getValue(),
            District: this.byId("District").getValue(),
            HouseNumber: this.byId("house_number").getValue(),
            Complement: this.byId("complement").getValue(),
            CustomerId :CustomerId
          };
          console.log(oAddressData,'oAddressData');
          oModel.create("/AddressSet", oAddressData, {
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
          });*/


        },
        onNavBack: function () {
          var oHistory, sPreviousHash;
          oHistory = History.getInstance();
          sPreviousHash = oHistory.getPreviousHash();
          sPreviousHash !== undefined
            ? window.history.go(-1)
            : this.getRouter.navTo("RouteViewCustomer", {}, true);
        },
        searchCode: async function (cep) {
          try {
            const url = `https://viacep.com.br/ws/${cep}/json/`;

            const response = await fetch(url);

            if (!response.ok) {
              throw new Error("Erro ao buscar o CEP");
            }

            const data = await response.json();

            return data;
          } catch (error) {
            console.error("Erro ao buscar o CEP:", error.message);
            return null;
          }
        },
        onCEPChange: async function (oEvent) {
          try {
            // Recupera o valor do CEP digitado pelo usuário
            var sInputValue = oEvent.getParameter("value");

            // Adiciona um indicador de carregamento
            BusyIndicator.show();
            await new Promise((resolve) => setTimeout(resolve, 3000));
            // Faz a busca do CEP na API e manipula a promessa retornada usando .then()
            await this.searchCode(sInputValue)
              .then(
                function (address) {
                  // Verifica se os dados do endereço foram retornados com sucesso
                  if (address) {
                    // Define os valores nos campos com os dados do endereço
                    this.byId("Neighborhood").setValue(address.bairro);
                    this.byId("City").setValue(address.localidade);
                    this.byId("District").setValue(address.uf);
                    this.byId("Street").setValue(address.logradouro);
                  } else {
                    // Trata o caso em que os dados do endereço não foram encontrados
                    console.error("Endereço não encontrado");
                  }
                }.bind(this)
              )
              .catch(function (error) {
                // Trata erros que podem ocorrer durante a busca do CEP
                console.error("Erro ao buscar o CEP:", error);
              })
              .finally(function () {
                // Remove o indicador de carregamento após a conclusão da busca
                sap.ui.core.BusyIndicator.hide();
              });
          } catch (error) {
            console.error("Erro:", error);
          }
        },
      }
    );
  }
);
