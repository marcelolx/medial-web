import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

class IfAnyGranted extends Component {
  render() {
    const expected = this.props.expected,
    actual = this.props.actual ? Array.isArray(this.props.actual) ? this.props.actual : [this.props.actual] : [];

    let found = false;
    for (var i = 0; i < expected.length; i++) {
      if (actual.indexOf(expected[i]) !== -1) {
        found = true;
        break;
      }
    }
    if (found) {
      return createElement(this.props.element, null, this.props.children);
    } else {
      return this.props.unauthorized;
    }
  }
}

IfAnyGranted.propTypes = {
  expected: PropTypes.array.isRequired, // The expected roles
  actual: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // The actual roles
  element: PropTypes.string, // Type of element to render around the children, defaults to 'div'
  unauthorized: PropTypes.node, // Node to render if the actual roles do not match any the expected
}

IfAnyGranted.defaultProps = {
  element: 'div',
  unauthorized: null,
}

export default IfAnyGranted;