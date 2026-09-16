/// <reference types="vite/client" />
/* @vitest-environment edge-runtime */

import { convexTest } from "convex-test";
import { getFunctionName } from "convex/server";
import { describe, expect, it } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

describe("retired skill comments compatibility", () => {
  it("keeps the historical public function name registered", () => {
    expect(getFunctionName(api.comments.listBySkill)).toBe("comments:listBySkill");
  });

  it("returns an empty list through the public query for stale clients", async () => {
    const t = convexTest(schema, modules);
    const skillId = await t.run(async (ctx) => {
      const ownerUserId = await ctx.db.insert("users", {});
      return await ctx.db.insert("skills", {
        slug: "legacy-comment-client",
        displayName: "Legacy comment client fixture",
        ownerUserId,
        tags: {},
        stats: { comments: 0, downloads: 0, stars: 0, versions: 0 },
        createdAt: 1,
        updatedAt: 1,
      });
    });

    await expect(t.query(api.comments.listBySkill, { skillId, limit: 50 })).resolves.toEqual([]);
  });
});
