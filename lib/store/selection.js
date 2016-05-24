import Store from './store';


class SelectionStore extends Store {

  constructor() {
    super();

    this.bounds = null;
  }

}

export default new SelectionStore();