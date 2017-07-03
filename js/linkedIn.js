'use strict';

let LinkedInScraper = (function() {
    let _profileTimer = null;
    const parseUrls = () => {
        let profiles = $("ul.results-list li.search-result");
        let urls = [];

        for (let i = 0; i < profiles.length; i ++) {
            let url = profiles.eq(i).find(".search-result__result-link")[0].href;
            urls.push(url);
        }

        chrome.runtime.sendMessage({
            from: "linkedin",
            action: "urls",
            urls: urls
        }, () => {
            //
        })
    }

    const parseProfile = () => {
        let name = $("h1.pv-top-card-section__name").text();
        let headline = $("h2.pv-top-card-section__headline").text();
        let location = $("h3.pv-top-card-section__location").text();
        let $webSites = $(".ci-websites .pv-contact-info__ci-container a.pv-contact-info__action");
        let webSites = [];
        for (let i = 0; i < $webSites.length; i ++) {
            webSites.push($webSites.eq(i)[0].href);
        }
        webSites = webSites.join("|");
        let $emails = $(".ci-email .pv-contact-info__contact-item");
        let emails = [];
        for (let i = 0; i < $emails.length; i ++) {
            emails.push($emails.eq(i).text());
        }
        emails = emails.join("|");
        
        chrome.runtime.sendMessage({
            from: "linkedin",
            action: "profile",
            profile: {
                name, headline, location, webSites, emails
            }
        })
    }

    const init = (step) => {
        if (step == "search" && window.location.pathname.indexOf("/search/results/index") == 0) {
            $(window).scrollTop($(document).height());

            window.setTimeout(() => {
                parseUrls();
            }, 500);
        } else if (step == "profile" && window.location.pathname.indexOf("/in/") == 0) {
            $(window).scrollTop($(document).height());
            
            // document.querySelector("button.contact-see-more-less").click()

            _profileTimer = window.setInterval(() => {
                if ($(".contact-see-more-less").length > 0) {
                    clearInterval(_profileTimer);
                    _profileTimer = null;
                    $(".contact-see-more-less").click();
                    parseProfile();
                }
            }, 1000);
        }
    }

    return {
        init: init
    }
})();

(function(window, jQuery) {
    chrome.extension.sendMessage({
        from: "linkedin",
        action: "status"
    }, function(response) {
        if (response.started) {
            LinkedInScraper.init(response.step);
        }
    })
})(window, $);