import { extendType, stringArg, objectType, intArg, nonNull } from 'nexus';
import { mergeSchema } from '../utils/mergeSchema';
// import { GraphQLJSON } from 'graphql-type-json';
import axios from 'axios';
import Metascraper from 'metascraper';
import MetascraperTitle from 'metascraper-title';
import MetascraperDescription from 'metascraper-description';
import MetascraperImage from 'metascraper-image';

export const BuilderQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getUiTree', {
      type: 'Json',
      args: {
        adminId: nonNull('String'),
      },
      resolve: async (_, { adminId }, { prisma, userId, permission }) => {
        if (!userId) return null
        const relations = []
        const admin = await prisma.admin.findUnique({
          where: {
            id: adminId,
          },
          include: {
            schemaModel: true,
            pageGroups: {
              include: {
                // admin: true,
                intls: true,
                // crudIntls
                pages: {
                  include: {
                    intls: true,
                    crudIntls: true,
                    tabs: {
                      include: {
                        intls: true,
                      },
                    },
                    widgets: {
                      include: {
                        intls: true,
                      },
                    },
                    relationModels: {
                      include: {
                        tabs: {
                          include: {
                            intls: true,
                          },
                        },
                        widgets: {
                          include: {
                            intls: true,
                          },
                        },
                        forms: {
                          include: {
                            intls: true,
                            formFields: {
                              include: {
                                intls: true,
                              },
                            },
                          },
                        },
                        intls: true,
                        crudIntls: true,
                      },
                    },
                    forms: {
                      include: {
                        formFields: {
                          include: {
                            intls: true,
                          },
                        },
                        intls: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
        admin?.pageGroups.map((pageGroup) => {
          relations.push({
            ...pageGroup,
            parent: null,
            type: 'PageGroup',
          })

          pageGroup.pages.map((page) => {
            relations.push({
              ...page,
              parent: pageGroup.fullPath,
              type: 'Page',
            })

            page.tabs.map((tab) => {
              relations.push({
                ...tab,
                parent: page.fullPath,
                type: 'Tab',
              })
            })
            page.widgets.map((widget) => {
              relations.push({
                ...widget,
                parent: page.fullPath,
                type: 'Widget',
              })
            })

            page.forms.map((form) => {
              if (!form.relationModel) {
                relations.push({
                  ...form,
                  parent: page.fullPath,
                  type: 'Form',
                })
                form.formFields.map((formField) => {
                  relations.push({
                    ...formField,
                    parent: form.fullPath,
                    type: 'FormField',
                  })
                })
              }
            })

            page.relationModels.map((relationModel) => {
              relationModel.forms.map((form) => {
                if (form.relationModel) {
                  relations.push({
                    ...form,
                    parent: relationModel.fullPath,
                    type: 'Form',
                  })
                  form.formFields.map((formField) => {
                    relations.push({
                      ...formField,
                      parent: form.fullPath,
                      type: 'FormField',
                    })
                  })
                }
              })
              relationModel.tabs.map((tab) => {
                relations.push({
                  ...tab,
                  parent: relationModel.fullPath,
                  type: 'Tab',
                })
              })
              relationModel.widgets.map((widget) => {
                relations.push({
                  ...widget,
                  parent: relationModel.fullPath,
                  type: 'Widget',
                })
              })
              relations.push({
                ...relationModel,
                parent: page.fullPath,
                type: 'RelationModel',
              })
            })
          })
        })

        return relations
      },
    })
    t.field('getAdminSettings', {
      type: 'Json',
      args: {
        admin: nonNull('String'),
        Admin: 'String',
        Version: nonNull('String'),
      },
      resolve: async (_, { admin, Admin, Version }, { prisma, userId, permission }) => {
        if (!userId) return null;

        let originalAdminSettings

        if (admin === 'Version') {
          const version = await prisma.version.findUnique({
            where: {
              id: Version
            }
          })
          originalAdminSettings = typeof version?.adminSettings === 'string' ? JSON.parse(version?.adminSettings) : null
        } else if (admin === 'Admin') {
          const admin = await prisma.admin.findUnique({
            where: {
              id: Admin
            }
          })
          originalAdminSettings = typeof admin?.adminSettings === 'string' ? JSON.parse(admin?.adminSettings) : null
        }

        let adminSettings = await generateAdminSettings({ prisma, Version })

        if (originalAdminSettings) {
          originalAdminSettings?.models?.map((existModel, existModelIndex) => {
            const modelIndex = adminSettings.models.findIndex((model) => model.name === existModel.name)
            if (modelIndex > -1 && adminSettings.models[modelIndex]) {
              adminSettings.models[modelIndex].create = existModel.create
              adminSettings.models[modelIndex].delete = existModel.delete
              adminSettings.models[modelIndex].update = existModel.update
              adminSettings.models[modelIndex].title = existModel.title || existModel.name
              adminSettings.models[modelIndex].displayFields = existModel.displayFields

              existModel?.fields.map((existField, existFieldIndex) => {
                const fieldIndex = existModel.fields.findIndex((field) => field.name === existField.name)
                if (fieldIndex > -1 && adminSettings?.models?.[modelIndex]?.fields[fieldIndex]) {
                  adminSettings.models[modelIndex].fields[fieldIndex].create = existField.create
                  adminSettings.models[modelIndex].fields[fieldIndex].update = existField.update
                  adminSettings.models[modelIndex].fields[fieldIndex].read = existField.read
                  adminSettings.models[modelIndex].fields[fieldIndex].editor = existField.editor
                  adminSettings.models[modelIndex].fields[fieldIndex].filter = existField.filter
                  adminSettings.models[modelIndex].fields[fieldIndex].sort = existField.sort
                  adminSettings.models[modelIndex].fields[fieldIndex].order = existField.order
                  adminSettings.models[modelIndex].fields[fieldIndex].title = existField.title
                  adminSettings.models[modelIndex].fields[fieldIndex].upload = existField.upload
                }
              })
            }
          })
        }

        if (admin === 'Admin') {
          const updateAdmin = await prisma.admin.update({
            where: {
              id: Admin,
            },
            data: {
              adminSettings: JSON.stringify(adminSettings),
            },
          })
        } else if (admin === 'Version') {
          const updateVersion = await prisma.version.update({
            where: {
              id: Version,
            },
            data: {
              adminSettings: JSON.stringify(adminSettings),
            },
          })
        }
        return adminSettings;
      },
    });
  },
});

const generateAdminSettings = async ({ prisma, Version }) => {
  const models = await prisma.schemaModel.findMany({
    where: {
      version: {
        id: Version,
      },
    },
    include: {
      schemaFields: true,
    },
  })

  models.map((model) => {
    model.id = model.name
    model.fields = model.schemaFields.map((field, index) => {
      return {
        ...field,
        id: `${model.name}.${field.name}`,
      }
    })
  })

  const enums = await prisma.schemaEnum.findMany({
    where: {
      version: {
        id: Version,
      },
    },
    include: {
      enumFields: true,
    },
  })
  enums.map((schemaEnum) => {
    schemaEnum.fields = schemaEnum.enumFields.map((enumField) => enumField.name)
  })

  const adminSettings = mergeSchema({ models, enums }, '')
  return adminSettings
}

export const BuilderMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateAdminSettingsModel', {
      type: 'Model',
      args: {
        modelName: nonNull('String'),
        data: 'Json',
        // data: 'UpdateModelInput',
      },
      resolve: async (_, { modelName, data }, { prisma, permission, utils }) => {
        let resultModel = {};
        const { capToLowerCase } = utils;
        if (!permission?.admin || !permission[permission?.admin]) {
          throw new Error('Need either project or admin id in permission');
        }
        const adminModel = permission.admin;
        const adminId = permission[adminModel];
        const lowerCaseAdmin = capToLowerCase(adminModel);
        const admin = await prisma[lowerCaseAdmin].findUnique({
          where: {
            id: adminId,
          },
        });

        const adminSettings = JSON.parse(admin.adminSettings)

        if (adminSettings?.models?.length > 0) {
          const newAdminSettings = {
            models: adminSettings.models.map((model) => {
              if (model.name === modelName) {
                resultModel = { ...model, ...data };
                return resultModel;
              }
              return model;
            }),
            enums: adminSettings?.enums,
          };
          const updateAdmin = await prisma[lowerCaseAdmin].update({
            where: {
              id: adminId,
            },
            data: {
              adminSettings: JSON.stringify(newAdminSettings),
            },
          });
          return resultModel;
        }
        return null;
      },
    });
    t.field('updateAdminSettingsField', {
      type: 'Field',
      args: {
        fieldName: nonNull('String'),
        modelName: nonNull('String'),
        data: 'Json',
        // data: 'UpdateFieldInput',
      },
      resolve: async (_, { fieldName, modelName, data }, { prisma, permission, utils }) => {
        let resultField = {};

        if (!permission?.admin || !permission[permission?.admin]) {
          throw new Error('Need either project or admin id in permission');
        }
        const adminModel = permission.admin;
        const adminId = permission[adminModel];
        const { capToLowerCase } = utils;

        const lowerCaseAdmin = capToLowerCase(adminModel);

        const admin = await prisma[lowerCaseAdmin].findUnique({
          where: {
            id: adminId,
          },
        });

        const adminSettings = JSON.parse(admin.adminSettings)

        if (adminSettings?.models?.length > 0) {
          const newAdminSettings = {
            models: adminSettings.models.map((model) => {
              if (modelName === model.name) {
                const newModel = { ...model };
                if (model?.fields?.length > 0) {
                  newModel.fields = newModel.fields.map((field) => {
                    if (field.name === fieldName) {
                      resultField = { ...field, ...data };
                      return resultField;
                    }
                    return field;
                  });
                }
                return newModel;
              }

              return model;
            }),
            enums: adminSettings?.enums,
          };
          await prisma[lowerCaseAdmin].update({
            where: {
              id: adminId,
            },
            data: {
              adminSettings: JSON.stringify(newAdminSettings),
            },
          });
          return resultField;
        }
        return null;
      },
    });
    t.field('getMetadata', {
      type: 'Json',
      args: {
        pageUrl: nonNull('String'),
      },
      resolve: async (_, { pageUrl }, { prisma, userId, permission, utils }) => {
        const { data } = await axios.get(pageUrl);
        const Rules = [
          MetascraperTitle(),
          MetascraperDescription(),
          MetascraperImage(),
        ]
        const metascraper = Metascraper(Rules);
        const result = await metascraper({ html: data, url: pageUrl });

        return {
          sourceUrl: pageUrl,
          meta: result
        }
      },
    })
  },
});