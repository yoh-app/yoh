import { extendType, stringArg, objectType, intArg, nonNull, list } from 'nexus';
// import { GraphQLJSON } from 'graphql-type-json';
import fs from 'fs';
import path from 'path';
import { DomHandler, Parser } from 'htmlparser2';
import { v4 as uuid } from 'uuid';
import requireContext from '../utils/requireContext';
import all from '../../templates/sections/all.json'
const All = all.filter((template) => !template.html.includes('absolute'))

const walk = function (dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      const contentBuffer = fs.readFileSync(file);
      const content = contentBuffer.toString();
      results.push({
        file,
        content,
      });
    }
  });
  return results;
};

const getResolvedName = (element) => {
  if (element.type === 'tag') {
    if (element.name === 'section') {
      return 'HtmlSection'
    } else if (element.name === 'img') {
      return 'HtmlImg'
    } else {
      return 'HtmlTag'
    }
  } else {
    return 'HtmlText'
  }
}

const getTemplates = () => {
  const dir = path.resolve('./public/templates');
  const templatePaths = walk(dir).filter((item) => item.file.includes('.html'));
  const templates = templatePaths.map((templatePath) => {
    const style = templatePath.file.split('/')[templatePath.file.split('/').length - 3];
    const type = templatePath.file.split('/')[templatePath.file.split('/').length - 2];
    const name = templatePath.file.split('/')[templatePath.file.split('/').length - 1].replace('.html', '');

    return {
      id: `${style}/${type}/${name}`,
      style,
      name,
      type,
      html: templatePath.content,
    };
  });

  return templates;
};

export const CraftQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getTemplates', {
      type: 'Json',
      resolve: async (_, __, { prisma, userId, permission, templates }) => {
        if (!userId) return null;
        return All;
      },
    });
  },
});

