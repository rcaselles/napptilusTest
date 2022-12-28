import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

test("Renders title", () => {
  render(<Header />);
  expect(screen.getByText("Oompa Loompa's Crew")).toBeTruthy();
});

test("logo is clickable", () => {
  render(<Header />);
  expect(screen.getByRole("img")).toHaveClass("logo");
});
