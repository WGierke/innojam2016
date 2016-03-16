/*global location */
sap.ui.define([
	"JoinMyRide/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"JoinMyRide/model/formatter"
], function(BaseController, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("JoinMyRide.controller.Detail", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit: function() {
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.subscribe("ChangeMapMarker", "SetMarker", this._setMarker, this);
			oEventBus.subscribe("ChangeMapMarker", "SetRoute", this._setRoute, this);
		},

		// TODO This is a workaround. 
		// For the vbi control to fill the entire view space, it needs a resize or zoom event
		onAfterRendering: function() {
			var that = this;
			setTimeout(function() {
				var oMap = that.getView().byId("vbi");
				oMap.setHeight("99%");
			}, 1000);

		},

		/* =========================================================== */
		/* begin: internal methods for map control                     */
		/* =========================================================== */

		/**
		 * Places a marker on the map for a given position
		 * Invoked via event bus channel "ChangeMapMarker" and event code "SetMarker"
		 * @private
		 */
		_setMarker: function(sChannel, sEvent, oData) {
			var ZOOMLEVEL = "16";
			var oPosition = oData.Position;
			if (oPosition.longitude && oPosition.latitude) {
				var oMap = this.getView().byId("vbi");
				oMap.zoomToGeoPosition(oPosition.longitude, oPosition.latitude, ZOOMLEVEL);
				oMap.addVo(new sap.ui.vbm.Spots("marker", {
					items: [
						new sap.ui.vbm.Spot({
							position: oPosition.longitude + ';' + oPosition.latitude + ';0'
						})
					]
				}));
			}
		},

		/**
		 * Places a visual route on the map for given source and destination locations
		 * Invoked via event bus channel "ChangeMapMarker" and event code "SetRoute"
		 * @private
		 */
		_setRoute: function(sChannel, sEvent, oData) {
			var oSource = oData.Source;
			var oDestination = oData.Destination;
			if (oSource.longitude && oSource.latitude && oDestination.longitude && oDestination.latitude) {
				var oMap = this.getView().byId("vbi");
				oMap.zoomToGeoPosition(oData.Source.longitude, oData.Source.latitude, "6");
				oMap.addVo(new sap.ui.vbm.Spots("destinationLocation", {
					items: [
						new sap.ui.vbm.Spot({
							position: oDestination.longitude + ';' + oDestination.latitude + ';0'
						})
					]
				}));
				oMap.addVo(new sap.ui.vbm.Routes({
					items: [
						new sap.ui.vbm.Route({
							position: oSource.longitude + ';' + oSource.latitude + ';0;' + oDestination.longitude + ';' +
								oDestination.latitude +
								';0',
							color: 'rgb(92, 186, 230)',
							start: "0",
							end: "1",
							linewidth: "6"
						})
					]
				}));
			}
		}
	});
});