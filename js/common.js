'use strict';

let SocialScraper = (function() {
    let _keyword = JSON.parse(localStorage._keyword || "null") || "";
    let _searchUrl = `https://www.linkedin.com/search/results/index/?origin=GLOBAL_SEARCH_HEADER&keywords=${_keyword}`

    /**
     * Initialize
     * @return {void}
     */
    const init = () => {
        //
    }

    /**
     * Getter or Setter function of keyword parameter.
     * @param {string} value 
     * @return {string}
     */
    const keyword = (value) => {
        if (!value) {
            return value;
        } else {
            _keyword = value;
            localStorage._keyword = JSON.stringify(value);
        }
    }

    /**
     * Getting the search  url made from keyword.
     * @return {string}
     */
    const getUrl = () => {
        return `https://www.linkedin.com/search/results/index/?origin=GLOBAL_SEARCH_HEADER&keywords=${_keyword}`;
    }

    return {
        init: init,
        keyword: keyword,
        url: getUrl
    }
})();