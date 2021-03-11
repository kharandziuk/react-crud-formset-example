import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { setupStore } from "./store";
import { StoreProvider } from "easy-peasy";

import getPhotoByOleg from "./getPhotoByOleg.js";
import getPhotByMax from "./getPhotoByMax.js";

const store = setupStore();
[
  { firstName: "Max", lastName: "Kharandziuk", photo: getPhotByMax() },
  { firstName: "Oleg", lastName: "Zayarny", photo: getPhotoByOleg() },
  { firstName: "Other", lastName: "Man", photo: null },
].forEach((person) => {
  store.getActions().people.addPerson(person);
});
store.getActions().people.setActive(0);

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
