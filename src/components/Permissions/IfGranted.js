import { createElement } from 'react';
import PropTypes from 'prop-types';

const IfGranted = (props) => {
  const expected = props.expected,
  actual = props.actual ? Array.isArray(props.actual) ? props.actual : [props.actual] : [];

  if (actual.indexOf(expected) !== -1) {
    return createElement(props.element, null, props.children);
  } else {
    return props.unauthorized;
  }
}

IfGranted.propTypes = {
  expected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // The expected role
  actual: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]), // The actual roles
  element: PropTypes.string, // Type of element to render around the children, defaults to 'div'
  unauthorized: PropTypes.node, // Node to render if the actual roles do not match any the expected
}

IfGranted.defaultProps = {
  element: 'div',
  unauthorized: null,
}

export default IfGranted;