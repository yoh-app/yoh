import prisma from '../../context/prisma';

export default async function loginConfirm(req, res) {
  try {
    const { id, token } = req.query;

    // set loginToken to approved
    const approveLoginToken = await prisma.loginToken.update({
      where: {
        id,
      },
      data: {
        approved: true,
      },
    });

    // when login token exists
    //   { data: { loginToken: { secret: '...' } } }
    // when login token does not exist
    //   { data: { loginToken: null } }
    if (!approveLoginToken) {
      throw new Error('login token missing, try again');
    }

    // token does not match stored secret
    if (approveLoginToken.secret !== token) {
      throw new Error('login token invalid, try again');
    }

    // verify loginToken not expired
    if (Date.now() > new Date(approveLoginToken.expires).getTime()) {
      throw new Error('login token expired, try again');
    }
    const loginConfirmUrl = `${process.env.NODE_ENV === 'development' ? 'http' : 'https'}://${req?.headers?.host}/auth/magic/confirm`

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
    return res.status(302).redirect(`${loginConfirmUrl}?email=${approveLoginToken.email}`);
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
