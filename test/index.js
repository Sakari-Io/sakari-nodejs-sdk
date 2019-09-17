// const Sakari = require('../src').default;
//
// const accountId = '5b197d0b2fdfe64e09d5e8c2';
// const clientId = '2575c484-87b7-4afc-8c99-2e750815357b';
// const clientSecret = '87accbf8-4549-4d13-b661-92197b2a2e43';
//
// // new Sakari(accountId, clientId, clientSecret).Messages.send({
// //   contacts: [{
// //     mobile: {
// //       number: '+13474958386',
// //     },
// //   }],
// //   template: 'test',
// // }).then((res) => {
// //   console.log('res', res.data.invalid);
// // }).catch((err) => {
// //   console.error(err);
// //   console.log(err.response);
// // });
//
// const params = {
//   CallSid: 'CA1234567890ABCDE',
//   Caller: '+14158675310',
//   Digits: '1234',
//   From: '+14158675310',
//   To: '+18005551212',
// };
//
//
// const valid = new Sakari(accountId, clientId, '12345')
//   .validateRequest('https://mycompany.com/myapp.php?foo=1&bar=2', params, 'AOHK9vvKuURCVszv5w1VEUu8Fe0=');
// console.log('valid', valid);

import { assert } from 'chai';
import defaultAwesomeFunction, { awesomeFunction } from '../src';

describe('Awesome test.', () => {
  it('should test default awesome function', () => {
    const expectedVal = 'I am the Default Awesome Function, fellow comrade! - Dinesh'
    assert(defaultAwesomeFunction('Dinesh') === expectedVal, 'Default not awesome :(');
  });

  it('should test awesome function', () => {
    const expectedVal = 'I am just an Awesome Function'
    assert(awesomeFunction() === expectedVal, 'Named awesome :(');
  });
});


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
