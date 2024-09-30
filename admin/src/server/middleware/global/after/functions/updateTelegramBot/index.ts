const updateTelegramBot = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { getModelObject, capToLowerCase } = context.utils
      const { prisma } = context
      const modelObject = getModelObject(context)
      if (
        context?.params?.action === 'updateOne' || context?.params?.action === 'createOne'
      ) {
        if (context?.params?.model === 'Event') {
          const event = await context?.prisma.event.findUnique({
            where: {
              id: context.params.result.id
            }
          })
          if (event?.telegramBotId && event?.telegramApiToken) {
            await fetch(`${process.env.BOT_URL}/api/webhook/event/${event?.telegramBotId}`, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
            });
          }
        } else if (context?.params?.model === 'Organization') {
          const organization = await context?.prisma.organization.findUnique({
            where: {
              id: context.params.result.id
            }
          })
          if (organization?.telegramBotId && organization?.telegramApiToken) {
            await fetch(`${process.env.BOT_URL}/api/webhook/organization/${organization?.telegramBotId}`, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
            });
          }
        }
      }
      return { data: context.params.result };
    } catch (error) {
      return { error };
    }
  },
};

export default updateTelegramBot;