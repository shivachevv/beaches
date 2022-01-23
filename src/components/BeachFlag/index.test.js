/* eslint-disable no-undef */
import { render, cleanup } from "@testing-library/react";
import BeachFlag from "./index";
import React from "react";
import { getBeachFlagColor } from "./../../utils/helpers";

afterEach(cleanup);

test("BeachFlag component styles calculate correctly", () => {
  const beach = {
    flag: "green",
    available: 30,
    description:
      "One of the cleanest beaches on the Black Sea coast, Pomorie is frequented mostly by middle age holidaymakers so you can expect less noise and a smaller choice of bars and night clubs.",
    name: "Pomorie Beach",
    beachAdminId: "U1UWnl8HMNAdkY7YINtJ",
    id: "CPQjW6eJYXerxW5ZlrZG",
    slug: "pomorie",
    coordinates: { lat: 42.56681659986213, lng: 27.640173218861428 },
    lng: 27.640173218861428,
    lat: 42.56681659986213,
    prices: { seat: 10, umbrella: 10 },
    umbrella: 10,
    seat: 10,
    capacity: 100,
  };
  const size = "100px";

  const component = render(<BeachFlag beach={beach} size={size} />);

  let tree = component.getByTestId("avatar");
  expect(tree).toHaveStyle(`width: ${size}`);
  expect(tree).toHaveStyle(`height: ${size}`);
  expect(tree).toHaveStyle(
    `background-color: ${getBeachFlagColor(beach.flag)};`
  );
});
