import PropTypes from 'prop-types';
import { capFirst } from 'util/text/format';

const Res = ({ id, locale, capitalize }) => {
    const translation = locale[id];
    if (capitalize) {
        return capFirst(translation);
    }
    return translation;
};

Res.propTypes = {
    id: PropTypes.string.isRequired,
    locale: PropTypes.object.isRequired,
    capitalize: PropTypes.bool,
};

export default Res;
