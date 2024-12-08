// utils/urlConstructor.js
export function constructUrl(base, path, query) {
    return `${base}${path}?sysparm_query=${query}`;
}