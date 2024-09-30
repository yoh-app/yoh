import { PrismaClient } from '@prisma/client';
import adminSettings from '../../../adminSettings.json'
/* eslint-disable @typescript-eslint/ban-ts-comment */

let db: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
  console.log('Production: Created DB connection.');
} else {
  // @ts-ignore
  if (!global.db) {
    // @ts-ignore
    global.db = new PrismaClient();
    console.log('Development: Created DB connection.');
  }

  // @ts-ignore
  db = global.db;
}

db.$executeRaw('PRAGMA foreign_keys = ON');

// Logging
db.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  // console.log(`${params.model}.${params.action}\n ${JSON.stringify(params.args, null, 2)}\n took ${after - before}ms`);
  return result;
});

// Insensitive search
db.$use(async (params, next) => {
  if (params.action == 'findMany' || params.action == 'findFirst') {
    if (Object.keys(params?.args?.where)?.length > 0) {
      Object.keys(params?.args?.where).map((key) => {
        const model = adminSettings.models.find((model) => model.name === params?.model)
        const field = model?.fields.find((field) => field.name === key)
        if (field?.type === 'String' && !field.isId) {
          params.args.where[key].mode = 'insensitive'
        }
      })
    }
  }
  return next(params);
});

// SoftDelete
// db.$use(async (params, next) => {
//   const originalAction = params.action;
//   if (params.action == 'findUnique') {
//     // Change to findFirst - you cannot filter
//     // by anything except ID / unique with findUnique
//     // params.action = 'findFirst';
//     // Add 'deleted' filter
//     // ID filter maintained
//     // params.args.where['deleted'] = false;
//   } else if (params.action == 'findMany') {
//     // Find many queries
//     if (params.args.where != undefined) {
//       if (params.args.where.deleted == undefined) {
//         // Exclude deleted records if they have not been expicitly requested
//         params.args.where['deleted'] = false;
//       }
//     } else {
//       params.args['where'] = { deleted: false };
//     }
//   } else if (params.action == 'delete') {
//     // Delete queries
//     // Change action to an update
//     params.action = 'update';
//     params.args['data'] = { deletedAt: new Date(), deleted: true };
//   } else if (params.action == 'deleteMany') {
//     // Delete many queries
//     params.action = 'updateMany';
//     if (params.args.data != undefined) {
//       params.args.data['deleted'] = true;
//     } else {
//       params.args['data'] = { deletedAt: new Date(), deleted: true };
//     }
//   } else if (params.action == 'updateMany') {
//     if (params.args.where != undefined) {
//       params.args.where['deleted'] = false;
//     } else {
//       params.args['where'] = { deleted: false };
//     }
//   } else if (params.action == 'update') {
//     // Change to updateMany - you cannot filter
//     // by anything except ID / unique with findUnique
//     // params.action = 'updateMany';
//     // Add 'deleted' filter
//     // ID filter maintained
//     // params.args.where['deleted'] = false;
//   }
//   return next(params);
// });

export default db;
