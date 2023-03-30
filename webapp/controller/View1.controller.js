sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("dreambankv2.controller.View1", {
			onInit: function () {    

			},

            onItemPress: function(oEvent) {
                var oList = oEvent.getSource();
                var aContexts = oList.getSelectedContexts(true);
                // update UI
                var bSelected = (aContexts && aContexts.length > 0);
                var sText = (bSelected) ? aContexts.length + " selected" : null;
                var oItem = oEvent.getParameter("listItem");
                var oContext = oItem.getBindingContext();
                var oPanel = this.getView().byId("idPanel");
                if (sText == null){
                    oPanel.setVisible(false);
                }else{
                    console.log(sText)
                    oPanel.setVisible(true);
                    oPanel.setBindingContext(oContext);
                }

            },

			handleNav: function (evt) {
				var navCon = this.byId("navCon");
				var target = evt.getSource().data("target");
				if (target) {
					navCon.to(this.byId(target));
				} else {
					navCon.back();
				}
			},

			onSubmit: function() {
				var oModel = this.getView().getModel()
				console.log(oModel)

				var oNewEntry = {};
				oNewEntry.ID = this.getView().byId("inputCedula").getValue();
				oNewEntry.nombre = this.getView().byId("inputNombre").getValue();
				oNewEntry.empresa = this.getView().byId("inputEmpresa").getValue();
				oNewEntry.telefono = this.getView().byId("inputTelefono").getValue();
				oNewEntry.correo = this.getView().byId("inputCorreo").getValue();
				
				oModel.create("/Aportadores", oNewEntry, {
				  success: function() {
					sap.m.MessageToast.show("Entrada creada con éxito");
				  },
				  error: function(oError) {
					sap.m.MessageToast.show("Error al crear la entrada: " + oError.message);
				  }
				});
			  }
        });
    });

