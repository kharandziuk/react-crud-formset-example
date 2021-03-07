import { createStore, thunk, action } from "easy-peasy";
import axios from "axios";

const setupStore = (service) => {
  const people = {
    items: [{ name: "Max" }],
  };

  const model = { people };

  const store = createStore(model);
  return store;
};

const store = setupStore();

export default store;
