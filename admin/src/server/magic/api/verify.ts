import Joi from 'joi';
import request from '../utils/request';
import prisma from '../../context/prisma';
import config from '../utils/config';
import serverEmail from '../utils/email';
import loginVerifyEmail from '../utils/emailTemplates/loginVerifyEmail';
import asyncRedis from 'async-redis';
import { kv, createClient } from '@vercel/kv';
// import words from 'server/magic/utils/words';
import { expiresMinutesDuration } from '../utils/time';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// schema for validating username and password
const schema = Joi.object({
  email: Joi.string().email().required(),
});

export default async function verify(req, res) {
  const verificationCode = Math.random().toString().slice(2, 8);
  try {
    const form = typeof req.body === 'string' ? JSON.parse(req.body) : {};
    const { error, value } = schema.validate(form);

    if (error) {
      const [errorDetail] = error.details;

      return res.status(400).json({ error: true, message: errorDetail.message });
    }

    const email = value.email.toLowerCase();

    const domain = request.getDomain(req);

    // update/create user & update/create loginToken
    // the stored token is used to confirm and complete login

    let user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      // const account = await stripe.accounts.create({
      //   type: 'express',
      //   email,
      // });

      user = await prisma.user.create({
        data: {
          email,
          // stripeAccountId: process.env.NODE_ENV === 'production' ? account.id : 'acct_1JBheKRK4I1jKgKY',
        }
      })
    }

    // const client = asyncRedis.createClient({
    //   url: process.env.REDIS_URL,
    // })

    const kvClient = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    const timeout = 10 * 60 * 1000; // 10 minutes
    // client.set(`user_${user.id}`, JSON.stringify({ verificationCode, expiredAt: Date.now() + timeout }))

    await kvClient.set(`user_${user.id}`, JSON.stringify({ verificationCode, expiredAt: Date.now() + timeout }));

    const expiresIn = expiresMinutesDuration(config.LOGIN_TOKEN_EXPIRES);
    const emailHtml = loginVerifyEmail({
      email,
      // loginUrl,
      verificationCode,
      expiresIn
    });

    const emailResponse = await serverEmail.send(email, {
      subject: `login code: ${verificationCode}`,
      html: emailHtml,
    });

    return res.status(200).json({
      error: false,
    });
  } catch (e) {
    console.error(JSON.stringify(e));

    return res.status(400).json({ error: true, message: e.message, stack: e.stack.split('\n') });
  }
}
