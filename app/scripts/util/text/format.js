export function pad(num, digits) {
    let str = num.toString();
    while (str.length < digits) {
        str = '0' + str;
    }
    return str;
}

export function padStr(str, len) {
    while (str.length < len) {
        str += ' ';
    }
    return str;
}

export function dtStr(dt, locale) {
    if (typeof dt === 'number') {
        dt = new Date(dt);
    }
    return dt
        ? dStr(dt, locale) +
              ' ' +
              pad(dt.getHours(), 2) +
              ':' +
              pad(dt.getMinutes(), 2) +
              ':' +
              pad(dt.getSeconds(), 2)
        : '';
}

export function dStr(dt, locale) {
    if (typeof dt === 'number') {
        dt = new Date(dt);
    }
    return dt
        ? dt.getDate() + ' ' + locale.monthsShort[dt.getMonth()] + ' ' + dt.getFullYear()
        : '';
}

export function capFirst(str) {
    if (!str) {
        return '';
    }
    return str[0].toUpperCase() + str.substr(1);
}

export function dtStrFs(dt) {
    if (typeof dt === 'number') {
        dt = new Date(dt);
    }
    return dt
        ? dt.getFullYear() +
              '-' +
              pad(dt.getMonth() + 1, 2) +
              '-' +
              pad(dt.getDate(), 2) +
              'T' +
              pad(dt.getHours(), 2) +
              '-' +
              pad(dt.getMinutes(), 2) +
              '-' +
              pad(dt.getSeconds(), 2)
        : '';
}
