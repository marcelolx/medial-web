import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

class IfAllGranted extends Component {
  render() {
    const expected = this.props.expected,
    actual = this.props.actual ? Array.isArray(this.props.actual) ? this.props.actual : [this.props.actual] : [];

    for (var i = 0; i < expected.length; i++) {
      if (actual.indexOf(expected[i]) === -1) {
        return this.props.unauthorized;
      }
    }

    return createElement(this.props.element, null, this.props.children);
  }
}

IfAllGranted.propTypes = {
  expected: PropTypes.array.isRequired, // The expected roles
  actual: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // The actual roles
  element: PropTypes.string, // Type of element to render around the children, defaults to 'div'
  unauthorized: PropTypes.node, // Node to render if the actual roles do not match any the expected
}

IfAllGranted.defaultProps = {
  element: 'div',
  unauthorized: null,
}

export default IfAllGranted;