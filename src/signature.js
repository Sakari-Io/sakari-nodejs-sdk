// import _ from 'lodash';
// import crypto from 'crypto';
//
// const normalize = (url) => {
//   if (url.indexOf('?') >= 0) {
//     if (!url.endsWith('?') && !url.endsWith('&')) {
//       return `${url}&`;
//     }
//
//     return url;
//   }
//
//   return `${url}?`;
// };
//
// const generate = (url, params, token) => {
//   const data = _.keys(params).sort().reduce((res, key) =>
// `${res}${key}=${params[key]}&`, normalize(url));
//   const hash = crypto.createHmac('sha1', token).update(
// data.substring(0, data.length - 1)).digest('base64');
//   return hash;
// };
//
// const validate = (url, params, token, signature) => {
//   const hash = generate(url, params, token);
//   return hash === signature;
// };
//
// export {
//   generate,
//   validate,
// };


// import http from 'http';
// import fs from 'fs';
//
// const file = fs.createWriteStream("file.jpg");
// var request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
//   response.pipe(file);
// });

import axios from 'axios';
import jws from 'jws';
import moment from 'moment';

let fetchDate = null;
let publicKey = null;

const getPublicKey = () => {
  if (!fetchDate || fetchDate.isBefore(moment().subtract(1, 'day'))) {
    console.log('downloading public key');
    return axios.get('https://assets.sakari.io/signing/prod.pem')
      .then((resp) => {
        fetchDate = moment();
        return resp.data;
      })
      .then((data) => {
        publicKey = data;
        return data;
      });
  }

  console.log('using cached public key');
  return Promise.resolve(publicKey);
}

const validate = (signature) => {
  return getPublicKey()
    .then((publicKey) => {
      console.log('publicKey', publicKey);

      return jws.verify(signature, 'RS256', publicKey);
    });
}

export {
  validate,
}

