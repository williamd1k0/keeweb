import timeouts from 'const/timeouts';

export function saveAs(blob, name) {
    const link = document.createElement('a');

    link.download = name;
    link.rel = 'noopener';
    link.href = URL.createObjectURL(blob);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
        URL.revokeObjectURL(link.href);
    }, timeouts.LinkDownloadRevoke);
}
