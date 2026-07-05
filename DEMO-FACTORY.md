# LeadaLine Demo Factory

Internal sales tool. Turn a prospect's website into a **complete, personalised
LeadaLine demo package** in minutes — so every demo feels like we spent days
preparing for that one business.

> Enter a website → press **Generate Demo** → walk into the call with a full,
> branded sales package: live demo, opportunities report, dashboard, proposal,
> AI receptionist prompt, follow-up email and a founder-only meeting brief.

Open **[`factory/index.html`](factory/index.html)** in a browser. No build step,
no server — it runs entirely in the browser (and in Node for batch builds).

---

## What it does (the 10 steps)

The Factory duplicates the **existing** demo (the D3C Electrical split-reference
walkthrough) and personalises every area from a single `CompanyProfile`:

| Step | Output | Where |
|------|--------|-------|
| 1. Company research | name, logo, colours, services, areas, hours, reviews, contact | `factory/research.js` → `CompanyProfile` |
| 2. Business analysis | pain points + where LeadaLine adds most value | profile `painPoints`, `roi` |
| 3. Personalise the demo | the cloned AI Office Team walkthrough, re-branded | `demo/index.html` |
| 4. AI receptionist | tuned system prompt + qualification flow | `ai-prompt/index.html` |
| 5. Dashboard | believable pipeline, leads, values, sources | `dashboard/index.html` |
| 6. Opportunities we found | strengths, weaknesses, missed opps, where AI helps | `report/index.html` |
| 7. ROI estimate | enquiries, missed %, avg job, recoverable revenue | `report/index.html` (labelled *estimates*) |
| 8. Proposal | why LeadaLine, problems, package, pilot, timeline | `proposal/index.html` |
| 9. Follow-up | ready-to-send email + SMS variant | `email/index.html` |
| 10. Meeting brief | **founder-only**: objections, discovery, angle, upsells | `meeting-brief/index.html` |

Nothing about the original demo was redesigned — it was **tokenised** so the same
template renders natively for an electrician, plumber, dentist, garage, etc.

---

## Generated folder structure

Each company gets its own self-contained folder under `/demos/`:

```
/demos/<company-slug>/
    index.html            ← client-safe landing (safe to share wholesale)
    _founder.html         ← FOUNDER control panel — your entry point, links everything
    demo/index.html       ← the personalised split-reference demo (the clone)
    report/index.html     ← "Opportunities we found" + ROI
    dashboard/index.html  ← sample lead pipeline / CRM
    proposal/index.html   ← branded proposal
    email/index.html      ← follow-up email + SMS
    ai-prompt/index.html  ← AI receptionist prompt   (INTERNAL)
    meeting-brief/index.html ← founder-only sales brief (NEVER shared)
    assets/brand.css      ← auto-generated brand tokens
    assets/logo.svg       ← generated monogram
    company.json          ← the full CompanyProfile that produced it
```

### The meeting brief must never reach the client

- The **client-safe root** (`index.html`) links only to client-facing pages.
- The **founder control panel** (`_founder.html`) is the only page that links to
  the meeting brief and AI prompt. It is not linked from anywhere client-facing.
- Internal pages render in a distinct **blue LeadaLine theme** (not the client's
  brand) and carry a "🔒 Internal / do not share" banner, so a leak is obvious.

Give a prospect the `demo/` link (or the client-safe root). Keep `_founder.html`
for yourself.

---

## Architecture

Plain static HTML + vanilla JS, matching the existing repo. UMD modules so every
file works from `file://` in the browser **and** via `require()` in Node — no
bundler.

```
factory/
    index.html      ← the Factory tool UI (LeadaLine-branded)
    app.js          ← UI orchestration: form → research → render → preview/zip
    research.js     ← research adapter  ★ the AI plug-in seam ★
    profiles.js     ← bundled CompanyProfiles (D3C + Ashworth) — reproducible demos
    zip.js          ← tiny self-contained .zip writer (client-side download)
    engine/
        helpers.js  ← esc, slug, colour maths, £ formatting
        derive.js   ← raw profile → computed fields (brand tints, ROI, defaults)
        demo.js     ← the personalised split-reference demo (faithful clone)
        pages.js    ← shared shell + every supporting page
        index.js    ← renderPackage(profile) → { path: html, ... }
scripts/
    build-demos.cjs ← Node batch builder → writes /demos/<slug>/
```

