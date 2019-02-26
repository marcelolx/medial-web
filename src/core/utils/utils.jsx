export default function verifyLength(value, length) {
  return value.length >= length;
}

export function verifyEmail(value) {
  var emailRex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
}


export function replaceNaoNumeros(number) {
  return number.replace(/[^0-9]/g, '')
}

export function validateFile(filename) {
  let regex = new RegExp("(.*?).(docx|doc|png|jpg|jpeg|zip|rar|gif|pdf|xml|bmp|ppt|xls)$");

  return regex.test(filename.toLowerCase());
}

export function validateFileSize(size) {

  return size <= 10485760;
}