export const CraftMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addResource', {
      type: 'Json',
      args: {
        currentJson: nonNull(stringArg()),
        resource: nonNull(stringArg()),
        items: list('Int'),
      },
      resolve: async (_parent, { currentJson, resource, items }, ctx) => {
        const existJson = JSON.parse(currentJson);
        const newNodeId = uuid();
        existJson['ROOT'] = {
          ...existJson['ROOT'],
          nodes: [...existJson['ROOT'].nodes, newNodeId],
        };
        existJson[newNodeId] = {
          type: {
            resolvedName: 'Resource',
          },
          isCanvas: true,
          props: {
            resource,
          },
          displayName: `${resource}Resource`,
          hidden: false,
          nodes: [],
          linkedNodes: {},
          parent: 'ROOT',
        };
        if (resource === 'product') {
          existJson[newNodeId].props = {
            ...existJson[newNodeId].props,
            products: items,
          };
        } else if (resource === 'category') {
          existJson[newNodeId].props = {
            ...existJson[newNodeId].props,
            categories: items,
          };
        }
        return existJson;
      },
    });
    t.field('addCollection', {
      type: 'Json',
      args: {
        currentJson: nonNull(stringArg()),
        collectionId: nonNull(stringArg()),
        // id: nonNull(stringArg()),
        // style: nonNull(stringArg()),
        // templateFramework: nonNull(stringArg()),
        // templateFolder: nonNull(stringArg()),
        // type: nonNull(stringArg()),
      },
      resolve: async (_parent, { currentJson, collectionId }, { prisma }) => {
        const jsonContent = JSON.parse(currentJson)
        jsonContent.ROOT.nodes.push(collectionId);
        jsonContent[collectionId] = {
          type: {
            resolvedName: 'Collection'
          },
          isCanvas: false,
          props: {
            id: collectionId
          },
          displayName: 'Collection',
          custom: {
            id: collectionId
          },
          hidden: false,
          nodes: [],
          linkedNodes: {},
          parent: 'ROOT',
        }

        return jsonContent;
      },
    });

    t.field('addTemplate', {
      type: 'Json',
      args: {
        currentJson: nonNull(stringArg()),
        id: nonNull(stringArg()),
        // style: nonNull(stringArg()),
        // templateFramework: nonNull(stringArg()),
        // templateFolder: nonNull(stringArg()),
        // type: nonNull(stringArg()),
      },
      resolve: async (_parent, { currentJson, id }, { templates }) => {
        const template = All?.find((tem) => tem.id === id);

        const jsonContent = JSON.parse(currentJson)

        let root = {};
        const craftNodes = {};

        const handler = new DomHandler(function (error, dom) {
          if (error) {
            // Handle error
          } else {
            // Parsing completed, do something
            // root = dom;
            dom.forEach((domItem) => {
              if (domItem?.type === 'tag') {
                domItem.id = uuid();
                root = domItem;
                craftNodes[domItem.id] = {
                  type: {
                    // resolvedName: domItem?.name === 'img' ? 'HtmlImg' : 'HtmlTag',
                    resolvedName: getResolvedName(domItem)
                  },
                  isCanvas: true,
                  props: {},
                  displayName: domItem?.name,
                  custom: {
                    htmlElement: domItem?.name,
                    className: domItem?.attribs?.class,
                    defaultText: domItem?.data,
                    style: domItem?.attribs.style,
                  },
                  hidden: false,
                  nodes: [],
                  linkedNodes: {},
                  parent: 'ROOT',
                };
                jsonContent.ROOT.nodes.push(domItem.id);
              }
            });
          }
        });
        const parser = new Parser(handler);
        parser.write(template.html);
        parser.end();

        traverse(root);

        function traverse(cursor) {
          if (cursor.children) {
            cursor.children.forEach((child) => {
              child.id = uuid();

              if (child.parent) {
                craftNodes[child.parent.id].nodes.push(child.id);
              }
              craftNodes[child.id] = {
                type: {
                  // resolvedName: child.type === 'tag' ? (child.name === 'img' ? 'HtmlImg' : 'HtmlTag') : 'HtmlText',
                  resolvedName: getResolvedName(child),
                },
                isCanvas: true,
                props: {},
                // displayName: child.type === 'tag' ? child?.name : 'text',
                custom: {
                  // htmlElement: child.type === 'tag' ? child?.name : 'text',
                  className: child?.attribs?.class,
                  defaultText: child?.data,
                  src: child?.attribs?.src,
                  style: child?.attribs?.style,
                },
                hidden: false,
                nodes: [],
                linkedNodes: {},
                parent: child?.parent?.id,
              };
              traverse(child);
            });
          }
        }

        return { ...jsonContent, ...craftNodes };
      },
    });
    t.field('installTemplate', {
      type: 'Website',
      args: {
        templateId: nonNull(stringArg()),
        websiteId: nonNull(stringArg()),
      },
      resolve: async (_, { websiteId, templateId }, { prisma, userId }) => {
        try {
          const template = await prisma.website.findUnique({
            where: {
              id: templateId
            },
            include: {
              user: true,
              pages: true,
              // products: {
              //   include: {
              //     videos: true,
              //     audios: true,
              //     documents: true,
              //     pictures: true,
              //     links: true
              //   }
              // },
              products: true,
              productCollections: {
                include: {
                  products: true
                }
              },
              pageGroups: {
                include: {
                  pages: true
                }
              }
            }
          })

          let pages = template?.pages?.map((page) => {
            return {
              ...page,
              navColor: page?.navColor,
              id: page?.id + new Date().getTime() + `-${Math.floor(Math.random() * 10000)}`,
              oldSlug: page?.slug,
              oldId: page?.id,
              slug: page?.slug + new Date().getTime() + `-${Math.floor(Math.random() * 10000)}`
            }
          })
          let products = template?.products?.filter((_product) => !!_product?.editionAddress).map((product) => {
            return {
              ...product,
              isExternalNft: true,
              externalUrl: `https://${template?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${product?.slug}`,
              externalNftChain: product?.isExternalNft ? product?.externalNftChain : 'Polygon',
              id: product?.id + new Date().getTime() + `-${Math.floor(Math.random() * 10000)}`,
              oldSlug: product?.slug,
              oldId: product?.id,
              slug: product?.slug + new Date().getTime() + `-${Math.floor(Math.random() * 10000)}`
            }
          })

          // const uniqueIds = new Set();
          // const duplicate = element => {
          //   const isDuplicate = uniqueIds.has(element.id);
          //   uniqueIds.add(element.id);
          //   if (!isDuplicate) {
          //     return true;
          //   }
          //   return false;
          // }
          let videos = products?.map((product) => {
            return product?.videos?.map((video) => {
              return {
                ...video,
                user: {
                  id: userId
                },
                product,
                id: video?.id + new Date().getTime() + `-${Math.floor(Math.random() * 10000)}`,
                oldId: video?.id,
              }
            })
          }).flat().filter((item) => !!item?.id)
          // .filter(duplicate)

          let audios = products?.map((product) => {
            return product?.audios?.map((audio) => {
              return {
                ...audio,
                user: {
                  id: userId
                },
                product,
                id: audio?.id + new Date().getTime() + `-${Math.floor(Math.random() * 10000)}`,
                oldId: audio?.id,
              }
            })
          }).flat().filter((item) => !!item?.id)
          // .filter(duplicate)

          let links = products?.map((product) => {
            return product?.links?.map((link) => {
              return {
                ...link,
                user: {
                  id: userId
                },
                product,
                id: link?.id + new Date().getTime() + `-${Math.floor(Math.random() * 10000)}`,
                oldId: link?.id,
              }
            })
          }).flat().filter((item) => !!item?.id)
          // .filter(duplicate)

          let documents = products?.map((product) => {
            return product?.documents?.map((document) => {
              return {
                ...document,
                user: {
                  id: userId
                },
                product,
                id: document?.id + new Date().getTime() + `-${Math.floor(Math.random() * 10000)}`,
                oldId: document?.id,
              }
            })
          }).flat().filter((item) => !!item?.id)
          // .filter(duplicate)

          let pictures = products?.map((product) => {
            return product?.pictures?.map((picture) => {
              return {
                ...picture,
                user: {
                  id: userId
                },
                product,
                id: picture?.id + new Date().getTime() + `-${Math.floor(Math.random() * 10000)}`,
                oldId: picture?.id,
              }
            })
          }).flat().filter((item) => !!item?.id)
          // .filter(duplicate)

          let productCollections = template?.productCollections.map((productCollection) => {
            return {
              ...productCollection,
              id: productCollection?.id + new Date().getTime() + `-${Math.floor(Math.random() * 10000)}`,
              oldId: productCollection?.id,
              products: productCollection?.products?.filter((_product) => {
                const product = products?.find((prod) => prod?.oldId === _product?.id)
                return !!product
              }).map((_product) => {
                const product = products.find((produc) => produc?.oldId === _product?.id)
                return {
                  id: product.id
                }
              })
            }
          })
          let pageGroups = template?.pageGroups?.map((pageGroup) => {
            return {
              ...pageGroup,
              id: pageGroup?.id + new Date().getTime() + `-${Math.floor(Math.random() * 10000)}`,
              oldId: pageGroup?.id,
              pages: pageGroup?.pages?.filter((_page) => {
                const page = pages?.find((pag) => pag?.oldId === _page?.id)
                return !!page
              }).map((_page) => {
                const page = pages?.find((pag) => pag?.oldId === _page?.id)
                return {
                  id: page.id
                }
              })
            }
          })

          pages = pages?.map((page) => {
            let content = page.content
            if (typeof page.content === 'string') {
              content = JSON.parse(page.content)
            }
            if (Object.keys(content)?.length > 0) {
              pageGroups.forEach(pageGroup => {
                if (content[pageGroup.oldId]) {
                  content[pageGroup.id] = content[pageGroup.oldId]
                  content[pageGroup.id].id = pageGroup.id
                  content[pageGroup.id].props.id = pageGroup.id
                  delete content[pageGroup.oldId]
                  const pageGroupIndex = content.ROOT.nodes.findIndex((node) => node === pageGroup.oldId)
                  content.ROOT.nodes[pageGroupIndex] = pageGroup.id
                }
              });
              productCollections.forEach(productCollection => {
                if (content?.[productCollection.oldId]) {
                  content[productCollection.id] = content[productCollection.oldId]
                  content[productCollection.id].id = productCollection.id
                  content[productCollection.id].props.id = productCollection.id
                  delete content[productCollection.oldId]
                  const productCollectionIndex = content.ROOT.nodes.findIndex((node) => node === productCollection.oldId)
                  content.ROOT.nodes[productCollectionIndex] = productCollection.id
                }
              });
            }
            return {
              ...page,
              content
            }
          })

          const menu = {
            cards: pages.map((page) => {
              return {
                id: page?.id,
                name: page?.name,
                description: page?.description,
                isIndex: page?.isIndex,
                slug: page?.slug
              }
            }),
            columns: template.menu.columns.map((column) => {
              return {
                ...column,
                cardIds: column.cardIds.map((cardId) => {
                  const page = pages.find((page) => page.oldId === cardId)
                  return page.id
                })
              }
            }),
            columnOrder: template.menu.columnOrder
          }
          const website = await prisma.website.findUnique({
            where: {
              id: websiteId
            }
          })
          const updateWebsite = await prisma.website.update({
            where: {
              id: website?.id
            },
            data: {
              menu: {
                ...menu,
                slug: website?.slug
              },
              pages: {
                create: pages.map((page) => {
                  return {
                    id: page?.id,
                    name: page.name,
                    description: page.description,
                    slug: page.slug,
                    content: page.content,
                    isIndex: page.isIndex,
                    navColor: page.navColor,
                    isExternalLink: page?.isExternalLink,
                    externalUrl: page?.externalUrl,
                    imageObj: page?.imageObj ? page?.imageObj : undefined
                  }
                })
              },
              products: products?.length > 0 ? {
                create: products.map((product) => {
                  return {
                    id: product?.id,
                    name: product.name,
                    description: product.description,
                    slug: product.slug,
                    isExternalNft: product.isExternalNft,
                    imageObj: product.imageObj ? product.imageObj : undefined,
                    editionAddress: product.editionAddress,
                    creatorEarnings: product.creatorEarnings,
                    quantity: product.quantity,
                    externalNftChain: product.externalNftChain,
                    externalUrl: product.externalUrl,
                    gallery: product.gallery,
                    price: product.price
                  }
                })
              } : undefined,
              productCollections: productCollections?.length > 0 ? {
                create: productCollections.map((productCollection) => {
                  return {
                    id: productCollection?.id,
                    name: productCollection.name,
                    description: productCollection.description,
                  }
                })
              } : undefined,
              pageGroups: pageGroups?.length > 0 ? {
                create: pageGroups.map((pageGroup) => {
                  return {
                    id: pageGroup?.id,
                    name: pageGroup.name,
                    description: pageGroup.description,
                  }
                })
              } : undefined
            }
          })

          await Promise.all(links?.map(async (link) => {
            const existItem = await prisma.link.findUnique({
              where: {
                id: link?.id
              }
            })
            if (!existItem) {
              const item = await prisma.link.create({
                data: {
                  id: link?.id,
                  name: link?.name,
                  description: link?.description,
                  imageObj: link?.imageObj,
                  hiddenMessage: link?.hiddenMessage,
                  url: link?.url,
                  user: {
                    connect: {
                      id: userId
                    }
                  },
                  products: {
                    connect: [{
                      id: link.product.id
                    }]
                  }
                }
              })
            } else {
              const item = await prisma.link.update({
                where: {
                  id: link.id
                },
                data: {
                  products: {
                    connect: [{
                      id: link.product.id
                    }]
                  }
                }
              })
            }
          }))

          await Promise.all(pictures?.map(async (picture) => {
            const existItem = await prisma.picture.findUnique({
              where: {
                id: picture.id
              }
            })
            if (!existItem) {
              const item = await prisma.picture.create({
                data: {
                  id: picture?.id,
                  name: picture?.name,
                  description: picture?.description,
                  imageObj: picture?.imageObj,
                  user: {
                    connect: {
                      id: userId
                    }
                  },
                  products: {
                    connect: [{
                      id: picture.product.id
                    }]
                  }
                }
              })
            } else {
              const item = await prisma.picture.update({
                where: {
                  id: picture.id
                },
                data: {
                  products: {
                    connect: [{
                      id: picture.product.id
                    }]
                  }
                }
              })
            }
          }))
          await Promise.all(audios?.map(async (audio) => {
            const existItem = await prisma.audio.findUnique({
              where: {
                id: audio.id
              }
            })
            if (!existItem) {
              const item = await prisma.audio.create({
                data: {
                  id: audio?.id,
                  name: audio?.name,
                  description: audio?.description,
                  imageObj: audio?.imageObj,
                  audioObj: audio?.audioObj,
                  user: {
                    connect: {
                      id: userId
                    }
                  },
                  products: {
                    connect: [{
                      id: audio.product.id
                    }]
                  }
                }
              })
            } else {
              const item = await prisma.audio.update({
                where: {
                  id: audio.id
                },
                data: {
                  products: {
                    connect: [{
                      id: audio.product.id
                    }]
                  }
                }
              })
            }
          }))
          await Promise.all(documents?.map(async (document) => {
            const existItem = await prisma.document.findUnique({
              where: {
                id: document.id
              }
            })
            if (!existItem) {
              const item = await prisma.document.create({
                data: {
                  id: document?.id,
                  name: document?.name,
                  description: document?.description,
                  imageObj: document?.imageObj,
                  documentObj: document?.documentObj,
                  user: {
                    connect: {
                      id: userId
                    }
                  },
                  products: {
                    connect: [{
                      id: document.product.id
                    }]
                  }
                }
              })
            } else {
              const item = await prisma.document.update({
                where: {
                  id: document.id
                },
                data: {
                  products: {
                    connect: [{
                      id: document.product.id
                    }]
                  }
                }
              })
            }
          }))

          await Promise.all(videos?.map(async (video) => {
            const existItem = await prisma.video.findUnique({
              where: {
                id: video.id
              }
            })
            if (!existItem) {
              const item = await prisma.video.create({
                data: {
                  id: video?.id,
                  name: video?.name,
                  description: video?.description,
                  imageObj: video?.imageObj,
                  videoObj: video?.videoObj,
                  user: {
                    connect: {
                      id: userId
                    }
                  },
                  products: {
                    connect: [{
                      id: video.product.id
                    }]
                  }
                }
              })
            } else {
              const item = await prisma.video.update({
                where: {
                  id: video.id
                },
                data: {
                  products: {
                    connect: [{
                      id: video.product.id
                    }]
                  }
                }
              })
            }
          }))

          await Promise.all(productCollections?.map(async (productCollection) => {
            const updateProductCollection = await prisma.productCollection.update({
              where: {
                id: productCollection.id
              },
              data: {
                products: {
                  connect: productCollection?.products?.map((_product) => {
                    return {
                      id: _product?.id
                    }
                  })
                }
              }
            })
          }))
          await Promise.all(pageGroups?.map(async (pageGroup) => {
            const updatePageGroup = await prisma.pageGroup.update({
              where: {
                id: pageGroup.id
              },
              data: {
                pages: {
                  connect: pageGroup?.pages?.filter((_page) => !!_page?.id).map((__page) => {
                    return {
                      id: __page?.id
                    }
                  })
                }
              }
            })
          }))

          return updateWebsite

        } catch (err) {
          console.log(err)
          throw new Error(err)
        }
      },
    });
  },
});
