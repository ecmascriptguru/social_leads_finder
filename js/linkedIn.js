'use strict';

let LinkedInScraper = (function() {
    const init = () => {
        //
    }

    return {
        init: init
    }
})();

(function(window, jQuery) {
    chrome.extension.sendMessage({
        from: "google",
        action: "status"
    }, function(response) {
        if (response.started) {
            LinkedInScraper.init();
        }
    })
})(window, $);