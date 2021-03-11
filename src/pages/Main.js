import * as mui from "@material-ui/core";
import List from "../components/List.js";
import Detail from "../components/Detail.js";

import { useStoreState, useStoreActions } from "easy-peasy";

function useMainHook() {
  const data = {
    people: useStoreState((store) => store.people.displayItems),
    selected: useStoreState((store) => store.people.selected),
    person: useStoreState((store) => store.people.selectedItem),
    isAdding: useStoreState((store) => store.people.isAdding),
  };
  const addPerson = useStoreActions((store) => store.people.addPerson);
  const changeItem = useStoreActions((store) => store.people.changeItem);

  const actions = {
    startAdding: useStoreActions((store) => store.people.startAdding),
    setActive: useStoreActions((store) => store.people.setActive),
    deleteItem: useStoreActions((store) => store.people.deleteItem),
    changeItem: data.isAdding ? addPerson : changeItem,
  };
  return { data, actions };
}

export default function Main({ useHook = useMainHook }) {
  const { data, actions } = useHook();
  return (
    <mui.Container>
      <mui.Grid container spacing={3}>
        <List {...{ data, actions }} />
        <Detail {...{ data, actions }} />
      </mui.Grid>
    </mui.Container>
  );
}
