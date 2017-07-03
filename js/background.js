'use strict';

let Background = (function() {

	/**
	 * Start the automatic process. This will be executed by "Start" button on popup screen.
	 * @param {string} keyword 
	 * @return {void}
	 */
	const start = (keyword, callback) => {
		if (typeof callback === "function") {
			callback();
		}
	}

	/**
	 * Initializer.
	 */
	const init = () => {
		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			switch(request.from) {
				case "popup":
					//	To do 
					break;

				case "linkedIn":
					// 	To do
					break;

				default:
					console.log("Unknown message arrived.");
					break;
			}
		});
	}

	return {
		init: init,
		start: start
	};
})();

(function(window, jQuery) {
	window.Background = Background;
	window.Background.init();
})(window, $);