export default function handleFieldShowError(props, field, typeErros, valueCompare = '', notTypeErros = []) {
  const { error, step } = props;

  return ((
    Object.keys(typeErros).filter(key => typeErros[key] === error.message).length > 0) || 
    ((step.beforeNextStepError && field === valueCompare) &&
     (Object.keys(notTypeErros).filter(key => notTypeErros[key] === error.message).length === 0))
  );
}