import inboundData from "@/data/inbound.json";
import type { InboundMessage } from "@/lib/types";

const messages = inboundData as InboundMessage[];

const MISSING_ORG_SENTINELS = new Set(["(individual)", "(unknown)"]);

function displayOrg(fromOrg: string): string | null {
  const trimmed = fromOrg.trim();
  if (!trimmed || MISSING_ORG_SENTINELS.has(trimmed.toLowerCase())) {
    return null;
  }
  return trimmed;
}

function orFallback(value: string, fallback: string): string {
  const trimmed = value.trim();
  return trimmed ? value : fallback;
}

function formatReceivedAt(receivedAt: string): string {
  const date = new Date(receivedAt);
  if (Number.isNaN(date.getTime())) {
    return receivedAt || "(unknown time)";
  }
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function Home() {
  return (
    <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl px-6 py-12">
        <h1 className="mb-2 text-2xl font-semibold text-black dark:text-zinc-50">
          Inbound Messages
        </h1>
        <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
          {messages.length} message{messages.length === 1 ? "" : "s"} in the
          queue.
        </p>

        <ul className="flex flex-col gap-4">
          {messages.map((message) => {
            const org = displayOrg(message.from_org);
            return (
              <li
                key={message.id}
                className="rounded-lg border border-black/[.08] bg-white p-4 dark:border-white/[.145] dark:bg-zinc-950"
              >
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-mono">{message.id}</span>
                  <span>{formatReceivedAt(message.received_at)}</span>
                  <span className="uppercase tracking-wide">
                    {orFallback(message.channel, "unknown channel")}
                  </span>
                </div>

                <div className="mb-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <span className="font-medium text-black dark:text-zinc-50">
                    {orFallback(message.from_name, "(no name provided)")}
                  </span>
                  {org ? <span> · {org}</span> : null}
                </div>

                <div className="mb-2 font-medium text-black dark:text-zinc-50">
                  {orFallback(message.subject, "(no subject)")}
                </div>

                <p className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
                  {orFallback(message.body, "(empty message body)")}
                </p>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
