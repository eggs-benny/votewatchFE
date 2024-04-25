import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "src/store";
import Home from ".";
import { reducer as memberReducer, SliceStatusEnum } from "src/slices/member";
import { configureStore } from "@reduxjs/toolkit";
import { Member } from "src/models/member";
import * as router from "react-router";

const navigate = jest.fn();
beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

describe("Home component", () => {
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });

  test('displays "Welcome to Votewatch" text', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Welcome to Votewatch")).toBeInTheDocument();
  });

  test("renders search components", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(
      screen.getByRole("searchbox", { name: /Find MP.../i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("searchbox", { name: /Find Local MP.../i })
    ).toBeInTheDocument();
  });

  test("displays loading spinner when fetching members", () => {
    const store = configureStore({
      reducer: {
        member: memberReducer
      },
      preloadedState: {
        member: {
          members: [],
          status: SliceStatusEnum.LOADING,
          selectedMember: null,
          error: null
        }
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("navigate function mock works", () => {
    navigate("/test-route");
    expect(navigate).toHaveBeenCalledWith("/test-route");
  });

  test("dispatches selected member action and navigates to member page on button click", async () => {
    const mockMembers: Partial<Member>[] = [
      { value: {
          id: 185, nameDisplayAs: "Jeremy Corbyn",
          nameListAs: "",
          nameFullTitle: "",
          nameAddressAs: "",
          latestParty: undefined,
          gender: "",
          latestHouseMembership: undefined,
          thumbnailUrl: ""
      } }
    ];

    const store = configureStore({
      reducer: {
        member: memberReducer
      },
      preloadedState: {
        member: {
          members: mockMembers,
          status: SliceStatusEnum.SUCCEEDED,
          selectedMember: null,
          error: null
        }
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByRole("searchbox", { name: /Find MP.../i }), {
      target: { value: "Jeremy" }
    });
    fireEvent.keyPress(screen.getByRole("searchbox", { name: /Find MP.../i }), {
      key: "Enter",
      code: 13,
      charCode: 13
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Jeremy Corbyn/i })
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Jeremy Corbyn/i }));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "member/setSelectedMember",
      payload: mockMembers[0]
    });

    expect(navigate).toHaveBeenCalledWith("/member/185");
  });
});
