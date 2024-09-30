import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv';

config({ path: '.env' });

const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// function delay(t, v) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve.bind(null, v), t)
//   });
// }

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async function deleteRecords() {
//   const filenames = fs.readdirSync(__dirname)

//   await filenames.reduce(async (previous, filename) => {
//     try {
//       await previous

//       const content = fs.readFileSync(__dirname + '/' + filename, 'utf-8')

//       if (filename.includes('json')) {
//         const backupedPage = JSON.parse(content)
//         const backupedWebsite = backupedPage.website

//         let page = await prisma.page.findFirst({
//           where: {
//             // id: { equals: backupedPage.id },
//             slug: { equals: backupedPage.slug }
//           }
//         })

//         if (page) {
//           await prisma.page.delete({
//             where: {
//               slug: backupedPage.slug
//             }
//           })
//         }

//         let website = await prisma.website.findFirst({
//           where: {
//             // id: { equals: backupedWebsite.id },
//             slug: { equals: backupedWebsite.slug }
//           },
//         })

//         if (website) {
//           await prisma.website.delete({
//             where: {
//               slug: backupedWebsite.slug
//             }
//           })
//         }
//       }

//     } catch (err) {
//       console.log(err)
//       throw new Error(err)
//     }
//   }, Promise.resolve())
// }

// async function installRecords() {
//   let pageSlugs = []
//   let websiteSlugs = []

//   fs.readdir(__dirname, async function (err, filenames) {
//     if (err) {
//       console.log(err);
//       return;
//     }


//     await filenames.reduce(async (previous, filename) => {
//       try {
//         await previous
//         const content = fs.readFileSync(__dirname + '/' + filename, 'utf-8')

//         if (filename.includes('json')) {
//           const backupedPage = JSON.parse(content)
//           const backupedWebsite = backupedPage.website

//           let website = await prisma.website.findUnique({
//             where: {
//               slug: backupedWebsite.slug
//             },
//           })
//           if (!website) {
//             website = await prisma.website.create({
//               data: {
//                 languageCode: backupedWebsite.languageCode,
//                 menu: backupedWebsite.menu,
//                 imageObj: backupedWebsite.imageObj,
//                 name: backupedWebsite.name,
//                 description: backupedWebsite.description,
//                 themeColor: backupedWebsite.themeColor,
//                 slug: backupedWebsite.slug,
//                 id: backupedWebsite.id,
//                 active: backupedWebsite.active,
//                 user: {
//                   connectOrCreate: {
//                     where: {
//                       email: backupedWebsite.user.email
//                     },
//                     create: {
//                       email: backupedWebsite.user.email
//                     },
//                   },
//                 }
//               }
//             })

//             websiteSlugs.push(website.slug)
//             console.log(websiteSlugs)

//           }
//           let page = await prisma.page.findFirst({
//             where: {
//               slug: { equals: backupedPage.slug },
//               website: {
//                 slug: {
//                   equals: backupedWebsite.slug
//                 }
//               }
//             },
//           })

//           if (!page) {
//             const page = await prisma.page.create({
//               data: {
//                 id: backupedPage.id,
//                 name: backupedPage.name,
//                 description: backupedPage.description,
//                 slug: backupedPage.slug,
//                 content: backupedPage.content,
//                 active: backupedPage.active,
//                 navColor: backupedPage.navColor,
//                 website: {
//                   connect: {
//                     slug: website.slug
//                   }
//                 }
//               }
//             })
//             pageSlugs.push(page.slug)
//             console.log(pageSlugs)

//           }
//         }
//       } catch (err) {
//         console.log(err)
//         throw new Error(err)
//       }
//     }, Promise.resolve())

//   });
// }

// deleteRecords()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
//   .then(() => {
//     installRecords()
//   })




async function main() {
  const slugCounters = fs.readFileSync(__dirname + '/data/slugCounters.json', 'utf-8')
  const backedUpSlugCounters = JSON.parse(slugCounters)

  await backedUpSlugCounters.reduce(async (previous, backedUpSlugCounter) => {
    const slugCounter = await prisma.slugCounter.create({
      data: backedUpSlugCounter
    })
    await delay(100)
    console.log(slugCounter)
  }, Promise.resolve())


  // await Promise.all(backedUpSlugCounters.map(async (backedUpSlugCounter) => {
  //   const slugCounter = await prisma.slugCounter.create({
  //     data: backedUpSlugCounter
  //   })
  //   await delay(100)

  //   console.log(slugCounter)
  // }))

  fs.readdir(`${__dirname}/data/users`, async function (err, filenames) {
    if (err) {
      console.log(err);
      return;
    }

    await filenames.reduce(async (previous, filename) => {
      try {
        await previous
        const content = fs.readFileSync(__dirname + '/data/users/' + filename, 'utf-8')

        if (filename.includes('json')) {
          const backedUpUser = JSON.parse(content)
          backedUpUser.attachments = backedUpUser?.attachments ?? []
          backedUpUser.notifications = backedUpUser?.notifications ?? []
          backedUpUser.videos = backedUpUser?.videos ?? []
          backedUpUser.audios = backedUpUser?.audios ?? []
          backedUpUser.pictures = backedUpUser?.pictures ?? []
          backedUpUser.documents = backedUpUser?.documents ?? []
          backedUpUser.links = backedUpUser?.links ?? []
          backedUpUser.websites = backedUpUser?.websites ?? []
          const userData = {}
          Object.keys(backedUpUser).forEach((key) => {
            if (validJsonField(key) && backedUpUser[key]) {
              userData[key] = backedUpUser[key]
            } else if (!key.endsWith('Id') && typeof backedUpUser[key] !== 'object' && !Array.isArray(backedUpUser[key]) && key !== 'imageObj') {
              userData[key] = backedUpUser[key]
            }
          })

          const user = await prisma.user.create({
            data: userData
          })
          console.log(user)

          await Promise.all(backedUpUser.notifications.map(async (backedUpNotification, index) => {
            await delay(100 * index)

            const notificationData = {}
            Object.keys(backedUpNotification).forEach((key) => {
              if (validJsonField(key) && backedUpNotification[key]) {
                notificationData[key] = backedUpNotification[key]
              } else if (!key.endsWith('Id') && typeof notificationData[key] !== 'object' && !Array.isArray(notificationData[key])) {
                notificationData[key] = backedUpNotification[key]
              }
            })
            const notification = await prisma.notification.create({
              data: {
                user: {
                  connect: {
                    id: user.id
                  }
                },
                ...notificationData
              }
            })
            console.log(notification)
          }))
          await delay(100)

          await Promise.all(backedUpUser.attachments.map(async (backedUpAttachment, index) => {
            await delay(100 * index)

            const attachmentData = {}
            Object.keys(backedUpAttachment).forEach((key) => {
              if (validJsonField(key) && backedUpAttachment[key]) {
                attachmentData[key] = backedUpAttachment[key]
              } else if (!key.endsWith('Id') && typeof attachmentData[key] !== 'object' && !Array.isArray(attachmentData[key])) {
                attachmentData[key] = backedUpAttachment[key]
              }
            })
            const attachment = await prisma.attachment.create({
              data: {
                user: {
                  connect: {
                    id: user.id
                  }
                },
                ...attachmentData
              }
            })
            console.log(attachment)
          }))
          await delay(100)


          await Promise.all(backedUpUser.videos.map(async (backedUpVideo, index) => {
            await delay(100 * index)

            const videoData = {}
            Object.keys(backedUpVideo).forEach((key) => {
              if (validJsonField(key) && backedUpVideo[key]) {
                videoData[key] = backedUpVideo[key]
              } else if (!key.endsWith('Id') && typeof backedUpVideo[key] !== 'object' && !Array.isArray(backedUpVideo[key])) {
                videoData[key] = backedUpVideo[key]
              }
            })
            const video = await prisma.video.create({
              data: {
                user: {
                  connect: {
                    id: user.id
                  }
                },
                ...videoData
              }
            })
            console.log(video)
          }))
          await delay(100)


          await Promise.all(backedUpUser?.documents?.map(async (backedUpDocument, index) => {
            await delay(100 * index)

            const documentData = {}
            Object.keys(backedUpDocument).forEach((key) => {
              if (validJsonField(key) && backedUpDocument[key]) {
                documentData[key] = backedUpDocument[key]
              } else if (!key.endsWith('Id') && typeof backedUpDocument[key] !== 'object' && !Array.isArray(backedUpDocument[key])) {
                documentData[key] = backedUpDocument[key]
              }
            })
            const document = await prisma.document.create({
              data: {
                user: {
                  connect: {
                    id: user.id
                  }
                },
                ...documentData
              }
            })
            console.log(document)
          }))
          await delay(100)


          await Promise.all(backedUpUser?.pictures?.map(async (backedUpPicture, index) => {
            await delay(100 * index)

            const pictureData = {}
            Object.keys(backedUpPicture).forEach((key) => {
              if (validJsonField(key) && backedUpPicture[key]) {
                pictureData[key] = backedUpPicture[key]
              } else if (!key.endsWith('Id') && typeof backedUpPicture[key] !== 'object' && !Array.isArray(backedUpPicture[key])) {
                pictureData[key] = backedUpPicture[key]
              }
            })
            const picture = await prisma.picture.create({
              data: {
                user: {
                  connect: {
                    id: user.id
                  }
                },
                ...pictureData
              }
            })
            console.log(picture)
          }))
          await delay(100)

          await Promise.all(backedUpUser?.audios?.map(async (backedUpAudio, index) => {
            await delay(100 * index)

            const audioData = {}
            Object.keys(backedUpAudio).forEach((key) => {
              if (validJsonField(key) && backedUpAudio[key]) {
                audioData[key] = backedUpAudio[key]
              } else if (!key.endsWith('Id') && typeof backedUpAudio[key] !== 'object' && !Array.isArray(backedUpAudio[key])) {
                audioData[key] = backedUpAudio[key]
              }
            })
            const audio = await prisma.audio.create({
              data: {
                user: {
                  connect: {
                    id: user.id
                  }
                },
                ...audioData
              }
            })
            console.log(audio)
          }))
          await delay(100)

          await Promise.all(backedUpUser?.links?.map(async (backedUpLink, index) => {
            await delay(100 * index)

            const linkData = {}
            Object.keys(backedUpLink).forEach((key) => {
              if (validJsonField(key) && backedUpLink[key]) {
                linkData[key] = backedUpLink[key]
              } else if (!key.endsWith('Id') && typeof backedUpLink[key] !== 'object' && !Array.isArray(backedUpLink[key])) {
                linkData[key] = backedUpLink[key]
              }
            })
            const link = await prisma.link.create({
              data: {
                user: {
                  connect: {
                    id: user.id
                  }
                }, ...linkData
              }
            })
            console.log(link)
          }))

          await delay(100)

          await Promise.all(backedUpUser?.websites?.map(async (backedUpWebsite, index) => {
            await delay(100 * index)

            const websiteData = {}
            Object.keys(backedUpWebsite).forEach((key) => {
              if (validJsonField(key) && backedUpWebsite[key]) {
                websiteData[key] = backedUpWebsite[key]
              } else if (key !== 'stripeAccountId' && !key.endsWith('Id') && typeof backedUpWebsite[key] !== 'object' && !Array.isArray(backedUpWebsite[key])) {
                websiteData[key] = backedUpWebsite[key]
              }
            })
            const website = await prisma.website.create({
              data: {
                user: {
                  connect: {
                    id: user.id
                  }
                },
                paymentMethod: websiteData?.paymentMethod === 'stripe' ? 'stripe' : 'crypto',
                ...websiteData
              }
            })
            console.log(website)

            await delay(100)


            await Promise.all(backedUpWebsite.notifications.map(async (backedUpNotification, index) => {
              await delay(100 * index)

              const notificationData = {}
              Object.keys(backedUpNotification).forEach((key) => {
                if (validJsonField(key) && backedUpNotification[key]) {
                  notificationData[key] = backedUpNotification[key]
                } else if (!key.endsWith('Id') && typeof notificationData[key] !== 'object' && !Array.isArray(notificationData[key])) {
                  notificationData[key] = backedUpNotification[key]
                }
              })
              const notification = await prisma.notification.create({
                data: {
                  website: {
                    connect: {
                      id: website.id
                    }
                  },
                  ...notificationData
                }
              })
              console.log(notification)
              await delay(100)

            }))

            await delay(100)

            await Promise.all(backedUpWebsite.attachments.map(async (backedUpAttachment, index) => {
              await delay(100 * index)

              const attachmentData = {}
              Object.keys(backedUpAttachment).forEach((key) => {
                if (validJsonField(key) && backedUpAttachment[key]) {
                  attachmentData[key] = backedUpAttachment[key]
                } else if (!key.endsWith('Id') && typeof attachmentData[key] !== 'object' && !Array.isArray(attachmentData[key])) {
                  attachmentData[key] = backedUpAttachment[key]
                }
              })
              const attachment = await prisma.attachment.create({
                data: {
                  website: {
                    connect: {
                      id: website.id
                    }
                  },
                  ...attachmentData
                }
              })
              console.log(attachment)
              await delay(100)

            }))
            await delay(100)


            await Promise.all(backedUpWebsite.customers.map(async (backedUpCustomer, index) => {
              await delay(100 * index)

              const customerData = {}
              Object.keys(backedUpCustomer).forEach((key) => {
                if (validJsonField(key) && backedUpCustomer[key]) {
                  customerData[key] = backedUpCustomer[key]
                } else if (!key.endsWith('Id') && typeof backedUpCustomer[key] !== 'object' && !Array.isArray(backedUpCustomer[key])) {
                  customerData[key] = backedUpCustomer[key]
                }
              })
              const customer = await prisma.customer.create({
                data: {
                  website: {
                    connect: {
                      id: backedUpWebsite.id
                    }
                  },
                  user: {
                    connect: {
                      id: user.id
                    }
                  }, ...customerData
                }
              })
              await delay(100)

              console.log(customer)
            }))
            await delay(100)

            await Promise.all(backedUpWebsite.products.map(async (backedUpProduct, index) => {
              await delay(100 * index)

              const productData = {}
              Object.keys(backedUpProduct).forEach((key) => {
                if (validJsonField(key) && backedUpProduct[key]) {
                  productData[key] = backedUpProduct[key]
                } else if (!key.endsWith('Id') && typeof backedUpProduct[key] !== 'object' && !Array.isArray(backedUpProduct[key])) {
                  productData[key] = backedUpProduct[key]
                }
              })
              const product = await prisma.product.create({
                data: {
                  website: {
                    connect: {
                      id: website.id
                    }
                  },
                  creatorEarnings: 3,
                  ...productData,
                }
              })
              console.log(product)
            }))
            await delay(100)

            await Promise.all(backedUpWebsite.orders.map(async (backedUpOrder, index) => {
              await delay(100 * index)

              const orderData = {}
              Object.keys(backedUpOrder).forEach((key) => {
                if (validJsonField(key) && backedUpOrder[key]) {
                  orderData[key] = backedUpOrder[key]
                } else if (!key.endsWith('Id') && typeof backedUpOrder[key] !== 'object' && !Array.isArray(backedUpOrder[key])) {
                  orderData[key] = backedUpOrder[key]
                }
              })
              const order = await prisma.order.create({
                data: {
                  ...orderData,
                  website: {
                    connect: {
                      id: website.id
                    }
                  },
                  ...backedUpOrder?.product?.id ? {
                    product: {
                      connect: {
                        id: backedUpOrder?.product?.id
                      }
                    }
                  } : undefined
                }
              })
              console.log(order)
            }))
            await delay(100)

            await Promise.all(backedUpWebsite.pages.map(async (backedUpPage, index) => {
              await delay(100 * index)

              const pageData = {}
              Object.keys(backedUpPage).forEach((key) => {
                if (validJsonField(key) && backedUpPage[key]) {
                  pageData[key] = backedUpPage[key]
                } else if (!key.endsWith('Id') && typeof backedUpPage[key] !== 'object' && !Array.isArray(backedUpPage[key])) {
                  pageData[key] = backedUpPage[key]
                }
              })
              try {
                // const existPage = await prisma.page.findUnique({
                //   where: {
                //     slug: pageData?.slug
                //   }
                // })
                // if (existPage) {
                //   console.log(existPage)
                // }
                // const page = existPage ? existPage : await prisma.page.create({
                const page = await prisma.page.create({

                  data: {
                    website: {
                      connect: {
                        id: website.id
                      }
                    },
                    ...backedUpPage?.requestClicks?.length > 0 ? {
                      requestClicks: {
                        create: backedUpPage?.requestClicks.map((requestClick) => {
                          const requestClickData = {}

                          Object.keys(requestClick).forEach((key) => {
                            if (validJsonField(key) && requestClick[key]) {
                              requestClickData[key] = requestClick[key]
                            } else if (!key.endsWith('Id') && typeof requestClick[key] !== 'object' && !Array.isArray(requestClick[key])) {
                              requestClickData[key] = requestClick[key]
                            }
                          })
                          return requestClickData
                        })
                      }
                    } : undefined,
                    ...backedUpPage?.pageViews?.length > 0 ? {
                      pageViews: {
                        create: backedUpPage?.pageViews.map((backedUpPageView) => {
                          const pageViewData = {}

                          Object.keys(backedUpPageView).forEach((key) => {
                            if (validJsonField(key) && backedUpPageView[key]) {
                              pageViewData[key] = backedUpPageView[key]
                            } else if (!key.endsWith('Id') && typeof backedUpPageView[key] !== 'object' && !Array.isArray(backedUpPageView[key])) {
                              pageViewData[key] = backedUpPageView[key]
                            }
                          })
                          return pageViewData
                        })
                      }
                    } : undefined,
                    ...pageData
                  }
                })

                console.log(page)
              } catch (err) {
                console.log(err, pageData)
                throw new Error(err + JSON.stringify(pageData))
              }

            }))

            await delay(100)

            await Promise.all(backedUpWebsite.pageCollections.map(async (backedUpPageCollection, index) => {
              await delay(100 * index)

              const pageCollectionData = {}
              Object.keys(backedUpPageCollection).forEach((key) => {
                if (validJsonField(key) && backedUpPageCollection[key]) {
                  pageCollectionData[key] = backedUpPageCollection[key]
                } else if (!key.endsWith('Id') && typeof backedUpPageCollection[key] !== 'object' && !Array.isArray(backedUpPageCollection[key])) {
                  pageCollectionData[key] = backedUpPageCollection[key]
                }
              })
              const pageCollection = await prisma.pageCollection.create({
                data: {
                  website: {
                    connect: {
                      id: website.id
                    }
                  },
                  ...backedUpPageCollection?.pages?.length > 0 ? {
                    pages: {
                      connect: backedUpPageCollection?.pages.map(({ id }) => {
                        return { id }
                      })
                    }
                  } : undefined,
                  ...pageCollectionData
                }
              })
              console.log(pageCollection)
            }))

            await delay(100)

            await Promise.all(backedUpWebsite.productCollections.map(async (backedUpProductCollection, index) => {
              await delay(100 * index)

              const productCollectionData = {}
              Object.keys(backedUpProductCollection).forEach((key) => {
                if (validJsonField(key) && backedUpProductCollection[key]) {
                  productCollectionData[key] = backedUpProductCollection[key]
                } else if (!key.endsWith('Id') && typeof backedUpProductCollection[key] !== 'object' && !Array.isArray(backedUpProductCollection[key])) {
                  productCollectionData[key] = backedUpProductCollection[key]
                }
              })
              const productCollection = await prisma.productCollection.create({
                data: {
                  website: {
                    connect: {
                      id: website.id
                    }
                  },
                  ...backedUpProductCollection?.products?.length > 0 ? {
                    products: {
                      connect: backedUpProductCollection?.products.map(({ id }) => {
                        return { id }
                      })
                    }
                  } : undefined,
                  ...productCollectionData
                }
              })
              console.log(productCollection)
            }))
            await delay(100)

            backedUpWebsite.customers.map(async (backedUpCustomer) => {
              await Promise.all(backedUpCustomer.requests.map(async (backedUpRequest, index) => {
                await delay(100 * index)

                const requestData = {}
                Object.keys(backedUpRequest).forEach((key) => {
                  if (validJsonField(key) && backedUpRequest[key]) {
                    requestData[key] = backedUpRequest[key]
                  } else if (!key.endsWith('Id') && typeof backedUpRequest[key] !== 'object' && !Array.isArray(backedUpRequest[key])) {
                    requestData[key] = backedUpRequest[key]
                  }
                })
                const request = await prisma.request.create({
                  data: {
                    customer: {
                      connect: {
                        id: backedUpCustomer.id
                      }
                    },
                    page: {
                      connect: {
                        id: backedUpRequest.page.id
                      }
                    },
                    requestClicks: backedUpRequest?.requestClicks?.length > 0 ? {
                      connect: backedUpRequest?.requestClicks?.map((requestClick) => {
                        return {
                          id: requestClick.id
                        }
                      })
                    } : undefined,
                    ...requestData
                  }
                })
                await delay(100)

                console.log(request)
              }))
              await delay(100)

              await Promise.all(backedUpCustomer.orders.map(async (backedUpOrder, index) => {
                await delay(100 * index)

                const order = await prisma.order.update({
                  where: {
                    id: backedUpOrder.id
                  },
                  data: {
                    customer: {
                      connect: {
                        id: backedUpCustomer.id
                      }
                    },
                  }
                })
                console.log(order)
              }))

            })
            await delay(100)

            backedUpWebsite.orders.map(async (backedUpOrder) => {
              await Promise.all(backedUpOrder.orderedProducts.map(async (backedUpOrderedProduct, index) => {
                await delay(100 * index)

                const orderedProductData = {}
                Object.keys(backedUpOrderedProduct).forEach((key) => {
                  if (validJsonField(key) && backedUpOrderedProduct[key]) {
                    orderedProductData[key] = backedUpOrderedProduct[key]
                  } else if (!key.endsWith('Id') && typeof backedUpOrderedProduct[key] !== 'object' && !Array.isArray(backedUpOrderedProduct[key])) {
                    orderedProductData[key] = backedUpOrderedProduct[key]
                  }
                })
                const orderedProduct = await prisma.orderedProduct.create({
                  data: {
                    order: {
                      connect: {
                        id: backedUpOrder.id
                      }
                    },
                    website: {
                      connect: {
                        id: backedUpWebsite.id
                      }
                    },
                    product: {
                      connect: {
                        id: backedUpOrderedProduct.product.id
                      }
                    },
                    ...orderedProductData
                  }
                })
                console.log(orderedProduct)
              }))
            })
            await delay(100)

            backedUpWebsite.products.map(async (backedUpProduct) => {
              backedUpProduct.documents = backedUpProduct?.documents ?? []
              backedUpProduct.pictures = backedUpProduct?.pictures ?? []
              backedUpProduct.audios = backedUpProduct?.audios ?? []
              backedUpProduct.videos = backedUpProduct?.videos ?? []
              backedUpProduct.links = backedUpProduct?.links ?? []

              await Promise.all(backedUpProduct.pictures.map(async (backedUpPicture, index) => {
                await delay(100 * index)

                const picture = await prisma.picture.update({
                  where: {
                    id: backedUpPicture.id
                  },
                  data: {
                    products: {
                      connect: {
                        id: backedUpProduct.id
                      }
                    },
                  }
                })
                console.log(picture)
              }))
              await delay(100)

              await Promise.all(backedUpProduct.documents.map(async (backedUpDocument, index) => {
                await delay(100 * index)

                const document = await prisma.document.update({
                  where: {
                    id: backedUpDocument.id
                  },
                  data: {
                    products: {
                      connect: {
                        id: backedUpProduct.id
                      }
                    },
                  }
                })
                console.log(document)
              }))
              await delay(100)

              await Promise.all(backedUpProduct.videos.map(async (backedUpVideo, index) => {
                await delay(100 * index)

                const video = await prisma.video.update({
                  where: {
                    id: backedUpVideo.id
                  },
                  data: {
                    products: {
                      connect: {
                        id: backedUpProduct.id
                      }
                    },
                  }
                })
                console.log(video)
              }))
              await delay(100)

              await Promise.all(backedUpProduct.audios.map(async (backedUpAudio, index) => {
                await delay(100 * index)

                const audio = await prisma.audio.update({
                  where: {
                    id: backedUpAudio.id
                  },
                  data: {
                    products: {
                      connect: {
                        id: backedUpProduct.id
                      }
                    },
                  }
                })
                console.log(audio)
              }))
              await delay(100)

              await Promise.all(backedUpProduct.links.map(async (backedUpLink, index) => {
                await delay(100 * index)

                const link = await prisma.link.update({
                  where: {
                    id: backedUpLink.id
                  },
                  data: {
                    products: {
                      connect: {
                        id: backedUpProduct.id
                      }
                    },
                  }
                })
                console.log(link)
              }))
            })

          }))
        }
      } catch (err) {
        console.log(err)
        throw new Error(err)
      }
    }, Promise.resolve())

  });
}

const validJsonField = (key) => {
  if (key === 'imageObj' || key === 'documentObj' || key === 'upload' || key === 'menu' || key === 'chain' || key === 'videoObj' || key === 'audioObj' || key === 'content') {
    return true
  }
  return false
}

main()