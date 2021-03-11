import React from "react";

import Page from "./Main";
import { setupStore } from "../store";
import { StoreProvider } from "easy-peasy";
import getPhotoByMax from "../getPhotoByMax";

export default {
  title: "Example/MainPage",
  component: Page,
};

export const ViewExistedPersonWithPhoto = () => {
  const store = setupStore();
  store.getActions().people.addPerson({
    firstName: "Max",
    lastName: "Kharandziuk",
    photo: getPhotoByMax(),
  });
  return (
    <StoreProvider store={store}>
      <Page />;
    </StoreProvider>
  );
};

export const ViewExistedPersonWithoutPhoto = () => {
  const store = setupStore();
  store.getActions().people.addPerson({
    firstName: "Max",
    lastName: "Kharandziuk",
    photo: null,
  });
  store
    .getActions()
    .people.addPerson({ firstName: "Other", lastName: "Person", photo: null });
  return (
    <StoreProvider store={store}>
      <Page />;
    </StoreProvider>
  );
};

export const NewPerson = () => {
  const store = setupStore();
  store.getActions().people.startAdding();
  return (
    <StoreProvider store={store}>
      <Page />;
    </StoreProvider>
  );
};
