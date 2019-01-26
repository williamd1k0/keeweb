import { connect } from 'react-redux';
import { List } from 'components/List';

const mapStateToProps = state => {
    return {
        items: [],
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

const ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export { ListContainer as List };
