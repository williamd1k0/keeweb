import { connect } from 'react-redux';
import Res from 'components/util/Res';

const mapStateToProps = state => {
    return {
        locale: state.locale,
    };
};

export default connect(mapStateToProps)(Res);
