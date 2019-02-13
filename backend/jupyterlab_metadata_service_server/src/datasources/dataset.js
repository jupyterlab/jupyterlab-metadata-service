const { DataSource } = require('apollo-datasource');

let store = [{
  id: 'dataset/1',
  author: {
    id: 'person/1',
    name: 'Igor Derke',
    image: 'https://media.licdn.com/dms/image/C4E03AQHzafiGiPqMUw/profile-displayphoto-shrink_800_800/0?e=1554336000&v=beta&t=PHPBXy0BCT113x_u2qIVjyVUAjVy1bqE1G7mcoCYJ94'
  },
  copyrightHolder: {
    id: 'person/1',
    name: 'Igor Derke',
    image: 'https://media.licdn.com/dms/image/C4E03AQHzafiGiPqMUw/profile-displayphoto-shrink_800_800/0?e=1554336000&v=beta&t=PHPBXy0BCT113x_u2qIVjyVUAjVy1bqE1G7mcoCYJ94'
  },
  copyrightYear: 2019,
  creator: {
    id: 'person/1',
    name: 'Igor Derke',
    image: 'https://media.licdn.com/dms/image/C4E03AQHzafiGiPqMUw/profile-displayphoto-shrink_800_800/0?e=1554336000&v=beta&t=PHPBXy0BCT113x_u2qIVjyVUAjVy1bqE1G7mcoCYJ94'
  },
  dateCreated: '2015-10-13T13:00:00Z',
  dateModified: '2015-10-13T13:00:00Z',
  datePublished: '2015-10-13T13:00:00Z',
  exampleOfWork: {
    id: 'creative_work/1',
    name: 'Hello world'
  },
  license: 'https://opensource.org/licenses/BSD-3-Clause',
  name: 'quansight-web-page',
  provider: {
    id: 'organization/1',
    name: 'Quansight'
  },
  publisher: {
    id: 'organization/1',
    name: 'Quansight'
  },
  url: 'https://www.quansight.com/'
}];
let nextId = 2;

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
      copyrightHolder: data.copyrightHolder,
      copyrightYear: data.copyrightYear,
      creator: data.creator,
      dateCreated: data.dateCreated,
      dateModified: data.dateModified,
      datePublished: data.datePublished,
      exampleOfWork: data.exampleOfWork,
      license: data.license,
      name: data.name,
      provider: data.provider,
      publisher: data.publisher,
      url: data.url
    }
  }

  fetchall() {
    return store.map(obj => this.reducer(obj));
  }

  getByID(id) {
    return store.length >= id
      ? this.reducer(store[id - 1])
      : null;
  }

  insert(data) {
    data.id = nextId++;
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