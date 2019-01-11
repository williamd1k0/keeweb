import { connect } from 'preact-redux';
import base from '../../../locales/base.json';
import localeDE from '../../../locales/de-DE.json';
import localeFR from '../../../locales/fr-FR.json';
import Res from '../../components/util/Res';

const locales = {
    en: base,
    'de-DE': localeDE,
    'fr-FR': localeFR,
};

const mapStateToProps = state => {
    return {
        locale: locales[state.env.locale] || base
    };
};

export default connect(
    mapStateToProps
)(Res);
