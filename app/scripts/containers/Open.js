import { connect } from 'preact-redux';
import { getOpenRows } from '../selectors/open';
import Open from '../components/Open';
import openFile from '../logic/files/openFile';
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
        onMoreClick() {
            dispatch(toggleSecondRow());
        },
        onClick(e) {
            console.log('onClick', e);
        },
        onFileChange(e) {
            switch (e.button) {
                case 'open':
                    dispatch(openFile(e.file));
                    break;
            }
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Open);
