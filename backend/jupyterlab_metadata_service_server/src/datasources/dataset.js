const { DataSource } = require('apollo-datasource');

let store = require('./data/dataset.json');
let nextId = store.length + 1;

class DatasetAPI extends DataSource {
  constructor() {
    super();
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  reducer(data) {
    return {
      id: data.id || 0,
      author: data.author,
      category: data.category, // TODO: check this type
      citation: data.citation,
      copyrightHolder: data.copyrightHolder,
      copyrightYear: data.copyrightYear,
      creator: data.creator,
      dateCreated: data.dateCreated,
      dateModified: data.dateModified,
      datePublished: data.datePublished,
      description: data.description,
      distribution: data.distribution,
      exampleOfWork: data.exampleOfWork,
      headline: data.headline,
      keywords: data.keywords,
      license: data.license,
      name: data.name,
      provider: data.provider,
      publisher: data.publisher,
      sourceOrganization: data.sourceOrganization,
      spatialCoverage: data.spatialCoverage,
      temporalCoverage: data.temporalCoverage,
      url: data.url,
      version: data.version
    }
  }

  fetchall() {
    return store.map(obj => this.reducer(obj));
  }

  getByID(id) {
    for (let i in store) {
      if (store[i].id == id) {
        return this.reducer(store[i]);
      }
    }
    return null;
  }

  insert(data) {
    data.id = "dataset/" + nextId++;
    store.push(data);
    return data;
  }

  deleteByID(id) {
    let result = null;

    if (store.length >= id) {
      for (let i in store) {
        if (store[i].id == id) {
          result = store.splice(i, 1)[0];
          break;
        }
      }
    }
    return result;
  }
}

module.exports = DatasetAPI;
