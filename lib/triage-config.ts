export const TRIAGE_CATEGORIES = [
  "prospect",
  "existing_client",
  "referral_partner",
  "vendor",
  "recruiting",
  "newsletter_or_spam",
  "unclear_or_malformed",
] as const;

export const TRIAGE_CATEGORY_DESCRIPTIONS: Record<
  (typeof TRIAGE_CATEGORIES)[number],
  string
> = {
  prospect:
    "A potential new client inquiring about the firm's services (e.g. wealth planning, investment management).",
  existing_client:
    "A message from someone who explicitly identifies themselves as a current client of the firm.",
  referral_partner:
    "Another advisor, RIA, or firm proposing a referral relationship or partnership.",
  vendor:
    "A company or individual selling a product or service to the firm (software, analytics, etc.).",
  recruiting:
    "A recruiter or job opportunity outreach unrelated to client work.",
  newsletter_or_spam:
    "Automated newsletters, mass marketing, or other low-signal/unsolicited bulk content.",
  unclear_or_malformed:
    "The message does not contain enough evidence to confidently assign any other category, or its content is corrupted/unreadable.",
};

export const TRIAGE_PRIORITIES = ["high", "medium", "low"] as const;

export const TRIAGE_PRIORITY_RULES: Record<
  (typeof TRIAGE_PRIORITIES)[number],
  string
> = {
  high: "Explicit deadline, a same-day request, a dissatisfied existing client, or meaningful financial or relationship risk.",
  medium:
    "Legitimate human follow-up is required, but there is no immediate deadline.",
  low: "No urgency: unsolicited outreach, recruiting, newsletters, spam, or insufficient information to act on.",
};
