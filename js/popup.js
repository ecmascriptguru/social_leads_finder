'use strict';

let Popup = (function() {
	let _bg = chrome.extension.getBackgroundPage().Background;
	let _keyword = JSON.parse(localStorage._keyword || JSON.stringify(""));
	let $keyword = $("#keyword");
	let _maxPages = JSON.parse(localStorage._max_pages || JSON.stringify(0));
	let $maxPages = $("#max-pages");

	let $startButton = $("#start");
	let $stopButton = $("#stop");

	/**
	 * Start the automatic harvesting leads.
	 */
	const start = () => {
		_bg.start(_keyword, () => {
			showStopPanel();
		});
	}

	/**
	 * Stop the BOT in progress 
	 */
	const stop = () => {
		_bg.stop(() => {
			showStartPanel();
		});
	}

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
		})
		.on("click", "#start", (event) => {
			start();
		})
		.on("click", "#stop", (event) => {
			stop();
		})
	}

	/**
	 * Showing the panel to Stop BOT.
	 */
	const showStopPanel = () => {
		$("#start-panel").hide();
		$("#stop-panel").show();
	}

	/**
	 * Show the panel to start BOT
	 */
	const showStartPanel = () => {
		$("#stop-panel").hide();
		$("#start-panel").show();
	}

	/**
	 * Initialize
	 * @return {void}
	 */
	const init = () => {
		initEvents();
		$keyword.val(_keyword);
		$maxPages.val(_maxPages);

		let curState = _bg.state();

		if (curState.started) {
			showStopPanel();
		} else {
			showStartPanel();
		}
	}

	return {
		init: init
	}
})();

(function(window, jQuery) {
    Popup.init();
})(window, $);