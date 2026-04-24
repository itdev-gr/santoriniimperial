# Localization — status & review gate

**STATUS: pre-human-proof. DO NOT SHIP TO PRODUCTION.**

All Greek copy in this repository was transcreated (composed in Greek with native intent, not translated word-for-word) by an AI model and requires human review by a native Greek speaker before any production use.

## Review protocol

For each file below, a native Greek reviewer should:
1. Read the Greek alongside the English.
2. Mark any phrasing that sounds translated, stiff, or non-native.
3. Check that tourism-industry register is consistent (neither too formal nor too colloquial).
4. Propose replacement copy inline with tracked changes.

## Files to review

- [ ] `src/content/i18n/gr.json` — all UI strings
- [ ] `src/content/tours/el/wine-experience.md`
- [ ] `src/content/tours/el/sightseeing.md`
- [ ] `src/content/tours/el/full-day.md`
- [ ] `src/content/tours/el/luxe-photo-tour.md`
- [ ] `src/content/blog/el/planning-your-santorini-transfer.md`
- [ ] `src/content/blog/el/welcome-to-santorini.md`

## Key decisions made during transcreation

- **Nav:** "Tours" → "Εμπειρίες" (rather than the more literal "Περιηγήσεις/Ξεναγήσεις") to match the editorial "curated experiences" framing.
- **Contractions used:** "κι" (for "και" before vowels), "στη/στον/απ'" — these make the register feel native rather than textbook.
- **Headline "Santorini, Without the Logistics" → "Σαντορίνη, χωρίς τα logistics"**: kept the English loanword "logistics" intentionally — it reads as a deliberate stylistic choice rather than clumsy translation and is how Greek marketing actually uses the term.
- **Service names kept English-Greek pragmatic** where the term is a proper noun or a loanword common in Greek tourism (e.g., "Wi-Fi", "surge", "reels", "captain καθίσματα").

## String-by-string EN ↔ EL reference

A complete reference table will be generated in Task 25. Until then, compare the two JSON bundles side-by-side (`src/content/i18n/en.json` and `src/content/i18n/gr.json`) with equivalent keys.

## Removing the gate

When review is complete, delete this file and add a line to `README.md` noting the reviewer's name, date, and scope of review.
