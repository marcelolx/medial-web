import { Component, createElement } from 'react';
import PropTypes from 'prop-types';

class IfGranted extends Component {
  render() {
    const expected = this.props.expected,
    actual = this.props.actual ? Array.isArray(this.props.actual) ? this.props.actual : [this.props.actual] : [];

    if (actual.indexOf(expected) !== -1) {
      return createElement(this.props.element, null, this.props.children);
    } else {
      return this.props.unauthorized;
    }
  }
}

IfGranted.propTypes = {
  expected: PropTypes.string, // The expected role
  actual: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // The actual roles
  element: PropTypes.string, // Type of element to render around the children, defaults to 'div'
  unauthorized: PropTypes.node, // Node to render if the actual roles do not match any the expected
}

IfGranted.defaultProps = {
  element: 'div',
  unauthorized: null,
}

export default IfGranted;