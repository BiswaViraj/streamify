import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, afterEach, expect } from "vitest";
import "@testing-library/jest-dom";
import UserGrowth from "../components/dashboard/charts-section/user-growth";
import * as useUserGrowthHook from "@/hooks/useUserGrowth";

// Mock the useUserGrowth hook
vi.mock("@/hooks/useUserGrowth");

// Mock UI components
vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardAction: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock("@/components/ui/chart", () => ({
  ChartContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ChartTooltip: () => <div>Tooltip</div>,
  ChartTooltipContent: () => <div>TooltipContent</div>,
}));
vi.mock("@/components/ui/select", () => ({
  Select: (
    props: React.SelectHTMLAttributes<HTMLSelectElement> & {
      children: React.ReactNode;
    }
  ) => <select {...props}>{props.children}</select>,
  SelectContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SelectGroup: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SelectItem: (
    props: React.OptionHTMLAttributes<HTMLOptionElement> & {
      children: React.ReactNode;
    }
  ) => <option {...props}>{props.children}</option>,
  SelectLabel: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SelectValue: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock("@/components/ui/skeleton", () => ({
  Skeleton: () => <div data-testid="skeleton">Loading...</div>,
}));
vi.mock("recharts", () => ({
  CartesianGrid: () => <div>CartesianGrid</div>,
  Line: () => <div>Line</div>,
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  XAxis: () => <div>XAxis</div>,
}));

describe("UserGrowth (Vitest)", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading skeleton when pending", () => {
    vi.spyOn(useUserGrowthHook, "useUserGrowth").mockReturnValue({
      growth: [],
      isPending: true,
    } as never);
    render(<UserGrowth />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders chart and total users", () => {
    vi.spyOn(useUserGrowthHook, "useUserGrowth").mockReturnValue({
      growth: [
        { label: "2024-01-01", count: 10 },
        { label: "2024-02-01", count: 20 },
      ],
      isPending: false,
    } as never);
    render(<UserGrowth />);
    expect(screen.getByText("User Growth")).toBeInTheDocument();
    expect(screen.getByText("Total Users:")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("changes time period when select is changed", () => {
    vi.spyOn(useUserGrowthHook, "useUserGrowth").mockReturnValue({
      growth: [
        { label: "2024-01-01", count: 10 },
        { label: "2024-02-01", count: 20 },
      ],
      isPending: false,
    } as never);
    render(<UserGrowth />);
    fireEvent.change(screen.getByTestId("select-time-period"), {
      target: { value: "6" },
    });
    expect(screen.getByText("Last 6 Months")).toBeInTheDocument();
  });
});
