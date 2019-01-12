import PropTypes from 'prop-types';

const Res = ({ id, locale }) => locale[id];

Res.propTypes = {
    id: PropTypes.string.isRequired,
    locale: PropTypes.object.isRequired,
};

export default Res;
