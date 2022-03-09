import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TNinePanel from "../pages/TNinePanel";
import userEvent from "@testing-library/user-event";

const setup = () => {
  const utils = render(<TNinePanel />);
  const inputElement = screen.getByTestId("input");
  const key = screen.getByTestId("button-3");
  return {
    key,
    inputElement,
    ...utils,
  };
};

test("Check if rendered", () => {
  render(<TNinePanel />);
  const firstElement = screen.getByText("T9 Keyboard");
  expect(firstElement).toBeInTheDocument();
  const lastElement = screen.getByText("Synonyms");
  expect(lastElement).toBeInTheDocument();
  const inputElement = screen.getByTestId("input");
  expect(inputElement).toBeInTheDocument();
  const key = screen.getByTestId("button-3");
  expect(key).toBeInTheDocument();
});

test("Check input validation", () => {
  const { inputElement } = setup();
  userEvent.type(inputElement, "+");
  expect(inputElement.value).toBe("");
  userEvent.type(inputElement, ",");
  expect(inputElement.value).toBe("");
  userEvent.type(inputElement, "text");
  expect(inputElement.value).toBe("");
});

test("Check click events", () => {
  const { key, inputElement } = setup();
  userEvent.dblClick(key);
  expect(inputElement.value).toBe("33");
});
