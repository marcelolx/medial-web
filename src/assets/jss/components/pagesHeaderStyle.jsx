// ##############################
// // // Pages Header styles
// #############################

import {
  container,
  defaultFont,
  grayColorVetor,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  boxShadow,
  drawerWidth,
  transition
} from './../styles';

const pagesHeaderStyle = theme => ({
  appBar: {
    boxShadow: 'none',
    width: '100%',
    zIndex: '1029',
    color: '#000',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '50px',
    display: 'block'
  },
  container: {
    ...container,
    maxHeight: '50px'
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: '30px',
    fontSize: '30px',
    borderRadius: '3px',
    textTransform: 'none',
    color: grayColorVetor[12],
    '&:hover,&:focus': {
      background: 'transparent',
      color: grayColorVetor[9]
    }
  },
  appResponsive: {
    top: '8px'
  },
  primary: {
    backgroundColor: primaryColor,
    color: '#333',
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor,
    color: '#333',
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor,
    color: '#333',
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor,
    color: '#333',
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor,
    color: '#333',
    ...defaultBoxShadow
  },
  list: {
    ...defaultFont,
    fontSize: '14px',
    margin: 0,
    marginRight: '-15px',
    paddingLeft: '0',
    listStyle: 'none',
    color: '#333',
    paddingTop: '0',
    paddingBottom: '0'
  },
  listItem: {
    float: 'left',
    position: 'relative',
    display: 'block',
    width: 'auto',
    margin: '0',
    padding: '0',
    [theme.breakpoints.down('sm')]: {
      zIndex: '999',
      width: '100%',
      paddingRight: '15px'
    }
  },
  navLink: {
    color:grayColorVetor[5],
    margin: '0 5px',
    paddingTop: '15px',
    paddingBottom: '15px',
    fontWeight: '500',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    lineHeight: '20px',
    position: 'relative',
    display: 'block',
    padding: '10px 15px',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      color: grayColorVetor[7],
    },
    '&:hover,&:focus': {
      color: grayColorVetor[9],
      background: 'rgba(200, 200, 200, 0.2)'
    }
  },
  listItemIcon: {
    marginRight: '3px',
    verticalAlign: 'middle',
    color: 'inherit',
  },
  listItemText: {
    flex: 'none',
    padding: '0',
    minWidth: '0',
    margin: 0,
    display: 'inline-block',
    position: 'relative',
    whiteSpace: 'nowrap'
  },
  navLinkActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  drawerPaper: {
    border: 'none',
    bottom: '0',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    ...boxShadow,
    width: drawerWidth,
    ...boxShadow,
    position: 'fixed',
    display: 'block',
    top: '0',
    height: '100vh',
    right: '0',
    left: 'auto',
    visibility: 'visible',
    overflowY: 'visible',
    borderTop: 'none',
    textAlign: 'left',
    paddingRight: '0px',
    paddingLeft: '0',
    ...transition,
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '',
      display: 'block',
      top: '0'
    },
    '&:after': {
      background: '#ccc',
      opacity: '.8'
    }
  },
  sidebarButton: {
    color: grayColorVetor[12],
    '&,&:hover,&:focus': {
      color: grayColorVetor[12]
    },
    top: '-2px'
  }
});

export default pagesHeaderStyle;
