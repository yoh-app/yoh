import prisma from '../../context/prisma';
import auth from '../utils/auth';
import { getUserId } from '../../utils'
export default async function loginRefresh(req, res) {
  try {
    const authCookie = auth.getAuthCookie(req);
    const userId = getUserId(req, res)
    // no auth cookie, valid logged out case
    // return 200 with no jwtToken
    if (!authCookie || !userId) {
      return res.status(200).json({ error: false });
    }
    const loginRequestId = auth.getLoginRequest(req);

    if (!loginRequestId) {
      throw new Error('missing login request in cookie, check cookie');
    }

    // token kind is not refresh, valid logging-in case
    // return 200 with state to restore check email modal login request listener
    const loginRequest = await auth.restoreLoginRequest({ req, res, loginRequestId, prisma });
    if (loginRequest) {
      // if loginToken is approved, signal client to complete
      if (loginRequest.approved) {
        return res.status(200).json({ error: false, loginRequestApproved: true });
      }

      // return loginRequest to restore on client
      // will open check email modal and listen for login token changes
      return res.status(200).json({ error: false, loginRequest });
    }

    // lookup refresh token in backend to compare against authCookie
    const loginToken = await prisma.loginToken.findUnique({
      where: {
        id: loginRequestId,
      }
    });
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        loginTokenId: loginRequestId,
      },
      include: {
        user: true
      }
    });

    if (!loginToken) {
      throw new Error('no valid login tokens found in backend, logout and try again');
    }
    const { user } = refreshToken;

    if (!refreshToken) {
      throw new Error('no valid login sessions found in backend, logout and try again');
    }

    // refreshAuthentication takes care of setting auth cookie
    // returns jwt token for client side authentication
    const jwtToken = await auth.refreshAuthentication({
      req,
      res,
      serverToken: refreshToken,
      authCookie,
      prisma,
    });

    return res.status(200).json({ error: false, jwtToken, loginRequestId, user });
  } catch (e) {
    console.error(e);

    return res.status(400).json({ error: true, message: e.message, stack: e.stack.split('\n') });
  }
}

// const UserForSelfFragment = gql`
//   fragment UserForSelfFragment on user {
//     id
//     email
//     created
//     updated
//   }
// `;

// const UserForLoginFragment = gql`
//   fragment UserForLoginFragment on user {
//     id
//     email
//     defaultRole
//     roles {
//       role {
//         name
//         id
//       }
//     }
//   }
// `;

// const getRefreshToken = gql`
//   ${UserForLoginFragment}

//   ${UserForSelfFragment}

//   query GetRefreshToken($loginRequestId: uuid!) {
//     loginTokenUser: loginToken_by_pk(id: $loginRequestId) {
//       user {
//         ...UserForSelfFragment
//       }
//     }

//     refreshToken_by_pk(loginTokenId: $loginRequestId) {
//       loginTokenId
//       value
//       expires
//       user {
//         ...UserForLoginFragment
//       }
//     }
//   }
// `;
