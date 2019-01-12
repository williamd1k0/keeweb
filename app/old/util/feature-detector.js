const FeatureDetector = {
    actionShortcutSymbol: function(formatting) {
        return this.isMac ? '⌘' : formatting ? '<span class="thin">ctrl + </span>' : 'ctrl-';
    },
    altShortcutSymbol: function(formatting) {
        return this.isMac ? '⌥' : formatting ? '<span class="thin">alt + </span>' : 'alt-';
    },
    globalShortcutSymbol: function(formatting) {
        return this.isMac ? '⌃⌥' : formatting ? '<span class="thin">shift+alt+</span>' : 'shift-alt-';
    },
    globalShortcutIsLarge: function() {
        return !this.isMac;
    },
    screenshotToClipboardShortcut: function() {
        if (this.isiOS) {
            return 'Sleep+Home';
        }
        if (this.isMobile) {
            return '';
        }
        if (this.isMac) {
            return 'Command-Shift-Control-4';
        }
        if (this.isWindows) {
            return 'Alt+PrintScreen';
        }
        return '';
    },
    supportsTitleBarStyles: function() {
        return this.isMac;
    },
    hasUnicodeFlags: function() {
        return this.isMac;
    },
    getBrowserCssClass: function() {
        if (window.chrome && window.chrome.webstore) {
            return 'chrome';
        }
        if (window.navigator.userAgent.indexOf('Edge/') > -1) {
            return 'edge';
        }
        return '';
    },
};

module.exports = FeatureDetector;
