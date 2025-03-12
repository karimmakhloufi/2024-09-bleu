import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import AdDetailsPage from "../pages/AdDetailsPage";
import { GET_AD_BY_ID } from "../graphql/queries";

const getAdByIdMocks = [
  {
    delay: 30,
    request: {
      query: GET_AD_BY_ID,
      variables: {
        getAdByIdId: 1,
      },
    },
    result: {
      data: {
        getAdById: {
          id: 1,
          pictures: [{ id: "1", url: "lala" }],
          title: "Boat to sell",
          description: "I sell my boat",
          price: 150,
          user: {
            email: "boatseller@gmail.com",
          },
          location: "paris",
          createdAt: "date",
          category: {
            id: 1,
            title: "vehicles",
          },
        },
      },
    },
  },
];

test("displays ad card", async () => {
  render(
    <MockedProvider mocks={getAdByIdMocks} addTypename={false}>
      <MemoryRouter initialEntries={["/ad/1"]}>
        <Routes>
          <Route path="/ad/:id" element={<AdDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Boat to sell")).toBeInTheDocument();
});
