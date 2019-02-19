const { DataSource } = require('apollo-datasource');

let store = require('./data/person.json');
let nextId = store.lenght + 1;

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