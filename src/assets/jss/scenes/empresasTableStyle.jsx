import customCheckbox from '../components/customCheckbox';
import { cardTitle } from '../styles';

const empresasTableStyle = {
  ...customCheckbox,
  right: {
    textAlign: 'right'
  },
  center: {
    textAlign: 'center'
  },
  positionAbsolute: {
    position: 'absolute',
    right: '0',
    top: '0'
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px'
  }
};

export default empresasTableStyle;