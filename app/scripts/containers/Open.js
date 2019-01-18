import { connect } from 'react-redux';
import { getOpenRows } from 'selectors/open';
import { getLastFiles } from 'selectors/files';
import { Open } from 'components/Open';
import { setView } from 'store/ui/set-view';
import { toggleSecondRow } from 'store/ui/open/toggle-second-row';
import { saveLastFiles } from 'logic/files/save-last-files';
import { loadFileContent, loadKeyFileContent } from 'logic/ui/open/load-files';
import { loadKeyFileFromDropbox } from 'logic/ui/open/load-key-file-from-dropbox';
import { removeLastFile } from 'logic/ui/open/remove-last-file';
import { resetKeyFile } from 'store/ui/open/reset-key-file';
import { displayLastFile } from 'logic/ui/open/display-last-file';

const mapStateToProps = state => {
    return {
        secondRowVisible: state.uiOpen.secondRowVisible,
        file: state.uiOpen.file,
        keyFile: state.uiOpen.keyFile,
        locale: state.locale,
        canOpen: state.settings.canOpen,
        canRemoveLatest: state.settings.canRemoveLatest,
        canOpenKeyFromDropbox: !!state.settings.dropbox,
        lastFiles: getLastFiles(state),
        rows: getOpenRows(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClick({ button }) {
            switch (button) {
                case 'more':
                    return dispatch(toggleSecondRow());
                case 'settings':
                    return dispatch(setView('settings'));
            }
        },
        onFileClick({ id }) {
            dispatch(displayLastFile(id));
        },
        onFileSelect({ button, file }) {
            switch (button) {
                case 'open':
                    dispatch(loadFileContent(file));
                    break;
                case 'keyfile':
                    dispatch(loadKeyFileContent(file));
                    break;
                default:
                    throw new Error(`Unexpected button: ${button}`);
            }
        },
        onDropboxKeyFileClick() {
            dispatch(loadKeyFileFromDropbox());
        },
        onKeyFileDeselect() {
            dispatch(resetKeyFile());
        },
        onFileDeleteClick({ id }) {
            // TODO: question about in-memory files
            // TODO: question about modified storage files
            dispatch(removeLastFile(id));
        },
    };
};

const OpenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Open);

export { OpenContainer as Open };
