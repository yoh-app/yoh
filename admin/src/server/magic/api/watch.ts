import prisma from '../../context/prisma';
import jwt from 'jsonwebtoken';
import config from '../utils/config';

export default async function watch(req, res) {
  try {
    const jwtToken = typeof req.body === 'string' ? JSON.parse(req.body) : {};

    const decodedInfo = jwt.decode(jwtToken.encoded, config.JWT_SECRET.key);
    console.log(jwtToken, decodedInfo, 'decodedInfo')
    // set loginToken to approved
    const loginToken = await prisma.loginToken.findUnique({
      where: {
        id: decodedInfo?.loginTokenId,
      },
    });

    // when login token exists
    //   { data: { loginToken: { secret: '...' } } }
    // when login token does not exist
    //   { data: { loginToken: null } }
    if (!loginToken) {
      throw new Error('login token missing, try again');
    }

    // token does not match stored secret
    // if (approveLoginToken.secret !== token) {
    //   throw new Error('login token invalid, try again');
    // }

    // verify loginToken not expired
    if (Date.now() > new Date(loginToken.expires).getTime()) {
      throw new Error('login token expired, try again');
    }
    // const loginConfirmUrl = `${process.env.PROTOCOL}://${approveLoginToken.domain}/magic/confirm`;

    // client will then be able to hit /auth/login/complete
    // which will hit server and write refresh token

    // return res.status(200).json({ error: false });
    // res.setHeader('Content-Type', 'text/html');
    // return res.status(200).send(`
    //   <html>
    //     <head>
    //       <meta http-equiv="Refresh" content="0; URL=${loginConfirmUrl}">
    //     </head>
    //   </html>
    // `);
    if (loginToken.approved) {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: true, message: e.message, stack: e.stack.split('\n') });
  }
}

// const approveLoginToken = gql`
//   mutation ApproveLoginToken($id: uuid!) {
//     loginToken: update_loginToken_by_pk(pk_columns: { id: $id }, _set: { approved: true }) {
//       secret
//       expires
//       email
//     }
//   }
// `;
