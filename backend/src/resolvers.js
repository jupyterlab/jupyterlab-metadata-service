const datasets = []
let nextId = 1;

const resolvers = {
  Query: {
    Datasets: () => {
      return datasets.length ? datasets : [];
    },
  },
  Mutation: {
    addDataset: (root, args) => {
      const newDataset = {
        id: nextId++,
        name: args.name,
        license: args.license,
        datePublished: args.datePublished,
        url: args.url
      };
      datasets.push(newDataset);
      return {
        success: true,
        dataset: newDataset
      };
    },
  },
};

module.exports = resolvers