import _ from 'lodash';
import crypto from 'crypto';

const normalize = (url) => {
  if (url.indexOf('?') >= 0) {
    if (!url.endsWith('?') && !url.endsWith('&')) {
      return url + '&';
    }

    return url;
  } else {
    return url + '?';
  }
}

const validate = (url, params, token, signature) => {
  console.log('validatye', url, params, token, signature);
  const hash = generate(url, params, token);
  console.log('match', hash === signature);

  return hash === signature;
}

const generate = (url, params, token) => {
  const data = _.keys(params).sort().reduce((res, key) => `${res}${key}=${params[key]}&`, normalize(url));

  console.log('data', data.substring(0, data.length - 1));
  console.log('token', token);
  const hash = crypto.createHmac('sha1', token).update(data.substring(0, data.length - 1)).digest('base64');

  console.log('hash', hash);

  return hash;
}

module.exports = {
  generate,
  validate,
}

// // Your Auth Token from twilio.com/console
// const authToken = '12345';
//
// // The Twilio request URL
// const url = 'https://mycompany.com/myapp.php?foo=1&bar=2';
//
// // The post variables in Twilio's request
// const params = {};
// // const params = {
// //   CallSid: 'CA1234567890ABCDE',
// //   Caller: '+14158675310',
// //   Digits: '1234',
// //   From: '+14158675310',
// //   To: '+18005551212',
// // };
//
// // The X-Twilio-Signature header attached to the request
// const twilioSignature = 'GvWf1cFY/Q7PnoempGyD5oXAezc=';
//
// console.log('valid', validate(url, params, authToken, twilioSignature));