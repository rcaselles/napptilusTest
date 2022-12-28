import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "../Input";

test("it renders a text input", () => {
  render(<Input />);
  expect(screen.getByRole("textbox")).toBeTruthy();
});

test("supports external classes", () => {
  render(<Input className="text-input" />);
  expect(screen.getByRole("textbox")).toHaveClass("text-input");
});
