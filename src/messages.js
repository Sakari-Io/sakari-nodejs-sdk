import axios from 'axios';

import { BASE_URL } from './constants';

const send = (getAccessToken, accountId) => ({ contacts, conversations, template }) => {
  console.log('accountId', accountId);
  return getAccessToken()
    .then((token) => {
      return axios.post(`${BASE_URL}/v1/accounts/${accountId}/messages`, { contacts, conversations, template}, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }).then((resp) => {
        console.log('resp', resp);
        return resp.data;
      });
    });
}

const messages = (getAccessToken, accountId) => {
  return {
    send: send(getAccessToken, accountId),
  }
}

export default messages;