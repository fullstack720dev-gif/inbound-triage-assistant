### *A short, practical take-home for the **AI Product Engineer** role at Arootah. The build is deliberately small — what we’re really evaluating is how well you can **explain and defend the choices you made**.*

## 1. Background & Purpose

### Arootah is an alternative-investment and family-office advisory firm. The AI Product Engineer is a hands-on, part-time role: you’ll often be the **sole engineer** on a project — building full-stack web tools, wiring up data layers and workflow automations, and integrating AI/LLM services (such as Anthropic’s **Claude**) where they genuinely add value — shipping in tight cycles and documenting as you go.
This exercise is a small slice of that real job — and it’s meant to be **small**. You can move fast, and you’re encouraged to use AI. Because the build is easy, **the build itself isn’t what we weigh most** — we’re grading your **judgment and your ability to explain it**: how you read a loose brief, integrate an LLM cleanly, and reason about your own decisions. A short written **Engineering Rationale** (§4) carries the most weight, and you’ll be asked to expand on it in a live session. Polished code with hand-wavy reasoning scores low; a simple build you can clearly justify scores high. All data is synthetic for a fictional firm; nothing touches real Arootah systems. **Deadline:** within 5 calendar days of receiving this brief. We review submissions on a **rolling basis** — **the sooner you send it in, the sooner we review it** — so there’s no need to wait for the deadline.

## 2. The Challenge — “Inbound Triage Assistant”

**Northwind Advisors** (fictional) has a shared inbox full of free-text messages — prospective clients, vendors, existing-client requests, and the usual noise. Someone has to read each one, decide what it is and how urgent it is, and route it. Build a small tool that triages this queue with an **LLM**.

For each message, the LLM returns a **structured result**:

· a **one-line summary**

· a **category** (e.g. prospect / existing client / vendor / spam — your taxonomy)

· a **priority**: high / medium / low

· a **suggested next action**

Your tool displays these in a simple front end and keeps working when it hits a malformed message or an API error.

You’ll work from **inbound.json** — an array of ~13 messages, provided in **Appendix A** below. Each item looks like this:

{ "id": "inb-001",

"received_at": "2026-07-20T09:14:00-04:00",

"channel": "email",

"from_name": "Gregory Palmer",

"from_org": "(individual)",

"subject": "Wealth planning for a recent liquidity event",

"body": "I recently sold my company and have roughly $8M to put to work..."

}

Fields may be empty, and from_org may carry sentinels like (individual) or (unknown) — don’t treat those as real org names. The set **deliberately includes one or two malformed / edge-case items** (e.g. a near-empty or garbled body). We won’t say which — handling them gracefully is part of the test.

**MVP checklist:**

1. **List** the inbound items in a simple front end.
2. **Call an LLM per item** to produce the structured result.
3. **Display** the results clearly. *(Sorting/filtering by priority is a nice-to-have, not required.)*
4. **Handle the unhappy paths** — a malformed message and an API error — without the app falling over.

---

## 3. Constraints

| **Area**         | **Requirement**                                                                                                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scope**        | Keep it small and focused — a lean working tool, not a polished product. Do the core well; don’t gold-plate. Work at whatever pace suits you.                                                                                |
| **Front end**    | React **preferred** (it’s what the role uses), but not mandatory. Use what makes you fast and tell us why.                                                                                                                   |
| **Data layer**   | **Your choice** — Airtable as a backend, *or* a local store (SQLite / JSON file). **Either can score full marks.**                                                                                                           |
| **LLM**          | **Use any LLM you like** — Claude, GPT, Gemini, etc. Use a **current, valid model ID** for your chosen provider. *(The role uses Claude and Claude Code day-to-day, so familiarity is a plus — but it’s not required here.)* |
| **API key**      | Keep it **server-side** — never ship it to the browser. We can provide a **Claude** key on request, or use your own key for whichever LLM you choose (cost is pennies).                                                      |
| **Out of scope** | No auth, deployment/Docker, test-coverage targets, telemetry, or multi-user. A single-user tool that runs locally is exactly right.                                                                                          |

---

## 4. Deliverables

