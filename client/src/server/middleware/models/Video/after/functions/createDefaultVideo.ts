
const createDefaultWebsite = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma } = context;
      const video = await prisma.video.findUnique({
        where: {
          id: context?.params?.result.id,
        },
        include: {
          website: true
        }
      });

      const allVideoCollection = await prisma.videoCollection.findFirst({
        where: {
          name: {
            equals: 'All Videos'
          },
          website: {
            id: {
              equals: video?.website?.id
            }
          }
        }
      })

      const updateVideo = await prisma.video.update({
        where: {
          id: context?.params?.result.id,
        },
        data: {
          // productType: 'digital',
          videoCollections: {
            connect: [{
              id: allVideoCollection.id
            }]
          }
        }
      })

      return { data: updateVideo };
    } catch (error) {
      return { error };
    }
  },
};

export default createDefaultWebsite;
