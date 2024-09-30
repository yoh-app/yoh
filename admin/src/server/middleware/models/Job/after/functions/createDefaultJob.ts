
const createDefaultJob = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma } = context;
      const job = await prisma.job.findUnique({
        where: {
          id: context?.params?.result.id,
        },
        include: {
          organization: true
        }
      });

      const allJobCollection = await prisma.jobCollection.findFirst({
        where: {
          name: {
            equals: 'All Jobs'
          },
          website: {
            id: {
              equals: job?.website?.id
            }
          }
        }
      })

      const updateJob = await prisma.job.update({
        where: {
          id: context?.params?.result.id,
        },
        data: {
          // jobType: 'digital',
          jobCollections: {
            connect: [{
              id: allJobCollection.id
            }]
          }
        }
      })

      return { data: updateJob };
    } catch (error) {
      return { error };
    }
  },
};

export default createDefaultJob;
