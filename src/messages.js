import axios from 'axios';

import { BASE_URL } from './constants';

const send = (getAccessToken, acctId) => ({ contacts, conversations, template }) => getAccessToken()
  .then(token => axios.post(`${BASE_URL}/v1/accounts/${acctId}/messages`, { contacts, conversations, template }, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  }).then(resp => resp.data))
  .catch((err) => {
    console.log('error', err);
    console.log('errordata', err.data);
    throw err;
  });

const buildRequest = (to, message) => ({
  contacts: {
    mobile: {
      number: to,
    },
  },
  template: message,
});

const messages = (getAccessToken, accountId) => ({
  send: send(getAccessToken, accountId),
  sendOne: (to, message) => send(getAccessToken, accountId)(buildRequest(to, message)),
});

export default messages;
