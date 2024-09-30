import { defaultContent } from "../../../../../../templates/defaultContents/page";

const createDefaultPageContent = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      if (args?.data && !args?.data?.content || Object.keys(args?.data?.content)?.length === 0) {
        args.data.content = defaultContent
      }
      return { data: args };
    } catch (error) {
      return { error };
    }
  },
};

export default createDefaultPageContent;
