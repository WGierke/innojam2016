sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/GroupHeaderListItem",
	"sap/m/MessageToast"
], function(Controller, GroupHeaderListItem, MessageToast) {
	"use strict";

	return Controller.extend("JoinMyRide.controller.SearchRide", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit: function() {
			this.oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("JoinMyRide", "/model/mock.json"));
			this.getView().setModel(this.oModel);
		},

		/* =========================================================== */
		/* begin: event handler methods                                */
		/* =========================================================== */

		onSearchPress: function() {
			var that = this;
			var oTourList = this.getView().byId("tourList");
			oTourList.setBusy(true);
			setTimeout(function() {
				that._bindTourListItems();
			}, 3000);
		},

		onLocateButtonPress: function() {
			var that = this;
			var oSourceLocationInput = this.getView().byId("inputSourceLocation");
			oSourceLocationInput.setBusy(true);
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(oPosition) {
					that.getView().getModel().setProperty("/sourceLocation", oPosition.coords.longitude + ", " + oPosition.coords.latitude);
					oSourceLocationInput.setBusy(false);
					sap.ui.getCore().getEventBus().publish("ChangeMapMarker", "SetMarker", {
						Position: {
							longitude: oPosition.coords.longitude,
							latitude: oPosition.coords.latitude
						}
					});
				});
			} else {
				setTimeout(function() {
					that.getView().getModel().setProperty("/sourceLocation", "Nordallee, 30521 Hannover");
					oSourceLocationInput.setBusy(false);
					sap.ui.getCore().getEventBus().publish("ChangeMapMarker", "SetMarker", {
						Position: {
							longitude: "9.8038578",
							latitude: "52.3239015"
						}
					});
				}, 3000);
			}
		},

		onDestinationInputChange: function() {
			sap.ui.getCore().getEventBus().publish("ChangeMapMarker", "SetRoute", {
				Source: {
					longitude: "9.8038578",
					latitude: "52.3239015"
				},
				Destination: {
					longitude: "13.1322587",
					latitude: "52.3941056"
				}
			});
		},

		onTourListItemClick: function() {
			this.onOpenDialog();
		},

		onOpenDialog: function() {
			if (!this._dialog) {
				this._dialog = sap.ui.xmlfragment("JoinMyRide.view.fragment.DialogWaitingForConfirmation", this);
				this.getView().addDependent(this._dialog);
			}
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
			this._dialog.open();
		},

		onDialogClosed: function(oEvent) {
			if (oEvent.getParameter("cancelPressed")) {
				MessageToast.show("The operation has been cancelled");
			} else {
				MessageToast.show("You will be picked up soon!");
			}
		},

		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */

		_bindTourListItems: function() {
			var oTourList = this.getView().byId("tourList");
			oTourList.bindItems("/Tours", sap.ui.xmlfragment("JoinMyRide.view.fragment.TourListItem", this), new sap.ui.model.Sorter("Type",
				true, true), null);
			oTourList.setBusy(false);
		}
	});
});