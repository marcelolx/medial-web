import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor
} from '../../assets/jss/styles';

const styles = ({
  primary: {
    color: primaryColor
  },
  secondary: {
    color: secondaryColor
  },
  warning: {
    color: warningColor
  },
  danger: {
    color: dangerColor
  },
  success: {
    color: successColor
  },
  info: {
    color: infoColor
  },
  rose: {
    color: roseColor
  },
  gray: {
    color: grayColor
  },
  fullWidth: {
    width: '100%'
  },
  halfWidth: {
    width: '50%'
  }
});

function CustomChip({ ...props }) {  
  
  const {
    classes,
    color,
    className,
    width,
    ...rest
  } = props;

  const chipClasses = classNames({
    [classes[color]]: color,
    [className]: className,
    [classes[width]]: width
  });

  return (
    <Chip { ...rest } className={chipClasses} />
  );
}

CustomChip.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  className: PropTypes.string,
  width: PropTypes.PropTypes.oneOf([
    "fullWidth",
    "halfWidth"
  ])
};

export default withStyles(styles)(CustomChip);