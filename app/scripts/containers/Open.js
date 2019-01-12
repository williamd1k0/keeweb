import { connect } from 'preact-redux';
import { getOpenRows } from '../selectors/open';
import Open from '../components/Open';
import { UiViewSettings } from '../store/ui';
import uiSetView from '../store/ui/set-view';
import toggleSecondRow from '../store/ui-open/toggle-second-row';

const mapStateToProps = state => {
    return {
        secondRowVisible: state.uiOpen.secondRowVisible,
        locale: state.locale,
        canOpen: state.settings.canOpen,
        canOpenKeyFromDropbox: false,
        ...getOpenRows(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClick(e) {
            switch (e.button) {
                case 'more':
                    return dispatch(toggleSecondRow());
                case 'settings':
                    return dispatch(uiSetView(UiViewSettings));
            }
        },
        onFileChange(e) {
            switch (e.button) {
                case 'open':
                    // dispatch(openFile(e.file));
                    break;
            }
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Open);