// validate('eyJhbGciOiJSUzI1NiJ9.eyJpZCI6IjVjMTEyYjNhNGVlNGUwNjA1YWU4YWUyYyIsImpvYiI6eyJpZCI6IjVjMTEyYjNhNGVlNGUwNjA1YWU4YWUyYiJ9LCJ0eXBlIjoic21zIiwidGVtcGxhdGUiOiJhc2Rma2poc2RmbGtqIGRzZmtsanNkaGZramxoc2Rma2psaFxyXG5zZGZramxzZGhma2psc2RmIiwic3RhdHVzIjoic2VudCIsIm91dGdvaW5nIjp0cnVlLCJyZWFkIjp0cnVlLCJzZWdtZW50cyI6MSwiam9iQmF0Y2giOjAsInByaWNlIjowLjA1LCJjb250YWN0Ijp7ImlkIjoiNWJlOWFiMjViNGVmMjEwZjU1MjlmMWI1IiwibW9iaWxlIjp7Im51bWJlciI6IisxMjAzMjkzODgxNyIsImNvdW50cnkiOiJVUyJ9fSwiY29udmVyc2F0aW9uIjp7ImlkIjoiNWJlOWFiMjViNGVmMjEwZjU1MjlmMWI3IiwiY2xvc2VkIjoiMjAxOC0xMi0xOVQxNTozNzozMC45ODJaIn0sIm1lc3NhZ2UiOiJhc2Rma2poc2RmbGtqIGRzZmtsanNkaGZramxoc2Rma2psaFxyXG5zZGZramxzZGhma2psc2RmIiwiY3JlYXRlZCI6eyJhdCI6IjIwMTgtMTItMTJUMTU6Mzc6MzAuOTYzWiIsImJ5Ijp7Im5hbWUiOiJBUEkgQ29uc3VtZXIifX0sInVwZGF0ZWQiOnsiYXQiOiIyMDE4LTEyLTEyVDE1OjM3OjM1LjIyOVoiLCJieSI6eyJuYW1lIjoiQVBJIENvbnN1bWVyIn19fQ.jGNhBUDGWOTd4vwgfgDH4-GsUxEcfivP3jgbnPQ6mWVFTL1zbBJCUXPVpKhYZqjFeDYeagM7OADojujwQHozts4_8ZFiXozVYsFjBx5GaHxZ69fSSFML_hEbjNwoTOdzGXD5uBpnK5d-5PHQLj11MRd1yh3zNcZfCQEFCdJsO7FWkc-Q4_ULBLgvjfyY_9aSFF79QOxJnpIoOPRf32XyRkbSN0iNdGZF-2e5gIUiwhnhoy8ID15i21xzyEa5nBSKuR6qzqOwI5Y8PgsJoQJ4w8ycSDfWxh2fTLgVFYhbN0zQow-qg_A_i4WqRTj0DJvpx3OtfICZ5c7GgzQsYm1h8w')
//   .then((res) => console.log('res', res))
//   .then(() => {
//     return validate('eyJhbGciOiJSUzI1NiJ9.eyJpZCI6IjVjMTEyYjNhNGVlNGUwNjA1YWU4YWUyYyIsImpvYiI6eyJpZCI6IjVjMTEyYjNhNGVlNGUwNjA1YWU4YWUyYiJ9LCJ0eXBlIjoic21zIiwidGVtcGxhdGUiOiJhc2Rma2poc2RmbGtqIGRzZmtsanNkaGZramxoc2Rma2psaFxyXG5zZGZramxzZGhma2psc2RmIiwic3RhdHVzIjoic2VudCIsIm91dGdvaW5nIjp0cnVlLCJyZWFkIjp0cnVlLCJzZWdtZW50cyI6MSwiam9iQmF0Y2giOjAsInByaWNlIjowLjA1LCJjb250YWN0Ijp7ImlkIjoiNWJlOWFiMjViNGVmMjEwZjU1MjlmMWI1IiwibW9iaWxlIjp7Im51bWJlciI6IisxMjAzMjkzODgxNyIsImNvdW50cnkiOiJVUyJ9fSwiY29udmVyc2F0aW9uIjp7ImlkIjoiNWJlOWFiMjViNGVmMjEwZjU1MjlmMWI3IiwiY2xvc2VkIjoiMjAxOC0xMi0xOVQxNTozNzozMC45ODJaIn0sIm1lc3NhZ2UiOiJhc2Rma2poc2RmbGtqIGRzZmtsanNkaGZramxoc2Rma2psaFxyXG5zZGZramxzZGhma2psc2RmIiwiY3JlYXRlZCI6eyJhdCI6IjIwMTgtMTItMTJUMTU6Mzc6MzAuOTYzWiIsImJ5Ijp7Im5hbWUiOiJBUEkgQ29uc3VtZXIifX0sInVwZGF0ZWQiOnsiYXQiOiIyMDE4LTEyLTEyVDE1OjM3OjM1LjIyOVoiLCJieSI6eyJuYW1lIjoiQVBJIENvbnN1bWVyIn19fQ.jGNhBUDGWOTd4vwgfgDH4-GsUxEcfivP3jgbnPQ6mWVFTL1zbBJCUXPVpKhYZqjFeDYeagM7OADojujwQHozts4_8ZFiXozVYsFjBx5GaHxZ69fSSFML_hEbjNwoTOdzGXD5uBpnK5d-5PHQLj11MRd1yh3zNcZfCQEFCdJsO7FWkc-Q4_ULBLgvjfyY_9aSFF79QOxJnpIoOPRf32XyRkbSN0iNdGZF-2e5gIUiwhnhoy8ID15i21xzyEa5nBSKuR6qzqOwI5Y8PgsJoQJ4w8ycSDfWxh2fTLgVFYhbN0zQow-qg_A_i4WqRTj0DJvpx3OtfICZ5c7GgzQsYm1h8w');
//   });