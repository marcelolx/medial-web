
import React from 'react'
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Toolbar, withStyles, Typography } from '@material-ui/core';


const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});


class ListUsersToolbar extends React.Component {


  render() {
    const { classes } = this.props;
    
    return (
      <Toolbar>
        <div className={classes.title}>

          <Typography variant='title' id='tableTitle'>
            Lista de usuários ativos
          </Typography>

        </div>

      </Toolbar>
    )
  }
};


export default withStyles(toolbarStyles)(ListUsersToolbar);