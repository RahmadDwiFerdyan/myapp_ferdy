import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import * as nextRouter from "next/router";
import * as swr from "swr";
import TampilanProduk from "@/pages/produk";

describe("Product Page", () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(nextRouter, "useRouter").mockReturnValue({
      route: "/produk",
      pathname: "/produk",
      query: {},
      asPath: "/produk",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      isReady: true,
    } as any);

    jest.spyOn(swr, "default").mockReturnValue({
      data: { data: [] },
      error: undefined,
      isLoading: false,
    } as any);
  });

  it("renders product page correctly", () => {
    const page = render(<TampilanProduk />);

    expect(screen.getByText("Daftar Produk")).toBeTruthy();
    expect(page).toMatchSnapshot();
  });
});