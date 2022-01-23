/* eslint-disable no-undef */
import ModalComponent from "./index";
import React from "react";

import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("should take a snapshot", () => {
  const open = jest.fn();
  const close = jest.fn();
  const { asFragment } = render(
    <ModalComponent isOpen={true} open={open} close={close}>
      <span>ModalComponent test text</span>
    </ModalComponent>
  );

  expect(
    asFragment(
      <ModalComponent isOpen={true} open={open} close={close}>
        <span>ModalComponent test text</span>
      </ModalComponent>
    )
  ).toMatchSnapshot();
});

it("should render children when isOpen is true", () => {
  const open = jest.fn();
  const close = jest.fn();
  const component = render(
    <ModalComponent isOpen={true} open={open} close={close}>
      <span>ModalComponent test text</span>
    </ModalComponent>
  );
  expect(component.getByTestId("modal")).toHaveTextContent(
    "ModalComponent test text"
  );
});

it("should NOT render children when isOpen is false", () => {
  const open = jest.fn();
  const close = jest.fn();
  const { container } = render(
    <ModalComponent isOpen={false} open={open} close={close}>
      <span>ModalComponent test text</span>
    </ModalComponent>
  );
  const emptyBody = container.querySelector("body");
  expect(emptyBody).toBeNull();
});
