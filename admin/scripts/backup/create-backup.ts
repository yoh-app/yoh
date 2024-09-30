import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv';

config({ path: '.env' });

const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
  const slugCounters = await prisma.slugCounter.findMany()
  const users = await prisma.user.findMany({
    include: {
      attachments: true,
      notifications: true,
      videos: true,
      audios: true,
      pictures: true,
      documents: true,
      links: true,
      websites: {
        include: {
          notifications: true,
          attachments: true,
          customers: {
            include: {
              requests: {
                include: {
                  page: true,
                  requestClicks: true
                }
              },
              orders: true,
              user: true,
            }
          },
          orders: {
            include: {
              product: true,
              orderedProducts: {
                include: {
                  product: true
                }
              },
            }
          },
          products: {
            include: {
              videos: true,
              audios: true,
              links: true,
              pictures: true,
              documents: true,
            }
          },
          pages: {
            include: {
              pageViews: true,
              requestClicks: true
            }
          },
          pageCollections: {
            include: {
              pages: true
            }
          },
          productCollections: {
            include: {
              products: true
            }
          }
        }
      }
    }
  })

  fs.writeFileSync(`${__dirname}/data/slugCounters.json`, JSON.stringify(slugCounters))
  users.forEach((user) => {
    fs.writeFileSync(`${__dirname}/data/users/${user.email}.json`, JSON.stringify(user))
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })