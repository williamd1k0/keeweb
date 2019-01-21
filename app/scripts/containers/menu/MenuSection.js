import { connect } from 'react-redux';
import { MenuSection } from 'components/menu/MenuSection';
import { ItemSelectors } from 'selectors/menu';

const mapStateToProps = (state, props) => {
    const { section } = props;
    const itemSelector = ItemSelectors[section.itemSelector || 'self'];
    return {
        grow: section.grow,
        drag: section.drag,
        scrollable: section.scrollable,
        items: itemSelector(state, props),
    };
};

const mapDispatchToProps = () => {
    return {};
};

const MenuSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuSection);

export { MenuSectionContainer as MenuSection };
