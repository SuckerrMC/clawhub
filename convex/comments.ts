import { v } from "convex/values";
import { query } from "./functions";

/**
 * Keep stale clients harmless after skill comments were retired.
 *
 * The compatibility query intentionally does not read legacy comment data. Old
 * clients already treat an empty list as a valid response, while current
 * clients no longer call this API.
 */
export async function listBySkillHandler() {
  return [];
}

export const listBySkill = query({
  args: { skillId: v.id("skills"), limit: v.optional(v.number()) },
  handler: listBySkillHandler,
});
