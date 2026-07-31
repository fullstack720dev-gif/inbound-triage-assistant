import { z } from "zod";

import { TRIAGE_CATEGORIES, TRIAGE_PRIORITIES } from "./triage-config";

export const TriageResultSchema = z.object({
  summary: z.string().trim().min(1).max(160),
  category: z.enum(TRIAGE_CATEGORIES),
  priority: z.enum(TRIAGE_PRIORITIES),
  suggested_action: z.string().trim().min(1).max(240),
});
