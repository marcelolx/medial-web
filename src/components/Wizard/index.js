import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../CustomButtons/Button';
import Card from '../Card/Card';
import wizardStyle from '../../assets/jss/components/wizardStyle';

function findItemToRemove(stepId, allStates) {
  return Object.keys(allStates).filter(
    function(key) {
      return (Object.keys(allStates[key]).filter(
        function(prop) {
          return prop === stepId;
        }
      ).length === 1)
    }
  );  
}
class Wizard extends Component {

  constructor(props) {
    super(props);
    var width;
    if (this.props.steps.length === 1) {
      width = "100%";
    } else {
      if (window.innerWidth < 600) {
        if (this.props.steps.length !== 3) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      } else {
        if (this.props.steps.length === 2) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      }
    }

    this.state = {
      currentStep: 0,
      color: this.props.color,
      nextButton: this.props.steps.length > 1,
      previousButton: false,
      finishButton: this.props.steps.length === 1,
      width: width,
      movingTabStyle: {
        transition: "transform 0s"
      },
      allStates: {}
    };
    
    this.navigationStepChange = this.navigationStepChange.bind(this);
    this.refreshAnimation = this.refreshAnimation.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.finishButtonClick = this.finishButtonClick.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
  }

  componentDidMount() {
    this.refreshAnimation(0);
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  updateWidth() {
    this.refreshAnimation(this.state.currentStep);
  }

  navigationStepChange(key) {
    if (this.props.tabNavigation && this.props.steps) {
      var validationState = true;
      if (key > this.state.currentStep) {
        for (var i = this.state.currentStep; i < key; i++) {
          if (this[this.props.steps[i].stepId].sendState !== undefined) {            
            const index = (this.state.allStates[0] !== undefined) ? 
              findItemToRemove(this.props.steps[i].stepId, this.state.allStates) : [];

            const newAllStates = [...this.state.allStates];

            if (index.length > 0) {
              newAllStates.splice(index[0], 1);
            }
            
            this.setState({
              allStates: [
                ...newAllStates,
                {
                  [this.props.steps[i].stepId]: this[this.props.steps[i].stepId].sendState()
                }
              ]
            });
          }
          if (
            this[this.props.steps[i].stepId].isValidated !== undefined &&
            this[this.props.steps[i].stepId].isValidated() === false
          ) {
            validationState = false;
            break;
          }
        }
      }
      if (validationState) {
        this.setState({
          currentStep: key,
          nextButton: this.props.steps.length > key + 1 ? true : false,
          previousButton: key > 0 ? true : false,
          finishButton: this.props.steps.length === key + 1 ? true : false
        });
        this.refreshAnimation(key);
      }
    }
  }

  nextButtonClick() {
    if (
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !== undefined &&
          this[this.props.steps[this.state.currentStep].stepId].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated === undefined)) ||
      this.props.validate === undefined
    ) {
      if (this[this.props.steps[this.state.currentStep].stepId].sendState !== undefined) {
        const index = (this.state.allStates[0] !== undefined) ? 
          findItemToRemove(this.props.steps[this.state.currentStep].stepId, this.state.allStates) : [];
        
        const newAllStates = (this.state.allStates.length !== undefined) ? [...this.state.allStates] : [];

        if (index.length > 0) {
          newAllStates.splice(index[0], 1);
        }

        this.setState({
          allStates: [
            ...newAllStates,
            {
              [this.props.steps[this.state.currentStep].stepId]: this[this.props.steps[this.state.currentStep].stepId].sendState()
            }
          ]
        });
      }
      var key = this.state.currentStep + 1;
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      this.refreshAnimation(key);
    }
  }

  previousButtonClick() {
    if (
      this[this.props.steps[this.state.currentStep].stepId].sendState !==
      undefined
    ) {
      const index = (this.state.allStates[0] !== undefined) ? 
        findItemToRemove(this.props.steps[this.state.currentStep].stepId, this.state.allStates) : [];

      const newAllStates = [...this.state.allStates];

      if (index.length > 0) {
        newAllStates.splice(index[0], 1);
      }

      this.setState({
        allStates: [
          ...newAllStates,
          {
            [this.props.steps[this.state.currentStep].stepId]: this[this.props.steps[this.state.currentStep].stepId].sendState()
          }
        ]
      });
    }
    var key = this.state.currentStep - 1;
    if (key >= 0) {
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      this.refreshAnimation(key);
    }
  }

  finishButtonClick() {
    if (
      this.props.validate &&
      ((this[this.props.steps[this.state.currentStep].stepId].isValidated !== undefined &&
        this[this.props.steps[this.state.currentStep].stepId].isValidated()) ||
        this[this.props.steps[this.state.currentStep].stepId].isValidated === undefined) &&
      this.props.finishButtonClick !== undefined
    ) {
      this.props.finishButtonClick(this.state.allStates);
    }
  }

  refreshAnimation(index) {
    var total = this.props.steps.length;
    var li_width = 100 / total;
    var total_steps = this.props.steps.length;
    var move_distance = this.refs.wizard.children[0].offsetWidth / total_steps;
    var index_temp = index;
    var vertical_level = 0;

    var mobile_device = window.innerWidth < 600 && total > 3;

    if (mobile_device) {
      move_distance = this.refs.wizard.children[0].offsetWidth / 2;
      index_temp = index % 2;
      li_width = 50;
    }

    this.setState({ width: li_width + "%" });

    var step_width = move_distance;
    move_distance = move_distance * index_temp;

    var current = index + 1;

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8;
    } else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
    ) {
      move_distance += 8;
    }

    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10);
      vertical_level = vertical_level * 38;
    }
    var movingTabStyle = {
      width: step_width,
      transform:
        "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
      transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
    };
    this.setState({ movingTabStyle: movingTabStyle });
  }

  render() {
    const { classes, title, subtitle, color, steps } = this.props;
    return (
      <div className={classes.wizardContainer} ref="wizard">
        <Card className={classes.card}>
          <div className={classes.wizardHeader}>
            <h3 className={classes.title}>{title}</h3>
            <h5 className={classes.subtitle}>{subtitle}</h5>
          </div>
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav}>
              {steps.map((prop, key) => {
                return (
                  <li
                    className={classes.steps}
                    key={key}
                    style={{ width: this.state.width }}
                  >
                    <span
                      className={classes.stepsAnchor}
                      onClick={() => this.navigationStepChange(key)}
                    >
                      {prop.stepName}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div
              className={classes.movingTab + " " + classes[color]}
              style={this.state.movingTabStyle}
            >
              {steps[this.state.currentStep].stepName}
            </div>
          </div>
          <div className={classes.content}>
            {steps.map((prop, key) => {
              const stepContentClasses = cx({
                [classes.stepContentActive]: this.state.currentStep === key,
                [classes.stepContent]: this.state.currentStep !== key
              });              
              return (
                <div className={stepContentClasses} key={key}>
                  <prop.stepComponent
                    innerRef={node => (this[prop.stepId] = node)}
                    allStates={this.state.allStates}
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.footer}>
            <div className={classes.left}>
              {this.state.previousButton ? (
                <Button
                  className={this.props.previousButtonClasses}
                  onClick={() => this.previousButtonClick()}
                >
                  {this.props.previousButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.right}>
              {this.state.nextButton ? (
                <Button
                  color="secondary"
                  className={this.props.nextButtonClasses}
                  onClick={() => this.nextButtonClick()}
                >
                  {this.props.nextButtonText}
                </Button>
              ) : null}
              {this.state.finishButton ? (
                <Button
                  color="secondary"
                  className={this.finishButtonClasses}
                  onClick={() => this.finishButtonClick()}
                >
                  {this.props.finishButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.clearfix} />
          </div>
        </Card>
      </div>
    );
  }
}

Wizard.defaultProps = {
  color: "secondary",
  title: "Title",
  subtitle: "Default subtitle",
  previousButtonText: "Anterior",
  previousButtonClasses: "",
  nextButtonClasses: "",
  nextButtonText: "Próximo",
  finishButtonClasses: "",
  finishButtonText: "Finalizar",
  tabNavigation: false,
};

Wizard.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.func.isRequired,
      stepId: PropTypes.string.isRequired
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  previousButtonClasses: PropTypes.string,
  previousButtonText: PropTypes.string,
  nextButtonClasses: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonClasses: PropTypes.string,
  finishButtonText: PropTypes.string,
  finishButtonClick: PropTypes.func,
  validate: PropTypes.bool,
  tabNavigation: PropTypes.bool,  
};

export default withStyles(wizardStyle)(Wizard);