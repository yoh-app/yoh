import { extendType, nonNull, stringArg } from 'nexus';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../utils';
import cookie from 'cookie';
// import { UserInputError } from 'apollo-server-micro';
import { S3, Endpoint } from 'aws-sdk';

export const AuthQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('permission', {
      type: 'Json',
      resolve: async (_, __, { permission }) => {
        return permission
      },
    })
    t.nullable.field('me', {
      type: 'User',
      resolve: async (_, __, { prisma, select, userId }) => {
        if (!userId) return null;
        return prisma.user.findUnique({
          where: {
            id: userId,
          },
          ...select,
        });
      },
    });
    t.nullable.field('getCustomer', {
      type: 'Json',
      args: {
        websiteSlug: nonNull('String'),
      },
      resolve: async (_, { websiteSlug }, { prisma, select, userId }) => {
        if (!userId) return null;
        let customer
        customer = await prisma.customer.findFirst({
          where: {
            user: {
              id: {
                equals: userId,
              },
            },
            website: {
              slug: {
                equals: websiteSlug,
              },
            },
          }
        })
        if (!customer) {
          const user = await prisma.user.findUnique({
            where: {
              id: userId
            }
          })
          customer = await prisma.customer.create({
            data: {
              email: user.email,
              user: {
                connect: {
                  id: userId
                }
              },
              website: {
                connect: {
                  slug: websiteSlug
                }
              }
            }
          })
        }
        return customer
      },
    });
  },
});

export const AuthMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signUploadUrl', {
      type: 'String',
      args: {
        filename: 'String',
        contentType: 'String',
        acl: 'String',
      },
      resolve: async (_, { acl, filename, contentType }, { prisma, select, userId }) => {
        if (!userId) return null;
        const s3 = new S3({
          apiVersion: '2006-03-01',
          accessKeyId: process.env.SPACES_KEY,
          secretAccessKey: process.env.SPACES_SECRET,
          endpoint: new Endpoint(process.env.SPACES_ENDPOINT),
          // bucket: process.env.SPACES_BUCKET,
          // region: config.region,
        });
        const url = await s3.getSignedUrl('putObject', {
          Bucket: process.env.SPACES_BUCKET,
          Key: filename,
          Expires: 300,
          ContentType: contentType,
          ACL: acl,
        });
        return url;
      },
    });
    t.field('signup', {
      type: 'User',
      args: {
        name: stringArg(),
        email: nonNull('String'),
        password: nonNull('String'),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10);
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize(
            'token',
            sign(
              { userId: user.id, permission: { admin: 'User', User: user.id, name: user.name, image: user.doImage } },
              JWT_SECRET.key,
              {
                algorithm: JWT_SECRET.type,
              },
            ),
            {
              domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
              httpOnly: true,
              maxAge: 6 * 60 * 60,
              path: '/',
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
            },
          ),
        );
        return user;
      },
    });
    t.nullable.field('login', {
      type: 'User',
      args: {
        email: nonNull('String'),
        password: nonNull('String'),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize(
            'token',
            sign(
              { userId: user.id, permission: { admin: 'User', User: user.id, name: user?.name, image: user?.doImage } },
              JWT_SECRET.key,
              {
                algorithm: JWT_SECRET.type,
              },
            ),
            {
              domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
              httpOnly: true,
              maxAge: 6 * 60 * 60,
              path: '/',
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
            },
          ),
        );
        return user;
      },
    });
    t.field('logout', {
      type: 'Boolean',
      async resolve(_parent, _args, { req, res, prisma }) {
        // remove magic_token

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
        return true;
      },
    });
    t.field('updatePassword', {
      type: 'Boolean',
      args: {
        currentPassword: nonNull('String'),
        password: nonNull('String'),
      },
      resolve: async (_, { currentPassword, password }, ctx) => {
        if (currentPassword && password) {
          // get current user and verify currentPassword before changing;
          const user = await ctx.prisma.user.findUnique({
            where: { id: ctx.userId },
            select: { password: true },
          });
          if (!user) {
            return false;
          }
          const validPass = await compare(currentPassword, user.password);
          if (!validPass) throw new Error('Incorrect Current Password, Error: 1015');
          const hashPassword = await hash(password, 10);

          await ctx.prisma.user.update({
            data: { password: hashPassword },
            where: { id: ctx.userId },
          });
          return true;
        }
        return false;
      },
    });
  },
});
