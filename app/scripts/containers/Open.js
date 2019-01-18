import { connect } from 'react-redux';
import { getOpenRows } from 'selectors/open';
import { getLastFiles } from 'selectors/files';
import { Open } from 'components/Open';
import { setView } from 'store/ui/set-view';
import { toggleSecondRow } from 'store/ui/open/toggle-second-row';
import { saveLastFiles } from 'logic/files/save-last-files';
import { loadFileContent, loadKeyFileContent } from 'logic/ui/open/load-file-content';
import { removeLastFile } from 'store/files/remove-last-file';

const mapStateToProps = state => {
    return {
        secondRowVisible: state.uiOpen.secondRowVisible,
        file: state.uiOpen.file,
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
        onClick(e) {
            switch (e.button) {
                case 'more':
                    return dispatch(toggleSecondRow());
                case 'settings':
                    return dispatch(setView('settings'));
            }
        },
        onFileClick() {},
        onFileSelected(e) {
            switch (e.button) {
                case 'open':
                    dispatch(loadFileContent(e.file));
                    break;
                case 'keyfile':
                    dispatch(loadKeyFileContent(e.file));
                    break;
                default:
                    throw new Error(`Unexpected button: ${e.button}`);
            }
        },
        onDropboxKeyFileClick() {
            throw new Error('dropbox');
        },
        onFileDeleteClick({ id }) {
            // TODO: question about in-memory files
            dispatch(removeLastFile(id));
            dispatch(saveLastFiles());
        },
    };
};

const OpenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Open);

export { OpenContainer as Open };
