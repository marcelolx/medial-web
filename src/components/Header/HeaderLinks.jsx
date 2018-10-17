import React from "react";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ExitToApp from "@material-ui/icons/ExitToApp";

import Button from "./../CustomButtons/Button";

import headerLinksStyle from "./../../assets/jss/components/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
        block={true}
          color="transparent"
          aria-label="Person"
          className={classes.buttonLink}
        ><span>Sair  </span>
          <ExitToApp
            className={
              classes.headerLinksSvg +
              " " +
              (classes.links)
            }
          />
        </Button>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
};

export default withStyles(headerLinksStyle)(HeaderLinks);



// WEBPACK FOOTER //
// ./src/components/Header/HeaderLinks.jsx