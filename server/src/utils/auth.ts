import { Buffer } from 'safe-buffer';

import {
  OAuth2Client as GoogleOAuth2Client,
  LoginTicket as GoogleLoginTicket,
} from 'google-auth-library';

export type TokenType = 'DeveloperOnly' | 'Google';
export interface Token {
  type: TokenType;
  value: string;
}
export interface AuthInfo {
  googleUserId?: string;
  developerOnlyUserId?: string;
  email: string;
  emailVerified: boolean;
}

const googleOAuth2Audience = [process.env.GOOGLE_AUTH_WEB_CLIENT_ID];
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

/** Validates a proposed token for the user.
 *
 * @param {String} token
 * @param {String} tokenType one of DeveloperOnly, Google
 *
 * @return {Object} The string user _id if found.
 */
export const validateTokenAndReturnTokenId = async (
  token: string,
  tokenType: TokenType = 'Google'
): Promise<string | null> => {
  switch (tokenType) {
    case 'Google':
      let ticket: GoogleLoginTicket;
      try {
        ticket = await googleOAuth2Client.verifyIdToken({
          idToken: token,
          audience: googleOAuth2Audience,
        });
      } catch (err) {
        console.error(err);
        return null;
      }

      return ticket.getPayload().sub;

    case 'DeveloperOnly':
      if (process.env.EXECUTION_STAGE === 'dev') {
        return token;
      }

    default:
      throw Error('Unknown token type');
  }
};

/** Validates a proposed token for the user.
 *
 * @param {String} token
 * @param {String} tokenType one of DeveloperOnly, Google
 *
 * @return {Object} The string user _id if found.
 */
export const validateTokenAndReturnAuthInfo = async (
  token: string,
  tokenType: TokenType = 'Google'
): Promise<AuthInfo | null> => {
  switch (tokenType) {
    case 'Google':
      let ticket: GoogleLoginTicket;
      try {
        ticket = await googleOAuth2Client.verifyIdToken({
          idToken: token,
          audience: googleOAuth2Audience,
        });
      } catch (err) {
        console.error(err);
        return null;
      }

      const payload = ticket.getPayload();
      return {
        googleUserId: payload.sub,
        email: payload.email,
        emailVerified: payload.email_verified,
      };

    case 'DeveloperOnly':
      if (process.env.EXECUTION_STAGE === 'dev') {
        return {
          developerOnlyUserId: token,
          email: `${token}@dormdash.dev`,
          emailVerified: true,
        };
      }

    default:
      throw Error('Unknown token type');
  }
};
