import { connect } from 'react-redux';
import { Details } from 'components/Details';
import { getActiveEntry, getActiveGroup, getActiveFile } from 'selectors/details';

const mapStateToProps = state => {
    const entry = getActiveEntry(state);
    const group = getActiveGroup(state);
    const file = getActiveFile(state);
    return {
        locale: state.locale,
        entry,
        group,
        file,
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
