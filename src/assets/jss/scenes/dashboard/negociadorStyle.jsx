
import {
  cardTitle,
  grayColor
} from '../../styles';

import buttonStyle from '../../components/buttonStyle';


const negociadorStyle = {
  right: {
    textAlign: 'right'
  },
  center: {
    textAlign: 'center'
  },
  actionButton: {
    margin: '0 0 0 5px',
    padding: '5px',
    '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
      marginRight: '0px'
    }
  },
  actionButtonRound: {
    width: 'auto',
    height: 'auto', 
    minWidth: 'auto',
  },
  iconList: {
    verticalAlign: 'middle',
    width: '17px',
    height: '17px',
    top: '-1px',
    position: 'relative'
  },
  semMargen: {
    margin: 0,
  },
  cardTitle,
  cardCategoryWhite: {
    margin: '0',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '.875rem'
  },
  cardCategory: {
    color: '#999999',
    marginTop: '10px'
  },
  icon: {
    color: '#333333',
    margin: '10px auto 0',
    width: '130px',
    height: '130px',
    border: '1px solid #E5E5E5',
    borderRadius: '50%',
    overflow: 'hidden',
    lineHeight: '174px',
    '& svg': {
      width: '100%',
      height: '100%'
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      width: '55px',
      fontSize: '55px'
    }
  },
  iconColor: {
    color: grayColor
  },
  marginTop20: {
    marginTop: '20px'
  },
  testimonialIcon: {
    marginTop: '30px',
    '& svg': {
      width: '40px',
      height: '40px'
    }
  },
  cardTestimonialDescription: {
    fontStyle: 'italic',
    color: '#999999'
  },
  card: {
    textAlign: 'center'
  },
  ...buttonStyle
}

export default negociadorStyle;