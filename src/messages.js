import axios from 'axios';

import { BASE_URL } from './constants';

const send = (getAccessToken, acctId) => ({ contacts, conversations, template }) => getAccessToken()
  .then(token => axios.post(`${BASE_URL}/v1/accounts/${acctId}/messages`, { contacts, conversations, template }, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  }).then(resp => resp.data));

const messages = (getAccessToken, accountId) => ({
  send: send(getAccessToken, accountId),
});

export default messages;
