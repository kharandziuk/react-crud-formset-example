import _ from "lodash";

import { action, computed } from "easy-peasy";

import Joi from "joi";
import joiPhoneNumber from "joi-phone-number";

const CJoi = Joi.extend(joiPhoneNumber);

const personSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  phone: CJoi.string().phoneNumber(),

  birthYear: Joi.number().integer().min(1900).max(2013),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  photo: Joi.string().base64().allow(""),
});

const getPerson = (values = {}, skipValidation = false) => {
  const result = Object.assign(values, {
    firstName: "",
    lastName: "",
    photo: "",
    phone: "",
    birthYear: null,
    email: "",
  });
  if (!skipValidation) {
    personSchema.assert(result);
  }
  return result;
};

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
      newPerson: getPerson({}, true),
    };
  }),
};

export { people, getPerson, personSchema };
