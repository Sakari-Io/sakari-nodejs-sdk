import _ from 'lodash';
import crypto from 'crypto';

const normalize = (url) => {
  if (url.indexOf('?') >= 0) {
    if (!url.endsWith('?') && !url.endsWith('&')) {
      return `${url}&`;
    }

    return url;
  }

  return `${url}?`;
};

const generate = (url, params, token) => {
  const data = _.keys(params).sort().reduce((res, key) => `${res}${key}=${params[key]}&`, normalize(url));
  const hash = crypto.createHmac('sha1', token).update(data.substring(0, data.length - 1)).digest('base64');
  return hash;
};

const validate = (url, params, token, signature) => {
  const hash = generate(url, params, token);
  return hash === signature;
};

export {
  generate,
  validate,
};
