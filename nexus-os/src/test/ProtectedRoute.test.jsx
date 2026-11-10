/** @format */

import { render, screen, cleanup } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("../hooks/useAuth", () => ({
  default: vi.fn(),
}));

import useAuth from "../hooks/useAuth";
import ProtectedRoute from "../app/routes/ProtectedRoute";

function renderGuard(initialPath) {
  const router = createMemoryRouter(
    [
      {
        path: "/app",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <div>PROTECTED CONTENT</div> }],
      },
      { path: "/login", element: <div>LOGIN PAGE</div> },
    ],
    { initialEntries: [initialPath] },
  );

  return render(<RouterProvider router={router} />);
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("ProtectedRoute", () => {
  it("renders content when the user is logged in", async () => {
    useAuth.mockReturnValue({ user: { id: "u1" }, isLoading: false });

    renderGuard("/app");

    expect(await screen.findByText("PROTECTED CONTENT")).toBeInTheDocument();
  });

  it("redirects to /login when the user is not logged in", async () => {
    useAuth.mockReturnValue({ user: null, isLoading: false });

    renderGuard("/app");

    expect(await screen.findByText("LOGIN PAGE")).toBeInTheDocument();
  });
});
