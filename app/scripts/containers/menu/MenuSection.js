import { connect } from 'preact-redux';
import { MenuSection } from 'components/menu/MenuSection';
import { ItemSelectors, getSection } from 'selectors/menu';

const mapStateToProps = (state, props) => {
    const section = getSection(state, props);
    const items = section.items || ItemSelectors[section.itemSelector](state);
    return {
        grow: section.grow,
        drag: section.drag,
        scrollable: section.scrollable,
        items,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

const MenuSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuSection);

export { MenuSectionContainer as MenuSection };
