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

For each new event, also fill `org:{name, url}` (the organiser named on the
event's own page; leave `url` out if the page gives none, and leave `org` out
if no organiser is named) and `img` (the page's own event image, e.g. its
og:image; never a logo, never guessed). These feed Google's event details.

**Permanent rule:** Never name The Excellence Office (TEO) as organiser,
publisher, author or any similar role anywhere on the site or in its
structured data unless Alison says so herself. Never name Amsterdam Pop-ups as
an event organiser; use the host venue (with Alison's yes) or leave it out.

Then rebuild the no-JavaScript copies and commit them with the edition:

    node tools/build-static.js

This rewrites `this-week.html` (plain list for search engines and AI tools),
one page per category (`/comedy/`, `/kids-family/` … with Event structured
data), the "This week by category" links in the footer of `index.html`,
`llms.txt`, and `sitemap.xml`. Commit all of it with the edition.

- A category with no events this week keeps its page with a "nothing this
  week" note, marked noindex and left out of the sitemap, llms.txt and footer.
- A new category needs a slug and a one-line intro in `CAT_PAGES` in
  `tools/build-static.js` (the build stops and says so if it is missing).
- Seasonal removal (e.g. Sinterklaas after 5 Dec): add the id to `NO_PAGE` in
  `tools/build-static.js` and run the build; its page folder is deleted and it
  drops out of the sitemap, llms.txt and footer.

## 4. Review before it ships

- [ ] Read the diff Claude Code shows you before approving
- [ ] Spot-check a few events' categories and neighbourhoods look right
- [ ] Confirm the commit message makes sense, then approve the push

## 5. Confirm it's live

- [ ] Open the live site after pushing and check the new week shows up
- [ ] Last week's listings should have dropped into the Archive automatically
- [ ] /this-week.html and /llms.txt show the new week and event count

---

*Reminder: the value isn't the list, it's that you've verified each one — real
venue, genuinely temporary, right dates and address. That's the bit that keeps
the site trustworthy.*
