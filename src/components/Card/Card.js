import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import cardStyle from "../../assets/jss/components/cardStyle";

function Card({ ...props }) {
  const {
    classes,
    className,
    children,
    plain,
    profile,
    chart,
    minHeight,
    ...rest
  } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [classes.cardMinHeight]: minHeight,
    [className]: className !== undefined
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  chart: PropTypes.bool,
  minHeight: PropTypes.bool
};

export default withStyles(cardStyle)(Card);