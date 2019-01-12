import kdbxweb from 'kdbxweb';

export function toDataUrl(iconData) {
    return iconData ? 'data:image/png;base64,' + kdbxweb.ByteUtils.bytesToBase64(iconData) : null;
}
