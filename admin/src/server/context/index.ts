// import { NextApiRequest, NextApiResponse } from 'next'
import {
  getUserId,
  getPermission,
  cleanPermission,
  capToLowerCase,
  getModelObject,
  tsWrapper,
  JWT_SECRET,
} from '../utils';
import { updateWebsiteCache } from '../utils/cache'
import prisma from './prisma';
import asyncRedis from 'async-redis'
import axios from 'axios'
import { createClient } from '@vercel/kv'

// const redisClient = asyncRedis.createClient({
//   url: process.env.REDIS_URL,
// })

const kvClient = createClient({
  url: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_URL : process.env.KV_REST_API_URL,
  token: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_TOKEN : process.env.KV_REST_API_TOKEN,
});

// export interface Context extends NextApi {
//   prisma: typeof prisma
//   userId?: number
//   select: any
// }

// interface NextApi {
//   req: NextApiRequest
//   res: NextApiResponse
// }

export function createContext({ req, res, middlewares, templates }: any): any {
  const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN ?? req?.headers?.origin.replace('https://', '').replace('http://', '')?.split(':')[0].split('.').slice(1).join('.')

  return {
    req,
    res,
    prisma,
    userId: getUserId(req, res),
    permission: getPermission(req, res),
    select: {},
    JWT_SECRET,
    middlewares,
    templates,
    // redisClient,
    kvClient,
    domain,
    axios,
    utils: {
      cleanPermission,
      capToLowerCase,
      getModelObject,
      tsWrapper,
      updateWebsiteCache,
    },
  };
}
