TouchUI.prototype.core.bridge = function() {
	var self = this;

	this.core.bridge = {

		allViewModels: {},
		TOUCHUI_REQUIRED_VIEWMODELS: [
			"terminalViewModel",
			"connectionViewModel",
			"settingsViewModel",
			"softwareUpdateViewModel",
			"controlViewModel",
			"gcodeFilesViewModel",
			"navigationViewModel",
			"pluginManagerViewModel",
			"temperatureViewModel",
			"loginStateViewModel"
		],
		TOUCHUI_ELEMENTS: [
			"#touchui_settings_dialog",
			"#settings_plugin_touchui",
			"#navbar_plugin_touchui"
		],

		domLoading: function() {
			if (self.isActive()) {
				self.scroll.beforeLoad.call(self);
				self.DOM.init.call(self);
			}
		},

		domReady: function() {
			if (self.isActive()) {

				if($("#gcode").length > 0) {
					self.core.bridge.TOUCHUI_REQUIRED_VIEWMODELS = self.core.bridge.TOUCHUI_REQUIRED_VIEWMODELS.concat(["gcodeViewModel"]);
				}

				self.components.dropdown.init.call(self);
				self.components.fullscreen.init.call(self);
				self.components.keyboard.init.call(self);
				self.components.modal.init.call(self);
				self.components.touchList.init.call(self);
				self.components.slider.init.call(self);

				self.scroll.init.call(self);
				self.plugins.tempsGraph.call(self);
			}
		},

		koStartup: function TouchUIViewModel(viewModels) {
			self.core.bridge.allViewModels = _.object(self.core.bridge.TOUCHUI_REQUIRED_VIEWMODELS, viewModels);
			self.knockout.isLoading.call(self, self.core.bridge.allViewModels);
			return self;
		}
	}

	return this.core.bridge;
}
