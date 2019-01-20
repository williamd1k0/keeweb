import { connect } from 'preact-redux';
import { Menu } from 'components/menu/Menu';
import { getMenuSections } from 'selectors/menu';

const mapStateToProps = (state, props) => {
    const { menu } = props;
    return {
        menu,
        sections: getMenuSections(state, props),
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

export { MenuContainer as Menu };
