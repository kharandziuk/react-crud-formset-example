import { createStore } from "easy-peasy";
import _ from "lodash";
import { people } from "./models";

const setupStore = () => {
  const model = { people };

  const store = createStore(model, {
    disableImmer: true,
  });
  return store;
};

const store = setupStore();

export { setupStore };
export default store;
