import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { schema } from 'server/nexusSchema';
import { createContext } from 'server/context';
import { applyMiddleware } from 'graphql-middleware';
import { beforeHooks, afterHooks } from 'server/middleware';
import middlewares from 'server/middleware/output'
import { NextRequest, NextResponse } from 'next/server';


const server = new ApolloServer({
  schema: applyMiddleware(schema, beforeHooks, afterHooks),
});

const handler = startServerAndCreateNextHandler<NextRequest, NextResponse>(server, {
  context: async (req, res) => {
    return createContext({ req, res, middlewares })
  }
});


const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  // res.setHeader('origin', 'https://nextjs-graphql-server-client.vercel.app')
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.setHeader('Access-Control-Allow-Origin', '*')

  // another common pattern
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  await fn(req, res)
}

export default allowCors(handler)
