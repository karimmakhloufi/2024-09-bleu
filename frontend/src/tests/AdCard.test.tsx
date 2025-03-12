import "@testing-library/jest-dom"; // TODO check if needed
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // This in needed for tests
import AdCard from "../components/AdCard";

test("displays ad card", async () => {
  render(
    <MemoryRouter>
      <AdCard
        title="Ad Title"
        category={{ id: 1, title: "category title" }}
        id={1}
        pictures={[{ id: 1, url: "picture url" }]}
        price={150}
      />
    </MemoryRouter>
  );
  expect(await screen.findByText("Ad Title")).toBeInTheDocument();
});
