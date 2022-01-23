/* eslint-disable no-undef */
import React from "react";
import Navbar from "./index";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../utils/mockup-store";
import { login } from "../../../utils/mockup-store";

afterEach(cleanup);

const renderedNav = (
  <Provider store={store}>
    <Router>
      <Navbar />
    </Router>
  </Provider>
);

it("should take a snapshot", () => {
  const { asFragment } = render(renderedNav);

  expect(asFragment(<Navbar />)).toMatchSnapshot();
});

it("should NOT render user details", () => {
  const component = render(renderedNav);
  expect(component.getByTestId("user-details-login")).toHaveTextContent(
    "Login"
  );
  expect(component.getByTestId("user-details-register")).toHaveTextContent(
    "Register"
  );
});

it("should render user details", async () => {
  await store.dispatch(login());

  const component = render(renderedNav);
  expect(component.getByTestId("user-details-logout")).toHaveTextContent(
    "Logout"
  );
  expect(component.getByTestId("user-details-avatar")).toHaveTextContent("T T");
});
