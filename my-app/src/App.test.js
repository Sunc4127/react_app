
import App from './App';
import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import Dog from './components/dogs.jsx';

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
});



it("renders loading language", () => {
  render(<App />);
  expect(
    screen.getByText("Images and Videos Loading......")
  ).toBeInTheDocument();
});

test("Check the length of the list", () => {
  let dog = new Dog();
  return dog.componentDidMount().then(() => {
      expect(dog.state.dogs.length).toBe(8);
  });
});
