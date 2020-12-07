import * as crypto from 'crypto';

export const hashPassword = (
  encryption: 'sha512' | 'hmac',
  password: string,
  salt: string,
): string => {
  const passwordString = salt + password + 'wIDmCexWa6';
  return encryption === 'hmac'
    ? crypto
        .createHmac('sha512', 'ja0Afw0k1kdazxc')
        .update(passwordString)
        .digest('hex')
    : crypto
        .createHash(encryption, { encoding: 'hex' })
        .update(passwordString)
        .digest('hex');
};

export const encodePassword = (password: string, key: string): string => {
  const iv = 'V8MMkXs5pkVxzUr7';
  const newKey = crypto
    .createHash('md5')
    .update(key)
    .digest('base64')
    .substr(0, 16);
  const cipher = crypto.createCipheriv('aes-128-cbc', newKey, iv);
  let buffer = cipher.update(password, 'utf8', 'hex');
  buffer += cipher.final('hex');
  return buffer;
};

export const decodePassword = (password: string, key: string): string => {
  const iv = 'V8MMkXs5pkVxzUr7';
  const newKey = crypto
    .createHash('md5')
    .update(key)
    .digest('base64')
    .substr(0, 16);
  const cipher = crypto.createDecipheriv('aes-128-cbc', newKey, iv);
  let buffer = cipher.update(password, 'hex', 'utf8');
  buffer += cipher.final('utf8');
  return buffer;
};
