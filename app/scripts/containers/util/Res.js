import { connect } from 'preact-redux';
import Res from '../../components/util/Res';

const mapStateToProps = state => {
    return {
        locale: state.locale,
    };
};

export default connect(mapStateToProps)(Res);
