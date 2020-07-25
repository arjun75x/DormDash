import { Buffer } from 'safe-buffer';

import { User, getOrCreateUserByNetId } from 'models/User';
import {
  OAuth2Client as GoogleOAuth2Client,
  LoginTicket as GoogleLoginTicket,
} from 'google-auth-library';

export type TokenType = 'DeveloperOnly' | 'Google';
export interface Token {
  type: TokenType;
  value: string;
}

const googleOAuth2Audience = [
  process.env.GOOGLE_AUTH_WEB_CLIENT_ID,
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];
const googleOAuth2Client = new GoogleOAuth2Client(
  process.env.GOOGLE_AUTH_WEB_CLIENT_ID,
  process.env.GOOGLE_AUTH_WEB_CLIENT_SECRET
);

const decodeToken = (encodedToken: string): Token => {
  const rawToken = Buffer.from(encodedToken, 'base64').toString();
  const [type, value] = rawToken.split(':', 2);
  return { type: type as TokenType, value };
};

export const decodeBasicAuthHeader = (auth: string): Token => decodeToken(auth.substr(6));

const validateIllinoisEmail: (email: string) => string | null = (email) => {
  const parts = email.split('@');
  return parts.length === 2 && parts[1] === 'illinois.edu' ? parts[0] : null;
};

/** Validates a proposed token for the user.
 *
 * @param {String} token
 * @param {String} tokenType one of DeveloperOnly, Google
 *
 * @return {User} The valid illinois student
 */
export const validateTokenAndReturnUser = async (token: Token): Promise<User | null> => {
  switch (token.type) {
    case 'Google':
      let ticket: GoogleLoginTicket;
      try {
        ticket = await googleOAuth2Client.verifyIdToken({
          idToken: token.value,
          audience: googleOAuth2Audience,
        });
      } catch (err) {
        console.error(err);
        return null;
      }

      const payload = ticket.getPayload();
      console.log(payload);
      const netId = validateIllinoisEmail(payload.email);
      return netId && (await getOrCreateUserByNetId(netId, payload.name));

    case 'DeveloperOnly':
      if (process.env.EXECUTION_STAGE === 'dev') {
        return getOrCreateUserByNetId(token.value, `DEV ${token.value}`);
      }

    default:
      throw Error('Unknown token type');
  }
};
