import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { SearchInsightReport } from "../../../convex/lib/searchInsights";
import { SearchInsightsPage } from "./SearchInsightsPage";

const { getReport } = vi.hoisted(() => ({ getReport: vi.fn() }));
vi.mock("convex/react", () => ({ useAction: () => getReport }));

const report: SearchInsightReport = {
  artifactKind: "plugin",
  scope: null,
  window: { endDay: 1_789_430_400_000, start7d: 0, startPrevious7d: 0, start30d: 0, days: 7 },
  source: null,
  generatedAt: 1_789_430_400_000,
  metadataCheckedAt: null,
  currentMetadataStatus: "unavailable",
  coverage: { dataThrough: null, collectionStartedAt: null, gapStart: null, gapEnd: null },
  totalQueries: 0,
  totalSearches7d: 33,
  sources7d: { "clawhub-web": 26, "openclaw-control-ui": 7 },
  truncated: false,
  classificationStatus: "unavailable",
  classificationRun: null,
  rows: [],
};

describe("SearchInsightsPage", () => {
  it("removes the previous report when a filter fails and shows the selected source after retry", async () => {
    getReport
      .mockResolvedValueOnce(report)
      .mockRejectedValueOnce(new Error("Report unavailable"))
      .mockResolvedValueOnce({
        ...report,
        source: "openclaw-control-ui",
        totalSearches7d: 7,
        sources7d: { "clawhub-web": 0, "openclaw-control-ui": 7 },
      });
    render(<SearchInsightsPage />);
    await screen.findByText("33");

    fireEvent.change(screen.getByRole("combobox", { name: "Source" }), {
      target: { value: "openclaw-control-ui" },
    });
    await screen.findByRole("alert");
    expect(screen.queryByRole("table")).toBeNull();
    expect(screen.queryByText("33")).toBeNull();
    expect(screen.queryByText("searches in 7 days")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    await screen.findByRole("table");
    await waitFor(() => expect(screen.queryByRole("alert")).toBeNull());
    expect(screen.queryByText("33")).toBeNull();
    expect(screen.getAllByText("7")).toHaveLength(2);
    expect(getReport.mock.lastCall?.[0].source).toBe("openclaw-control-ui");
  });
});
