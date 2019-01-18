import { connect } from 'react-redux';
import { Res } from 'components/util/Res';

const mapStateToProps = state => {
    return {
        locale: state.locale,
    };
};

const ResContainer = connect(mapStateToProps)(Res);

export { ResContainer as Res };
