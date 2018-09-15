import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

export function TextMaskCPF(props) {
  const { inputRef, ...other} = props;

  return(
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}      
      showMask={false}
    />
  );
}

TextMaskCPF.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export function TextMaskCNPJ(props) {
  const { inputRef, ...other} = props;

  return(
    <MaskedInput 
      {...other}
      ref={inputRef}
      mask={[/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask={false}
    />
  );
}

TextMaskCNPJ.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export function TextMaskCellPhone(props) {
  const { inputRef, ...other} = props;

  return(
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask={false}
    />
  );
}

TextMaskCellPhone.propTypes = {
  inputRef: PropTypes.func.isRequired,
}

export function TextMaskPhone(props) {
  const { inputRef, ...other} = props;

  return(
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask={false}
    />
  );
}

TextMaskPhone.propTypes = {
  inputRef: PropTypes.func.isRequired,
}


export function TextMaskCEP(props) {
  const { inputRef, ...other } = props;

  return(
    <MaskedInput 
      {...other}
      ref={inputRef}
      mask={[/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask={false}
    />
  );
}

TextMaskCEP.propTypes = {
  inputRef: PropTypes.func.isRequired,
}

export function TextMaskForNumbers(props) {
  const { inputRef, ...other } = props;

  return(
    <MaskedInput 
      {...other}
      ref={inputRef}
      mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}




      placeholderChar={'\u2000'}
      showMask={false}
    />
  );
};

TextMaskForNumbers.propTypes = {
  inputRef: PropTypes.func.isRequired,
};