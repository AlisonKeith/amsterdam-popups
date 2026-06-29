# Amsterdam Pop-ups — Handover & Launch Guide

A plain-English guide to taking this site live and keeping it updated, using Claude Code.
You don't need to know any code or commands. You'll talk to Claude Code the same way you'd talk to me.

---

## Before you start — a calm word

You directed this entire build. Claude Code is the same thing, just somewhere it can edit the files
and run the steps itself instead of handing them back to you.

Two things make it safe for a first-timer:

- Use the **Desktop app's Code tab in "Ask" mode**. It shows you each change as a before/after diff and
  waits for you to say yes. Nothing happens that you didn't approve.
- If you're ever unsure, say so: *"I'm not certain — ask me questions before you do anything."*

---

## What this is

A small static website — two files, no build step, no database:

| File | What it is |
|------|------------|
| `index.html` | The whole site: map, weekly listings, filters, NL/EN toggle, cookie consent, ad slots |
| `privacy.html` | The standalone privacy policy page |
| `HANDOVER.md` | This guide |

---

## First, the things only YOU can decide

Tick these off as you go — Claude Code can do everything else.

- [ ] **Contact email.** Right now both files use a placeholder, `hello@amsterdampopups.com`. Decide the real address (Step 4 sets it up).
- [ ] **Main domain.** Recommended: make `amsterdampopups.com` the primary one and point `amsterdampopup.com` and `amsterdampopups.nl` at it.
- [ ] **AdSense publisher ID** — you only get this after you're approved (Step 7).
- [ ] **Formspree form endpoint** — for the tip form (Step 5).

---

## Getting Claude Code open (no terminal)

1. Download **Claude Desktop** from `claude.com/download` (macOS or Windows). It needs a paid plan (Pro or above).
2. Open it and click the **Code** tab.
3. Set the mode to **Ask** (top of the panel). This is the "show me first" mode.
4. Make a folder on your computer — call it `amsterdam-popups` — and put `index.html`, `privacy.html`, and this file inside it.
5. Point Claude Code at that folder.
6. Your very first message can be:

   > *"Read HANDOVER.md. We're going to take this static site live step by step. Start at Step 1, and check with me before each step."*

That's it. From here you just work through the steps below.

---

## The launch plan, in order

Each step is one thing to ask for. The **say this** lines are prompts you can paste straight into Claude Code.

### Step 1 — Save it properly (Git + GitHub)
You'll need a free account at `github.com` first.

> **Say this:** *"Set up a git repo here, add a sensible .gitignore, commit these files, and help me push them to a new private GitHub repo called amsterdam-popups."*

### Step 2 — Put it online (GitHub Pages)
> **Say this:** *"Turn on GitHub Pages for this repo and give me the live URL."*

You'll get a `something.github.io` link. Open it — **this is where the map loads for real** (the blank map you saw in preview was just a sandbox limit).

### Step 3 — Connect your domain (via Cloudflare)
Make a free account at `cloudflare.com`, then:

> **Say this:** *"Walk me through pointing amsterdampopups.com at my GitHub Pages site using Cloudflare — the exact DNS records, the Squarespace nameserver change, and the GitHub Pages custom-domain setting. Go one step at a time."*

> **If it gets fiddly:** GitHub Pages behind Cloudflare can occasionally fight over HTTPS. If that happens, ask:
> *"Compare this with hosting on Cloudflare Pages instead — would that be simpler for my setup?"* (Cloudflare Pages connects straight to the GitHub repo and handles the domain and SSL itself.)

### Step 4 — Set up email (hello@amsterdampopups.com)
Once the domain's DNS is on Cloudflare:

> **Say this:** *"In Cloudflare Email Routing, help me forward hello@amsterdampopups.com to [your real inbox], and confirm the records are added."*

Optional, so you can *reply* as that address: ask it to walk you through adding the address to Gmail under "Send mail as".
Then have it set the real address in the site:

> **Say this:** *"Replace hello@amsterdampopups.com with [your chosen address] in both index.html and privacy.html."*

### Step 5 — Make the tip form work (Formspree)
GitHub Pages can't process forms, so use Formspree (free tier). Create a form at `formspree.io` and copy its endpoint.

> **Say this:** *"Wire the Tip us form to this Formspree endpoint: [paste]. Keep the existing thank-you message and the privacy note."*

### Step 6 — Final pre-launch check
> **Say this:** *"Confirm the privacy page and cookie banner are correct for a site on GitHub Pages + Cloudflare with Google AdSense, and that the consent banner blocks ad cookies until I accept."*

### Step 7 — Turn on ads (AdSense) — do this LAST, once the site is live
Apply at `adsense.google.com` using your live domain. Approval needs the site live with real content and a privacy policy — which you have. When approved you'll get a publisher ID (`ca-pub-…`) and ad unit codes.

> **Say this:** *"Add my AdSense (publisher ID ca-pub-XXXX) so it only loads after a visitor accepts cookies, and put my ad unit code into the two reserved slots — the sticky desktop right-rail and the mobile in-content slots. Don't let it load before consent."*

---

## Your weekly routine (the actual job)

Everything above is one-time. This is the part you'll do each week, and it's two minutes in Claude Code:

> **Say this:** *"Here are this week's verified events: [paste your list with name, category, neighbourhood, dates, times, address, blurb, link]. Add them to index.html — new week at the top of WEEKS, new events at the top of EVENTS tagged with that week — then commit and push."*

You approve the diff, it pushes, and the live site updates by itself within a minute or two.
Last week's listings drop into the Archive automatically.

*(Reminder of the real work: the value isn't the list, it's that you've **verified** each one — real venue, genuinely temporary, right dates and address. That's the bit that keeps the site trustworthy.)*

---

## If you get stuck or nervous

- In **Ask** mode nothing happens without your approval — you can always say *"no, explain that first."*
- If something looks wrong, tell it plainly and ask it to fix it. That's normal, not failure.
- Good habit: when it gets something wrong and you correct it, say *"add that as a rule so it doesn't happen again."* Over time it learns your project.
- You can always come back here to me for the thinking, design, and content, and use Claude Code for the hands-on file and deploy work.

You've already done the hard part. This is just pressing the buttons — with someone next to you who knows which button.
