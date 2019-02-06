const { DataSource } = require('apollo-datasource');

let store = [];
let nextId = 1;

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
      name: data.name
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