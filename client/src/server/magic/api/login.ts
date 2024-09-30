import Joi from 'joi';
import auth from '../utils/auth';
import request from '../utils/request';
import prisma from '../../context/prisma';
import config from '../utils/config';
import serverEmail from '../utils/email';
import loginConfirmEmail from '../utils/emailTemplates/loginConfirmEmail';
import asyncRedis from 'async-redis';
import { kv, createClient } from '@vercel/kv';

// import words from 'server/magic/utils/words';
import { expiresMinutesDuration } from '../utils/time';
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// schema for validating username and password
const schema = Joi.object({
  // email: Joi.string().email().required(),
  // code: Joi.string().required(),
  email: Joi.string().email(),
  code: Joi.string(),
  telegramUserId: Joi.string(),

});

export default async function login(req, res) {
  try {
    const form = typeof req.body === 'string' ? JSON.parse(req.body) : {};
    const { error, value } = schema.validate(form);
    if (error) {
      const [errorDetail] = error.details;

      return res.status(400).json({ error: true, message: errorDetail.message });
    }

    const email = value?.email?.toLowerCase();
    const telegramUserId = value?.telegramUserId
    const loginToken = auth.generateLoginToken();

    const requestMetadata = request.parse(req);
    const domain = request.getDomain(req);

    // update/create user & update/create loginToken
    // the stored token is used to confirm and complete login



    let user = telegramUserId ? await prisma.user.findFirst({
      where: {
        telegramUserId: {
          equals: telegramUserId.toString()
        }
      }
    }) : await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return res.status(400).json({ error: true, message: 'Not exist user.' });
    }

    // const client = asyncRedis.createClient({
    //   url: process.env.REDIS_URL,
    // })

    const kvClient = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    const codeDate = await kvClient.get(`user_${user.id}`)
    console.log('codeDate ==>', codeDate, value)
    if (!codeDate) {
      return res.status(400).json({ error: true, message: 'No verification code.' });
    }

    // const { verificationCode, expiredAt } = JSON.parse(codeDate);
    const { verificationCode, expiredAt } = codeDate;

    if (expiredAt <= Date.now()) {
      return res.status(400).json({ error: true, message: 'Verification code is expired. Please renew your verification code.' });
    }

    if (value.code !== verificationCode) {
      return res.status(400).json({ error: true, message: 'Verification code is invalid.' });
    }

    const createLoginToken = await prisma.loginToken.create({
      data: {
        email,
        domain,
        user: {
          connect: {
            id: user.id,
          }
        },
        // metadata for login token (user agent, ip, etc.)
        userAgentRaw: requestMetadata.userAgentRaw,
        userAgent: requestMetadata.userAgent,
        ip: requestMetadata.ip,
        geo: JSON.stringify(requestMetadata.geo),
        // loginToken contains secret and expires
        secret: loginToken.secret,
        expires: loginToken.expires,
        approved: true,
      },
      include: {
        user: true,
      },
    });

    const jwtToken = await auth.refreshAuthentication({ req, res, serverToken: createLoginToken, prisma });
    return res.status(200).json({
      error: false,
      jwtToken,
    });
  } catch (e) {
    console.error(JSON.stringify(e));

    return res.status(400).json({ error: true, message: e.message, stack: e.stack.split('\n') });
  }
}
