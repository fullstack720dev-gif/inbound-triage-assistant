import type { TRIAGE_CATEGORIES, TRIAGE_PRIORITIES } from "./triage-config";

export interface InboundMessage {
  id: string;
  received_at: string;
  channel: string;
  from_name: string;
  from_org: string;
  subject: string;
  body: string;
}

export type TriageCategory = (typeof TRIAGE_CATEGORIES)[number];
export type TriagePriority = (typeof TRIAGE_PRIORITIES)[number];

export interface TriageResult {
  summary: string;
  category: TriageCategory;
  priority: TriagePriority;
  suggested_action: string;
}
