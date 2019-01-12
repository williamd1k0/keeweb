import { connect } from 'preact-redux';
import { getOpenRows } from '../selectors/open';
import Open from '../components/Open';

const mapStateToProps = state => {
    return { ...getOpenRows(state) };
};

const mapDispatchToProps = dispatch => {
    return {
        onClick(e) {
            console.log('onClick', e);
        },
        onFileChange(e) {
            console.log('onFileChange', e);
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Open);
