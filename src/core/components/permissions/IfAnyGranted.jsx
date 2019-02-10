import PropTypes from 'prop-types';

const IfAnyGranted = (props) => {
  const expected = props.expected;
  if (expected.includes(props.actual)) {
    return  props.children;
  } else {
    return props.unauthorized;
  }
}

IfAnyGranted.propTypes = {
  expected: PropTypes.array.isRequired, // The expected roles
  actual: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]), // The actual roles
  element: PropTypes.string, // Type of element to render around the children, defaults to 'div'
  unauthorized: PropTypes.node, // Node to render if the actual roles do not match any the expected
}

IfAnyGranted.defaultProps = {
  element: 'webview',
  unauthorized: null,
}

export default IfAnyGranted;