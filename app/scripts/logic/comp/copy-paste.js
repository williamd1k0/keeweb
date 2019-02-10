import { Launcher } from 'launcher';
import { store } from 'store';

const simpleCopy = !!(Launcher && Launcher.clipboardSupported);

export function copySelectedText(text) {
    if (simpleCopy) {
        const state = store.getState();
        Launcher.setClipboardText(text);
        const clipboardSeconds = state.settings.clipboardSeconds;
        if (clipboardSeconds > 0) {
            const clearClipboard = () => {
                if (Launcher.getClipboardText() === text) {
                    Launcher.clearClipboardText();
                }
            };
            // Backbone.on('main-window-will-close', clearClipboard); // TODO
            setTimeout(() => {
                clearClipboard();
                // Backbone.off('main-window-will-close', clearClipboard); // TODO
            }, clipboardSeconds * 1000);
        }
        return { success: true, seconds: clipboardSeconds };
    } else {
        try {
            if (document.execCommand('copy')) {
                return { success: true };
            }
            return false;
        } catch (e) {
            return false;
        }
    }
}

// function createHiddenInput(text) {
//     const hiddenInput = $('<input/>')
//         .val(text)
//         .attr({ type: 'text', class: 'hide-by-pos' })
//         .appendTo(document.body);
//     hiddenInput[0].selectionStart = 0;
//     hiddenInput[0].selectionEnd = text.length;
//     hiddenInput.focus();
//     hiddenInput.on({
//         'copy cut paste': function() {
//             setTimeout(() => hiddenInput.blur(), 0);
//         },
//         blur: function() {
//             hiddenInput.remove();
//         },
//     });
// }