1. **A GitHub repository** with **≥ 3 meaningful commits** — push your work to GitHub and **share the repo link with us**.
2. **Engineering Rationale** — *this is the part we weigh most.* Answer these in your own words, **specific to your implementation** (a few sentences each; put them in your README or a [RATIONALE.md](http://RATIONALE.md)):

a. **Data & taxonomy** — why you chose these categories and priority definitions, and how your data model would hold up if the taxonomy doubled.

b. **Reliable structure** — how you got consistent structured output from the LLM, and what your code does when the model returns something malformed. *(Point to the relevant code.)*

c. **Where the model was wrong** — one concrete case where the LLM mis-triaged a message, and how you detected or handled it.

d. **Edge cases** — which inputs you treated as malformed / low-signal, what your tool does with them, and why you chose that behavior.

e. **Scale & risk** — what would break if this ran on 10,000 messages a day, and the biggest risk in shipping this to a real advisory firm (plus how you’d mitigate it).

Generic or hand-wavy answers score low, and **you’ll be asked to expand on these live** — so answer honestly about what *you* actually built.

3. **README (~1 page)** covering: **quick-start** (how to run it); **design choices & tradeoffs**; a **brief note** *(a few sentences)* on how you’d model this in **Airtable** (a table or two + one linked relationship) and **one n8n/Zapier automation** you’d add (trigger → action); and **how you used AI** (with one example where you overrode or corrected the model). Include a **.env.example**; never commit secrets.
4. **prompts/** **folder** — your LLM prompt(s) plus 2–3 lines on your approach (structure, parameters, how you enforce/validate the JSON output).
5. **Loom (≤ 3 min)** — run it live, and **briefly explain *why* you built it the way you did** (not just what it does), including one malformed/error case handled. *(We watch this for shortlisted candidates.)*

---

## 5. AI-Assist Policy

## Using AI is **expected and central** to this role. We build with LLMs and use AI coding tools like **Claude Code** to ship quickly. Reach for whatever makes you fast — you’ll **never** be penalized for it.
Because using AI is a given, we weight your **reasoning** most (see the rubric). A slick build with generic, AI-written explanations is easy to spot and won’t hold up in the live session — so build something you genuinely understand, and write the Engineering Rationale in your own words.

## 6. Evaluation Rubric

Each dimension is scored **1–5** and multiplied by its weight. We use the total to **rank** submissions — the strongest move forward (there’s no fixed pass mark).

|   | **Dimension**                            | **What a strong submission looks like**                                                                                                                            | **Weight** |
| - | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| 1 | **Engineering reasoning & articulation** | Clear, specific, honest answers in the Engineering Rationale; genuine understanding of your own choices; real tradeoffs and risks named — not generic or hand-wavy | **40%**    |
| 2 | **LLM integration**                      | Clear, parameterized prompt; structured/validated output; guardrails; graceful failure & edge handling                                                             | 20%        |
| 3 | **Product judgment & scoping**           | Sensible MVP cut; defensible assumptions; sensibly handles the malformed/edge items                                                                                | 15%        |
| 4 | **Build quality**                        | It runs; clean, readable code; a usable UI                                                                                                                         | 15%        |
| 5 | **Communication & reproducibility**      | Clear README + quick-start; prompts/ artifact; easy to run from scratch                                                                                            | 10%        |

---

## 7. What Happens Next

## We review on a **rolling basis** and score every submission against the rubric above. The **strongest submissions** move to a **30-minute live session**, where we extend the tool together (e.g. add a category, handle a new failure mode, add a filter) and dig into your Engineering Rationale. It’s a friendly, practical conversation — but a real one: **build something you genuinely understand, because you’ll be asked to defend and build on it live.**

## 8. Questions?

## Email [**luther.noche@arootah.com**](mailto:luther.noche@arootah.com). Happy building!

## Appendix A — inbound.json (sample data)

Copy this into a file named inbound.json and build against it.

[ {

"id": "inb-001",

"received_at": "2026-07-20T09:14:00-04:00",

"channel": "email",

"from_name": "Gregory Palmer",

"from_org": "(individual)",

"subject": "Wealth planning after a liquidity event",

"body": "I recently sold my business and have around $8M in proceeds to invest. Looking for help with tax-efficient planning and setting up a family office structure. Who should I speak with?"

},

{

"id": "inb-002",

"received_at": "2026-07-20T10:02:00-04:00",

"channel": "web-form",

"from_name": "Dana Whitfield",

"from_org": "(individual)",

"subject": "Need updated statement by Friday",

"body": "I'm an existing client and my mortgage lender needs an updated portfolio statement by this Friday. Can someone send it over? This is fairly time-sensitive."

},

{

"id": "inb-003",

"received_at": "2026-07-20T11:37:00-04:00",

"channel": "email",

"from_name": "Marcus Reed",

"from_org": "Lumen Analytics",

"subject": "Portfolio analytics platform — quick demo?",

"body": "Hi team, we sell portfolio analytics software used by 200+ RIAs. Would love 20 minutes to show you what we do. Are you free next week?"

},

{

"id": "inb-004",

"received_at": "2026-07-20T12:10:00-04:00",

"channel": "linkedin",

"from_name": "Priya N.",

"from_org": "TalentBridge Recruiting",

"subject": "Exciting opportunity",

"body": "Hello! I came across your profile and think you'd be a great fit for a senior role with one of my clients. Open to a chat this week?"

},

{

"id": "inb-005",

"received_at": "2026-07-20T13:22:00-04:00",

"channel": "voicemail-transcript",

"from_name": "Robert Ellison",

"from_org": "(individual)",

"subject": "",

"body": "Yeah, hi, this is Bob Ellison, I'm a client. I just saw a fee on my last statement I don't understand and frankly I'm not happy about it. Someone needs to call me back today."

},

{

"id": "inb-006",

"received_at": "2026-07-20T14:05:00-04:00",

"channel": "email",

"from_name": "Alicia Tran",

"from_org": "(individual)",

"subject": "Just exploring options",

"body": "No rush at all — I'm early in thinking about whether to work with an advisor and just gathering information. What's your minimum, and how do fees work?"

},

{

"id": "inb-007",

"received_at": "2026-07-20T15:18:00-04:00",

"channel": "web-form",

"from_name": "Jordan Massey",

"from_org": "Cedar Ridge Wealth",

"subject": "Possible referral partnership",

"body": "I run a small RIA and occasionally have clients whose needs fall outside our scope. Could we explore a referral arrangement?"

},

{

"id": "inb-008",

"received_at": "2026-07-20T15:41:00-04:00",

"channel": "email",

"from_name": "",

"from_org": "Market Daily",

"subject": "Your Monday market digest",

"body": "MARKETS: Equities edged higher... [automated newsletter] To unsubscribe click here."

},

{

"id": "inb-009",

"received_at": "2026-07-20T16:03:00-04:00",

"channel": "email",

"from_name": "Sam Cho",

"from_org": "(unknown)",

"subject": "Following up",

"body": "Hi — just following up on our conversation. Let me know the next step whenever you get a chance. Thanks!"

},

{

"id": "inb-010",

"received_at": "2026-07-20T16:29:00-04:00",

"channel": "web-form",

"from_name": "",

"from_org": "",

"subject": "",

"body": "."

},

{

"id": "inb-011",

"received_at": "2026-07-20T16:44:00-04:00",

"channel": "email",

"from_name": "=?utf-8?B?",

"from_org": "(unknown)",

"subject": "RE: RE: FWD:",

"body": "\x00\x00 ��� --- forwarded message truncated --- Content-Type: multipart/alternative; boundary=00000"

},

{

"id": "inb-012",

"received_at": "2026-07-20T17:06:00-04:00",

"channel": "email",

"from_name": "Helen Ortiz",

"from_org": "(individual)",

"subject": "Quarterly review scheduling",

"body": "Hi, existing client here — I'd like to get our quarterly review on the calendar sometime in the next few weeks. Mornings work best for me."

},

{

"id": "inb-013",

"received_at": "2026-07-20T17:52:00-04:00",

"channel": "email",

"from_name": "Nathan Brooks",

"from_org": "(individual)",

"subject": "Referred by Dana Whitfield",

"body": "Dana Whitfield, a client of yours, suggested I reach out. I'm looking for comprehensive planning for my family and would like to set up an intro call soon."

}

]