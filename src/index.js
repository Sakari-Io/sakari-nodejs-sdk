import jwt from 'jsonwebtoken';
import axios from 'axios';
import moment from 'moment';

import { BASE_URL } from './constants';
import Messages from './messages';
import { validate } from './signature';

const isExpired = (token) => {
  const decoded = jwt.decode(token);
  const expiry = moment(decoded.exp);
  return moment().isAfter(expiry);
};

class Sakari {
  constructor(accountId, clientId, clientSecret) {
    this.accountId = accountId;
    this.clientId = clientId;
    this.clientSecret = clientSecret;

    this.Messages = Messages(this.getAccessToken, accountId);
  }

  getAccessToken = () => {
    if (!this.accessToken || isExpired(this.accessToken)) {
      return axios.post(`${BASE_URL}/oauth2/token`, {
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
      })
        .then(resp => resp.data.access_token)
        .then((accessToken) => {
          this.accessToken = accessToken;
          return accessToken;
        });
    }

    return Promise.resolve(this.accessToken);
  }

  validateRequest = (url, params, signature) => validate(url, params, this.clientSecret, signature);
}

export {
  Sakari as default,
};
