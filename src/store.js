import { createStore, thunk, action, computed } from "easy-peasy";
import axios from "axios";
import _ from "lodash";
import getPhoto from "./getPhoto.js";

const setupStore = (service) => {
  const people = {
    items: [
      { firstName: "Max", lastName: "Kharandziuk", photo: null },
      { firstName: "Other", lastName: "Man", photo: null },
    ],
    selected: 0,
    selectedItem: computed([(state) => state.items[state.selected]], (x) => x),
    setActive: action((state, payload) => {
      state.selected = payload;
      return Object.assign({}, state);
    }),
    deleteItem: action((state, payload) => {
      state.items = _.reject(state.items, (x, i) => i === payload);
      return Object.assign({}, state);
    }),
    changeItem: action((state, payload) => {
      const items = state.items;
      return {
        ...state,
        items: state.items.map((el, i) =>
          i === state.selected ? payload : el
        ),
      };
    }),
  };

  const model = { people };

  const store = createStore(model, {
    disableImmer: true,
  });
  return store;
};

const store = setupStore();

export default store;
