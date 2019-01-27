import { connect } from 'react-redux';
import { Details } from 'components/Details';
import { getActiveEntry } from 'selectors/details';

const mapStateToProps = state => {
    const entry = getActiveEntry(state);
    return {
        locale: state.locale,
        entry,
    };
};

const mapDispatchToProps = () => {
    return {};
};

const DetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Details);

export { DetailsContainer as Details };
