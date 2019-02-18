const { DataSource } = require('apollo-datasource');

let store = [{
  id: '/clean.py',
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
  url: 'https://www.quansight.com/fakedata/clean.py'
},
{
  id: '/data.csv',
  author: {
    id: 'person/2',
    name: 'Jacob Houssian',
    image: 'https://avatars3.githubusercontent.com/u/24966946?s=88&v=4'
  },
  copyrightHolder: {
    id: 'person/2',
    name: 'Jacob Houssian',
    image: 'https://avatars3.githubusercontent.com/u/24966946?s=88&v=4'
  },
  copyrightYear: 2019,
  creator: {
    id: 'person/2',
    name: 'Jacob Houssian',
    image: 'https://avatars3.githubusercontent.com/u/24966946?s=88&v=4'
  },
  dateCreated: '2019-01-01T13:00:00Z',
  dateModified: '2019-01-03T13:00:00Z',
  datePublished: '2019-01-02T13:00:00Z',
  exampleOfWork: {
    id: 'creative_work/1',
    name: 'Hello world'
  },
  license: 'https://opensource.org/licenses/BSD-3-Clause',
  name: 'The best dataset!',
  provider: {
    id: 'organization/2',
    name: 'New York University'
  },
  publisher: {
    id: 'organization/2',
    name: 'New York University'
  },
  url: 'https://www.nyu.edu/fakedata/data.csv'
},
{
  id: '/data2.csv',
  author: {
    id: 'person/3',
    name: 'Ivan Ogasawara',
    image: 'https://avatars1.githubusercontent.com/u/5209757?s=88&v=4'
  },
  copyrightHolder: {
    id: 'person/3',
    name: 'Ivan Ogasawara',
    image: 'https://avatars1.githubusercontent.com/u/5209757?s=88&v=4'
  },
  copyrightYear: 2017,
  creator: {
    id: 'person/3',
    name: 'Ivan Ogasawara',
    image: 'https://avatars1.githubusercontent.com/u/5209757?s=88&v=4'
  },
  dateCreated: '2017-01-01T13:00:00Z',
  dateModified: '2017-01-03T13:00:00Z',
  datePublished: '2017-01-02T13:00:00Z',
  exampleOfWork: {
    id: 'creative_work/1',
    name: 'Hello world'
  },
  license: 'https://opensource.org/licenses/BSD-3-Clause',
  name: 'The other best dataset!',
  provider: {
    id: 'organization/3',
    name: 'California Polytechnic State University'
  },
  publisher: {
    id: 'organization/3',
    name: 'California Polytechnic State University'
  },
  url: 'https://www.calpoly.edu/fakedata/data.csv'
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
