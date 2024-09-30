import auth from '../utils/auth'
import prisma from '../../context/prisma'

export default async function loginComplete(req, res) {
  try {
    const loginRequestId = auth.getLoginRequest(req);

    if (!loginRequestId) {
      throw new Error('missing login request in cookie, check cookie');
    }

    const loginToken = await prisma.loginToken.findUnique({
      where: {
        id: loginRequestId,
      },
      include: {
        user: true,
      }
    })
    console.log('loginToken ==>', loginToken)
    // if loginToken is not approved, throw error
    if (!loginToken?.approved) {
      throw new Error('login not approved');
    }

    // loginToken is approved, write authentication headers
    const jwtToken = await auth.refreshAuthentication({ req, res, serverToken: loginToken, prisma });
    return res.status(200).json({ error: false, jwtToken, loginRequestId, user: loginToken.user });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: true, message: e.message, stack: e.stack.split('\n') });
  }
}
