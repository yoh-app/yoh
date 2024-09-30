import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv';

config({ path: '.env' });

const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()


async function main() {
  const websites = await prisma.website.findMany({
    include: {
      pages: true,
      products: {
        include: {
          videos: true,
          audios: true,
          documents: true,
          pictures: true,
          links: true
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
  })
  websites.map((website) => {
    const uniqueIds = new Set();

    let videos = website?.products.map((product) => {
      return product.videos.map((video) => {
        return {
          ...video,
          product
        }
      })
    }).flat().filter(element => {
      const isDuplicate = uniqueIds.has(element.id);
      uniqueIds.add(element.id);
      if (!isDuplicate) {
        return true;
      }
      return false;
    })
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })