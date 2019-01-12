export const multiSlashRegex = /\/{2,}/g;
export const lastPartRegex = /\/?[^\/\\]+$/;
export const kdbxEndRegex = /\.kdbx$/i;

export function getDataFileName(url) {
    const ix = url.lastIndexOf('/');
    if (ix >= 0) {
        url = url.substr(ix + 1);
    }
    url = url.replace(/\?.*/, '').replace(/\.kdbx/i, '');
    return url;
}

export function isKdbx(url) {
    return url && kdbxEndRegex.test(url);
}

export function fixSlashes(url) {
    return url.replace(multiSlashRegex, '/');
}

export function fileToDir(url) {
    return url.replace(lastPartRegex, '') || '/';
}
