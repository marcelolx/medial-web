import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, Collapse, withStyles, List } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListOutlined from '@material-ui/icons/ListOutlined';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends Component {

  state = {
    open: true,
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render(){
    const { classes, items } = this.props;    

    return(
      <React.Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <ListOutlined />
          </ListItemIcon>
          <ListItemText inset primary={items.name} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {
            items.collapseItems.map((item, key) => {
              return(
                <List key={key} component="div" disablePadding>
                  <ListItem component={NavLink} exact to={item.path} button className={classes.nested}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText inset primary={item.name} />
                  </ListItem>
                </List>   
              );
            })
          }
        </Collapse>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NestedList);