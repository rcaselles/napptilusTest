import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Card from "../Card";

test("loads and prints content", () => {
  render(<Card>Testing card content</Card>);
  //If card renders child it is correct
  expect(screen.getByText("Testing card content")).toBeTruthy();
});

test("adds classes", () => {
  render(<Card className="card-beautiful">Testing card content</Card>);
  //If card has class
  expect(screen.getByText("Testing card content")).toHaveClass(
    "card-beautiful"
  );
});