**Data flow:** `research(input)` → `CompanyProfile` → `engine.renderPackage()` →
files. The profile is the single source of truth; the engine is pure
(profile in, HTML out), so the same profile always produces the same package.

### CompanyProfile (shape)

See `factory/profiles.js` for two complete, commented examples. Key fields:

```js
{
  name, shortName, industry, registration, location, website, email, phone,
  contactFirstName,
  brand: { primary, accent, bg, ... },        // client colours (tints derived)
  serviceCategories: [...], services: [{name, detail}],
  areas: [...], hours: { weekdays, saturday, sunday, emergency },
  reviews: { rating, count, source },
  strengths: [...], weaknesses: [...], painPoints: [...], opportunities: [...],
  roi: { enquiriesPerMonth, missedPct, avgJobValue, recoveryRate },  // rest computed
  aiReceptionist: { greeting, tone, emergencyRule, qualifyingQuestions },
  faqs: [{q, a}],
  dashboard: { metrics, leads:[...], sources, pipelineValue },
  demo: { sampleLead, calendar, messages, report, ... },  // drives the walkthrough
  meetingBrief: { summary, decisionMaker, bestAngle, objections, ... }
}
```

`deriveProfile()` fills anything omitted (brand tints, ROI maths, sensible
defaults) so a partial profile still renders a complete package.

---

## Usage

### The tool (day to day)
Open `factory/index.html`, enter a website (+ optional name/industry), press
**Generate Demo**. Preview any page, open it in a tab, or **download the whole
package as a `.zip`**.

### Batch build to `/demos/`
```bash
node scripts/build-demos.cjs                 # all bundled profiles
node scripts/build-demos.cjs d3c ashworth     # named profiles
node scripts/build-demos.cjs ./my-company.json # from a profile JSON file
```

### Add a new company as a bundled, reproducible demo
1. Add a `CompanyProfile` object to `factory/profiles.js` (copy an existing one).
2. Add it to the returned `all` array.
3. `node scripts/build-demos.cjs <slug>` → appears in `/demos/`.

---

## The research seam (how live AI plugs in) — FUTURE READY

Today `research()` (1) matches a bundled profile for reproducible showcase demos,
else (2) **synthesises** a believable baseline from the inputs + industry
heuristics, so *Generate* always produces something.

To wire **real** research, implement a provider in `factory/research.js`. It must
return the same `CompanyProfile` shape — everything downstream is unchanged:

```js
// factory/research.js
providers.claude = async function (input, cfg) {
  // 1. fetch + read the website (server-side / edge function)
  // 2. call Claude with a structured-output tool that returns a CompanyProfile
  //    model: 'claude-opus-4-8'  (or 'claude-sonnet-5' for cost)
  // 3. return the validated profile
};
// then: research(input, { provider: 'claude', config: {...} })
```

Because the engine is pure and the profile is the contract, you can swap in
Claude, OpenAI, or a scraping pipeline without touching a single template.

### Plug-in points already scaffolded for future features

| Future feature | Where it slots in |
|----------------|-------------------|
| **OpenAI / Claude** research | `research.js` → `providers.*` |
| **Vapi** AI voice assistant | `ai-prompt/` prompt is the source of truth; feed it to a Vapi assistant |
| **Supabase** | persist `company.json` profiles + generated packages; back the CRM dashboard with live data |
| **Make** automation | trigger `build-demos.cjs` / webhook on new prospect; auto-send the follow-up email |
| **CRM export** | `company.json` is already structured lead/pipeline data — map to any CRM |
| **One-click proposal PDF** | print-stylesheet on `proposal/index.html` → PDF, or headless-Chrome render |
| **Video generation** | drive the `demo/` walkthrough (keyboard `→`) with a screen recorder |
| **Screenshot assets** | `scripts/` + headless Chrome over each `demo/` stage |

---

## Design

Maintains LeadaLine's premium SaaS aesthetic — dark mode, minimal, glassmorphism,
smooth animations, Space Grotesk + Manrope/Inter. The **Factory tool** uses the
LeadaLine blue→cyan→purple brand; **generated client demos** adopt each client's
own brand colours; **internal pages** use a distinct blue theme to signal "not for
the client". All ROI figures are clearly labelled **estimates**.
