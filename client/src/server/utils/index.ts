import { verify } from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import cookie from 'cookie';
import { GraphQLClient } from 'graphql-request';
// import * as graphqlFunctions from '../../generated';
import { permissions } from '../permission';
import { format } from 'prettier';
require('dotenv').config();

export const JWT_SECRET =
  process.env.JWT_SECRET && typeof process.env.JWT_SECRET === 'string' ? JSON.parse(process.env.JWT_SECRET) : {};

interface Token {
  userId: number;
}

function removeAuthCookie(res) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
      httpOnly: true,
      maxAge: -1,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }),
  );
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('magic_token', '', {
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
      httpOnly: true,
      maxAge: -1,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }),
  );
}

export function getUserId(req, res) {
  const { token, magic_token } = cookie.parse(req.headers.cookie ?? '');
  if (token && token !== 'null') {
    try {
      const verifiedToken = verify(token, JWT_SECRET.key) as Token;
      return verifiedToken && verifiedToken.userId;
    } catch (e) {
      console.log(e);
      if (res) {
        removeAuthCookie(res);
      }
    }
  } else if (magic_token && magic_token !== 'null') {
    try {
      const verifiedToken = verify(magic_token, JWT_SECRET.key) as Token;
      return verifiedToken && verifiedToken.userId;
    } catch (e) {
      console.log(e);
      if (res) {
        removeAuthCookie(res);
      }
    }
  }
  return null;
}

export const getPermission = (req, res) => {
  let result = permissions[0];

  try {
    const accessToken = req.headers?.authorization?.replace('Bearer', '').trim();
    const { token, magic_token } = cookie.parse(req.headers.cookie ?? '');
    const verifiedAccessToken = accessToken && (verify(accessToken, JWT_SECRET.key) as Token);
    const verifiedToken = token && (verify(token, JWT_SECRET.key) as Token);
    const verifiedMagicToken = magic_token && (verify(magic_token, JWT_SECRET.key) as Token);

    if (verifiedMagicToken || verifiedToken) {
      const userId = verifiedMagicToken?.userId || verifiedToken?.userId;
      const email = verifiedMagicToken?.email || verifiedToken?.email;
      if (userId !== verifiedAccessToken?.userId) {
        const userPermission = permissions.find((permission) => permission.admin === 'User');
        result = {
          email,
          ...userPermission,
          ...verifiedToken?.permission,
          ...verifiedMagicToken?.permission,
        };
      } else if (accessToken && accessToken !== 'null') {
        permissions.forEach((permission) => {
          if (verifiedAccessToken?.permission.admin === permission.admin) {
            result = {
              email,
              ...verifiedAccessToken?.permission,
              ...permission,
            };
          }
        });
      }
    }

    return result;
  } catch (e) {
    console.log(e);
    if (res) {
      removeAuthCookie(res);
    }
    // throw new Error(e);
  }
  return result;
};

export const getModelObject = (context) => {
  const modelObject = context.permission.schema.models.find((modelItem) => {
    return modelItem.name === context.params.model;
  });
  // console.log(context.params.model, context.permission.admin)

  const relationModel = context.permission.parents.find((relationItem) => relationItem.model === context.params.model);
  const isModelAdmin = permissions.find((permission) => permission.admin === modelObject.name);

  if (relationModel) {
    modelObject.parent = relationModel.parent;
    modelObject.isParentAdmin = !!permissions.find((permission) => permission.admin === modelObject.parent);
  }
  if (isModelAdmin) {
    modelObject.admin = true;
  }

  return modelObject;
};

export const capToLowerCase = (text) => {
  return text.charAt(0).toLowerCase() + text.slice(1);
};

export const tsWrapper = (string) => {
  const output = format(string, {
    singleQuote: true,
    semi: true,
    trailingComma: 'all',
    parser: 'babel-ts',
    printWidth: 120,
    tabWidth: 2,
  });
  return output;
};

export const cleanPermission = (permission) => {
  const newPermission = {
    admin: permission.admin,
    name: permission.name,
    imageObj: permission.imageObj,
    adminParent: permission.adminParent,
  };

  for (const key in permission) {
    if (Object.prototype.hasOwnProperty.call(permission, key)) {
      permissions.map((permissionItem) => {
        if (key == permissionItem.admin) {
          newPermission[key] = permission[key];
        }
      });
    }
  }
  return newPermission;
};

// export const generateGraphqlFunctions = (req) => {
//   const result = {};
//   const headers = {};

//   if (req.headers) {
//     headers = req.headers;
//   }

//   const graphqlClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`, {
//     headers,
//   });

//   for (const key in graphqlFunctions) {
//     if (Object.prototype.hasOwnProperty.call(graphqlFunctions, key)) {
//       // const element = object[key];
//       if (key.endsWith('Document')) {
//         result[capToLowerCase(key.replace('Document', ''))] = (variables) =>
//           graphqlClient.request(graphqlFunctions[key], variables);
//       }
//     }
//   }
//   return { graphqlFunctions: result, graphqlClient };
// };
