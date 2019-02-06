const { DataSource } = require('apollo-datasource');

// test data
let store = [{
  id: 'anno/1',
  target: 'clean.py',
  context: 'http://www.w3.org/ns/anno.jsonld',
  label: 'Meta',
  resolved: true,
  body: [{
    creator: {
      id: 'person/1',
      type: 'Person',
      name: 'Igor Derke',
      image: 'https://media.licdn.com/dms/image/C4E03AQHzafiGiPqMUw/profile-displayphoto-shrink_800_800/0?e=1554336000&v=beta&t=PHPBXy0BCT113x_u2qIVjyVUAjVy1bqE1G7mcoCYJ94'
    },
    created: '2015-10-13T13:00:00Z',
    value:
      'Lorem iappveyor.ymlsicing elit. Similique accusamus ut placeat eum, veritatis est sit. Maxime ipsum, delectus enim, laudantium excepturi corrupti eligendi corporis',
  }, {
    creator: {
      id: 'person/1',
      type: 'Person',
      name: 'Igor Derke',
      image: 'https://media.licdn.com/dms/image/C4E03AQHzafiGiPqMUw/profile-displayphoto-shrink_800_800/0?e=1554336000&v=beta&t=PHPBXy0BCT113x_u2qIVjyVUAjVy1bqE1G7mcoCYJ94'
    },
    created: '2015-10-15T13:00:00Z',
    value: 'this comment resolved the problem.'
  }],
  total: 2
}, {
  id: 'anno/2',
  target: 'clean.py',
  context: 'http://www.w3.org/ns/anno.jsonld',
  label: 'Meta2',
  resolved: true,
  body: [{
    creator: {
      id: 'person/1',
      type: 'Person',
      name: 'Igor Derke',
      image: 'https://media.licdn.com/dms/image/C4E03AQHzafiGiPqMUw/profile-displayphoto-shrink_800_800/0?e=1554336000&v=beta&t=PHPBXy0BCT113x_u2qIVjyVUAjVy1bqE1G7mcoCYJ94'
    },
    created: '2015-11-13T13:00:00Z',
    value:
      'Lorem iappveyor.ymlsicing elit. Similique accusamus ut placeat eum, veritatis est sit. Maxime ipsum, delectus enim, laudantium excepturi corrupti eligendi corporis',
  }, {
    creator: {
      id: 'person/1',
      type: 'Person',
      name: 'Igor Derke',
      image: 'https://media.licdn.com/dms/image/C4E03AQHzafiGiPqMUw/profile-displayphoto-shrink_800_800/0?e=1554336000&v=beta&t=PHPBXy0BCT113x_u2qIVjyVUAjVy1bqE1G7mcoCYJ94'
    },
    created: '2015-11-15T13:00:00Z',
    value: 'this comment resolved the problem.'
  }],
  total: 2
}
];
let nextId = 3;

class AnnotationAPI extends DataSource {
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
      body: data.body,
      context: data.context,
      created: data.created,
      creator: data.creator,
      label: data.label,
      target: data.target,
      total: data.total
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

  getByField(field_name, value) {
    for (let i in store) {
      if (store[i][field_name] == value) {
        return store[i]
      }
    }

    return null;
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

module.exports = AnnotationAPI;