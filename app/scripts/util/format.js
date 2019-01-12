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

export function dtStr(dt) {
    if (typeof dt === 'number') {
        dt = new Date(dt);
    }
    return dt
        ? this.dStr(dt) +
              ' ' +
              this.pad(dt.getHours(), 2) +
              ':' +
              this.pad(dt.getMinutes(), 2) +
              ':' +
              this.pad(dt.getSeconds(), 2)
        : '';
}

export function dStr(dt, locale) {
    if (typeof dt === 'number') {
        dt = new Date(dt);
    }
    return dt ? dt.getDate() + ' ' + locale.monthsShort[dt.getMonth()] + ' ' + dt.getFullYear() : '';
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
              this.pad(dt.getMonth() + 1, 2) +
              '-' +
              this.pad(dt.getDate(), 2) +
              'T' +
              this.pad(dt.getHours(), 2) +
              '-' +
              this.pad(dt.getMinutes(), 2) +
              '-' +
              this.pad(dt.getSeconds(), 2)
        : '';
}
