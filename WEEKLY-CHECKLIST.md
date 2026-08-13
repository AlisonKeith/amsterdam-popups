# Weekly Checklist — Amsterdam Pop-ups

The two-minute job, done every week to keep the site current. See `HANDOVER.md` for
the one-time setup steps; this is just the recurring routine.

---

## 1. Check the "Know a pop-up?" inbox

Before you go looking yourself, check what's landed via the site's tip form
(Formspree) since last week. Submissions carry a `submitter_type` of either
`spotter` (someone flagging an event) or `organiser` (someone listing their own) —
worth a slightly different verification approach for each:

- [ ] **Spotter tips** — verify independently (venue's own site/socials), same as anything you find yourself.
- [ ] **Organiser submissions** — verify the event is genuinely temporary and the details check out, but you can also just ask them directly if anything's unclear.

## 2. Gather & verify this week's events

For each candidate event, confirm:

- [ ] Real venue — it exists and the address is right
- [ ] Genuinely temporary — a pop-up, one-off, or limited run, not a permanent fixture
- [ ] Dates and times are current and correct
- [ ] You have: name, category, neighbourhood, dates, times, address, a short blurb, and a link

This verification step is the actual value of the site — anyone can scrape a list,
the trustworthy dates and addresses are what keep people coming back.

## 3. Hand it to Claude Code

Paste the verified list in one message, e.g.:

> *"Here are this week's verified events: [paste your list]. Add them to
> index.html — new week at the top of WEEKS, new events at the top of EVENTS
> tagged with that week — then commit and push."*

If you don't have coordinates for an address, ask Claude Code to geocode it —
don't guess lat/lng yourself.

## 4. Review before it ships

- [ ] Read the diff Claude Code shows you before approving
- [ ] Spot-check a few events' categories and neighbourhoods look right
- [ ] Confirm the commit message makes sense, then approve the push

## 5. Confirm it's live

- [ ] Open the live site after pushing and check the new week shows up
- [ ] Last week's listings should have dropped into the Archive automatically

---

*Reminder: the value isn't the list, it's that you've verified each one — real
venue, genuinely temporary, right dates and address. That's the bit that keeps
the site trustworthy.*
