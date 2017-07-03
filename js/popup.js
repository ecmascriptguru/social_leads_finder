'use strict';

let Popup = (function() {
	let _bg = chrome.extension.getBackgroundPage().Background;
	let _keyword = JSON.parse(localStorage._keyword || JSON.stringify(""));
	let $keyword = $("#keyword");
	let _maxPages = JSON.parse(localStorage._max_pages || JSON.stringify(0));
	let $maxPages = $("#max-pages");

	/**
	 * Binding all of events.
	 */
	const initEvents = () => {
		$(document)
		.on("change", "#keyword", (event) => {
			_keyword = event.target.value;
			localStorage._keyword = JSON.stringify(_keyword);
		})
		.on("change", "max-pages", (event) => {
			_maxPages = parseInt(event.target.value || 0);
			localStorage._max_pages = JSON.stringify(_maxPages);
		}).on("click", "#start", (event) => {
			_bg.start(_keyword, () => {
				//
			});
		})
	}

	const showStopPanel = () => {
		//
	}

	const showStartPanel = () => {
		//
	}

	/**
	 * Initialize
	 * @return {void}
	 */
	const init = () => {
		initEvents();
		$keyword.val(_keyword);
		$maxPages.val(_maxPages);
	}

	return {
		init: init
	}
})();

(function(window, jQuery) {
    Popup.init();
})(window, $);