const { DataSource } = require('apollo-datasource');

let store = [{
  id: 'person/1',
  name: 'Igor Derke',
  image: 'https://media.licdn.com/dms/image/C4E03AQHzafiGiPqMUw/profile-displayphoto-shrink_800_800/0?e=1554336000&v=beta&t=PHPBXy0BCT113x_u2qIVjyVUAjVy1bqE1G7mcoCYJ94'
}];

let nextId = 2;

class PersonAPI extends DataSource {
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
      id: data.id || '0',
      name: data.name,
      email: data.email,
      image: data.image
    }
  }

  fetchall() {
    return store.map(obj => this.reducer(obj));
  }

  getByID(id) {
    // TODO: change to filter
    for (let i in store) {
      if (store[i].id == id) {
        return this.reducer(store[i]);
      }
    }
    return null;
  }

  insert(data) {
    data.id = "person/" + nextId++;
    store.push(data);
    return data;
  }

  deleteByID(id) {
    for (let i in store) {
      if (store[i].id == id) {
        return this.reducer(store.splice(i, 1)[0]);
      }
    }
    return null;
  }
}

module.exports = PersonAPI;