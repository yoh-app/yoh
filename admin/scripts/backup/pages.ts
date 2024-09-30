import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv';

config({ path: '.env' });

const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function main() {
  const pages = await prisma.page.findMany({
    include: {
      website: {
        include: {
          user: true
        }
      }
    }
  })
  pages.forEach((page) => {
    fs.writeFileSync(`${__dirname}/${page.slug}.json`, JSON.stringify(page))
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })