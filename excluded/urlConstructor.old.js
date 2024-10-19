// utils/urlConstructor.js
function constructUrl(base, path, query) {
    return `${base}${path}?sysparm_query=${query}`;
}

module.exports = {
    constructUrl: constructUrl
};