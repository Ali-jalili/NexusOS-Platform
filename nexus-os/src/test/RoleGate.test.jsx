/** @format */

import { render, screen, cleanup } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("../hooks/useAuth", () => ({
  default: vi.fn(),
}));

import useAuth from "../hooks/useAuth";
import RoleGate from "../app/routes/RoleGate";

function renderGate() {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <RoleGate allowedRoles={["admin"]} />,
        children: [{ index: true, element: <div>ADMIN CONTENT</div> }],
      },
      { path: "/login", element: <div>LOGIN PAGE</div> },
    ],
    { initialEntries: ["/"] },
  );

  return render(<RouterProvider router={router} />);
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("RoleGate", () => {
  it("renders page content when the role is allowed", async () => {
    useAuth.mockReturnValue({ role: "admin", isLoading: false });

    renderGate();

    expect(await screen.findByText("ADMIN CONTENT")).toBeInTheDocument();
  });

  it("redirects to /login when the user has no role", async () => {
    useAuth.mockReturnValue({ role: null, isLoading: false });

    renderGate();

    expect(await screen.findByText("LOGIN PAGE")).toBeInTheDocument();
  });
});
