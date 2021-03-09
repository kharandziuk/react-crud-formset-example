import { createStore, thunk, action, computed } from "easy-peasy";
import axios from "axios";

const setupStore = (service) => {
  const people = {
    items: [
      { firstName: "Max", lastName: "Kharandziuk" },
      { firstName: "Other", lastName: "Man" },
    ],
    selected: 0,
    selectedItem: computed([(state) => state.items[state.selected]], (x) => x),
    setActive: action((state, payload) => {
      state.selected = payload;
    }),
    deleteItem: action((state, payload) => {
      state.items.slice(payload, 1);
    }),
    changeItem: action((state, payload) => {
      state.items[state.selected] = payload;
    }),
  };

  const model = { people };

  const store = createStore(model);
  return store;
};

const store = setupStore();

export default store;
