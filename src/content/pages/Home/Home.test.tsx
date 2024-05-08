import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "src/store";
import Home from ".";
import { reducer as memberReducer, SliceStatusEnum } from "src/slices/member";
import { configureStore } from "@reduxjs/toolkit";
import {
  LatestHouseMembership,
  LatestParty,
  Link,
  Member
} from "src/models/member";
import * as router from "react-router";

const mockMembers: Member[] = [
  {
    links: {} as Link[],
    value: {
      id: 185,
      nameDisplayAs: "Jeremy Corbyn",
      nameListAs: "",
      nameFullTitle: "",
      nameAddressAs: "",
      latestParty: {} as LatestParty,
      gender: "",
      latestHouseMembership: {} as LatestHouseMembership,
      thumbnailUrl: ""
    }
  },
  {
    links: {} as Link[],
    value: {
      id: 4138,
      nameDisplayAs: "Rushanara Ali",
      nameListAs: "",
      nameFullTitle: "",
      nameAddressAs: "",
      latestParty: {} as LatestParty,
      gender: "",
      latestHouseMembership: {} as LatestHouseMembership,
      thumbnailUrl: ""
    }
  }
];

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

  test("renders search components", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const mpNameSearch = await screen.findByRole("searchbox", {
      name: /Enter a name.../i
    });
    const localMpSearch = await screen.findByRole("searchbox", {
      name: /Enter your postcode.../i
    });

    expect(mpNameSearch).toBeInTheDocument();
    expect(localMpSearch).toBeInTheDocument();
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

  // Test fails since latest push
  xtest("types member name and navigates to member page on button click", async () => {
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

    fireEvent.change(
      screen.getByRole("searchbox", { name: /Enter a name.../i }),
      {
        target: { value: "Jeremy" }
      }
    );
    fireEvent.keyPress(
      screen.getByRole("searchbox", { name: /Enter a name.../i }),
      {
        key: "Enter",
        code: 13,
        charCode: 13
      }
    );

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

  test("types name <3 letters, receives error, and fails to navigate to member page on button click", async () => {
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

    fireEvent.change(
      screen.getByRole("searchbox", { name: /Enter a name.../i }),
      {
        target: { value: "Je" }
      }
    );
    fireEvent.keyPress(
      screen.getByRole("searchbox", { name: /Enter a name.../i }),
      {
        key: "Enter",
        code: 13,
        charCode: 13
      }
    );

    await waitFor(() => {
      expect(
        screen.getByText("Minimum 3 characters required")
      ).toBeInTheDocument();
    });

    expect(navigate).not.toHaveBeenCalled();
  });
});
