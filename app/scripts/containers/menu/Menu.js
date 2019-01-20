import { connect } from 'preact-redux';
import { Menu } from 'components/menu/Menu';

const mapStateToProps = (state, props) => {
    const { menu } = props;
    return {
        sections: menu.sections,
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
