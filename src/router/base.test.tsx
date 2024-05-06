import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "src/store";
import baseRoutes from "./base";

describe("404 Not Found Page", () => {
  test("renders 404 page on unknown route", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/homes"]}>
          <Routes>
            {baseRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(
      await screen.findByText("The page you were looking for doesn't exist.")
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: "Navigate back home." })
    ).toHaveAttribute("href", "/");
  });
});