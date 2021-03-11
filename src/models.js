import _ from "lodash";

import { createStore, action, computed } from "easy-peasy";

const people = {
  items: [],
  selected: 0,
  newPerson: null,

  selectedItem: computed(
    [(state) => state.newPerson || state.items[state.selected]],
    (x) => x
  ),
  displayItems: computed([(state) => state.items], (x) => x),
  isAdding: computed([(state) => state.newPerson], (x) => _.isObject(x)),

  setActive: action((state, payload) => {
    return {
      ...state,
      selected: payload,
      newPerson: null,
    };
  }),
  deleteItem: action((state, payload) => {
    state.items = _.reject(state.items, (x, i) => i === payload);
    return Object.assign({}, state);
  }),
  changeItem: action((state, payload) => {
    return {
      ...state,
      items: state.items.map((el, i) => (i === state.selected ? payload : el)),
    };
  }),
  addPerson: action((state, payload) => {
    return {
      ...state,
      items: [...state.items, payload],
      selected: state.items.length,
      newPerson: null,
    };
  }),
  startAdding: action((state, payload) => {
    return {
      ...state,
      selected: null,
      newPerson: {
        firstName: "",
        lastName: "",
        photo: "",
      },
    };
  }),
};

export { people };
