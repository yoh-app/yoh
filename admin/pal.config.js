module.exports = {
  backend: {
    generator: 'nexus',
    onDelete: true,
    output: 'src/server/graphql/models',
  },
  frontend: {
    admin: true,
    graphql: {
      output: 'src/graphql/generated',
    },
  },
};
