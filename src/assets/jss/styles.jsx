const drawerWidth = 260;


const hexToRgb = input => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};

const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
};

const container = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto'
};

const boxShadow = {
  boxShadow:
    '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
};

const card = {
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  margin: '25px 0',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
  borderRadius: '3px',
  color: 'rgba(0, 0, 0, 0.87)',
  background: '#fff'
};

const defaultFont = {
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  fontWeight: '400',
  lineHeight: '1.5em'
};

const primaryColor = '#00D9C4';
const secondaryColor = '#086EF0';
const warningColor = '#ff9800';
const dangerColor = '#f44336';
const successColor = '#4caf50';
const infoColor = '#EC6745';
const roseColor = '#e91e63';
const grayColor = '#999999';
const grayColorVetor = [
  "#999",
  "#777",
  "#3C4858",
  "#AAAAAA",
  "#D2D2D2",
  "#DDD",
  "#555555",
  "#333",
  "#eee",
  "#ccc",
  "#e4e4e4",
  "#E5E5E5",
  "#f9f9f9",
  "#f5f5f5",
  "#495057",
  "#e7e7e7",
  "#212121",
  "#c8c8c8",
  "#505050"
];
const blackColor = "#000";
const whiteColor = "#FFF";
const twitterColor = "#55acee";
const facebookColor = "#3b5998";
const googleColor = "#dd4b39";
const linkedinColor = "#0976b4";
const pinterestColor = "#cc2127";
const youtubeColor = "#e52d27";
const tumblrColor = "#35465c";
const behanceColor = "#1769ff";
const dribbbleColor = "#ea4c89";
const redditColor = "#ff4500";

const textDangerColor = {
  color: dangerColor,
};

const textInfoColor = {
  color: infoColor,
};

const textSecondaryColor = {
  color: secondaryColor,
};

const textSuccessColor = {
  color: successColor,
};

const textWarningColor = {
  color: warningColor,
};

const drawerMiniWidth = 80;

const primaryBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(0, 217, 196, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 217, 196, 0.2)'
};
const secondaryBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(8, 110, 240, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 7px 8px -5px rgba(8, 110, 240, 0.2)'
};
const infoBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(236, 103, 69, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(236, 103, 69, 0.2)'
};
const successBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)'
};
const warningBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)'
};
const dangerBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)'
};
const roseBoxShadow = {
  boxShadow:
    '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4)'
};

const warningCardHeader = {
  background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
  ...warningBoxShadow
};
const successCardHeader = {
  background: 'linear-gradient(60deg, #66bb6a, #43a047)',
  ...successBoxShadow
};
const dangerCardHeader = {
  background: 'linear-gradient(60deg, #ef5350, #e53935)',
  ...dangerBoxShadow
};
const infoCardHeader = {
  background: 'linear-gradient(60deg, #EC6745, #EC8368)',
  ...infoBoxShadow
};
const primaryCardHeader = {
  background: 'linear-gradient(60deg, #00CDD9, #00D9C4)',
  ...primaryBoxShadow
};
const secondaryCardHeader = {
  background: 'linear-gradient(60deg, #4579ec, #086EF0)',
  ...secondaryBoxShadow
};
const roseCardHeader = {
  background: 'linear-gradient(60deg, #ec407a, #d81b60)',
  ...roseBoxShadow
};

const cardActions = {
  margin: '0 20px 10px',
  paddingTop: '10px',
  borderTop: '1px solid #eeeeee',
  height: 'auto',
  ...defaultFont
};

const cardHeader = {
  margin: '-20px 15px 0',
  borderRadius: '3px',
  padding: '15px'
};

const defaultBoxShadow = {
  border: '0',
  borderRadius: '3px',
  boxShadow:
    '0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  padding: '10px 0',
  transition: 'all 150ms ease 0s'
};

const title = {
  color: '#3C4858',
  textDecoration: 'none',
  fontWeight: '300',
  marginTop: '30px',
  marginBottom: '25px',
  minHeight: '32px',
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  '& small': {
    color: '#777',
    fontWeight: '400',
    lineHeight: '1'
  }
};

const cardTitle = {
  ...title,
  marginTop: '0',
  marginBottom: '3px',
  minHeight: 'auto',
  '& a': {
    ...title,
    marginTop: '.625rem',
    marginBottom: '0.75rem',
    minHeight: 'auto'
  }
};

const cardSubtitle = {
  marginTop: '-.375rem'
};

const cardLink = {
  '& + $cardLink': {
    marginLeft: '1.25rem'
  }
};

const containerFluid = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  '&:before,&:after': {
    display: 'table',
    content: ' '
  },
  '&:after': {
    clear: 'both'
  }
};

export {
  containerFluid,
  drawerWidth,
  transition,
  container,
  boxShadow,
  card,
  defaultFont,
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  primaryBoxShadow,
  secondaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  secondaryCardHeader,
  roseCardHeader,
  cardActions,
  cardHeader,
  defaultBoxShadow,
  title,
  cardTitle,
  cardSubtitle,
  cardLink,
  drawerMiniWidth,
  textSuccessColor,
  textDangerColor,
  textInfoColor,
  textSecondaryColor,
  textWarningColor,
  hexToRgb,
  blackColor,
  whiteColor,
  twitterColor,
  facebookColor,
  googleColor,
  linkedinColor,
  pinterestColor,
  youtubeColor,
  tumblrColor,
  behanceColor,
  dribbbleColor,
  redditColor,
  grayColorVetor
};
