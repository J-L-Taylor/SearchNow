// utils/urlConstructor.ts
export function constructUrl(base: string, path: string, query: string): string {
    return `${base}${path}?sysparm_query=${query}`;
}