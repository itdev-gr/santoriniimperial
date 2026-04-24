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

## Complete EN ↔ EL string reference

| Key | English | Greek (current — pre-proof) |
|---|---|---|
| `home.hero.kicker` | PRIVATE TRANSFERS · CURATED TOURS | ΙΔΙΩΤΙΚΕΣ ΜΕΤΑΦΟΡΕΣ · ΕΠΙΛΕΓΜΕΝΕΣ ΕΜΠΕΙΡΙΕΣ |
| `home.hero.headline` | Santorini, Without the Logistics. | Σαντορίνη, χωρίς τα logistics. |
| `home.hero.sub` | Mercedes-Benz transfers and curated tours of the island. Fixed prices, meet-and-greet service, available 24/7. | Ιδιωτικές μεταφορές με Mercedes-Benz κι επιλεγμένες εμπειρίες στο νησί. Σταθερές τιμές, υποδοχή στην άφιξη, 24 ώρες το εικοσιτετράωρο. |
| `home.hero.cta_primary` | Book Your Transfer | Κλείσε τη μεταφορά σου |
| `home.hero.cta_secondary` | Call Now | Κάλεσέ μας |
| `home.why.kicker` | WHY CHOOSE US | ΓΙΑΤΙ ΕΜΑΣ |
| `home.why.heading` | Fixed Prices. Mercedes Fleet. Every Day of the Year. | Σταθερές τιμές. Στόλος Mercedes. Κάθε μέρα του χρόνου. |
| `home.why.items[0].title` | Fixed Prices | Σταθερές τιμές |
| `home.why.items[0].body` | The price you're quoted is the price you pay. No surge pricing, no luggage surcharges. | Η τιμή που σου δίνουμε είναι η τιμή που πληρώνεις. Καμία προσαύξηση, καμία χρέωση για αποσκευές. |
| `home.why.items[1].title` | 24/7 Service | 24 ώρες το εικοσιτετράωρο |
| `home.why.items[1].body` | Late-night ferry, 5am flight, 2pm nap-time pickup — we dispatch whenever you need us. | Νυχτερινό πλοίο, πρωινή πτήση, μεσημεριανή αναχώρηση — βρισκόμαστε εκεί όποτε μας χρειαστείς. |
| `home.why.items[2].title` | Licensed Drivers | Εξουσιοδοτημένοι οδηγοί |
| `home.why.items[2].body` | Every driver is professionally licensed, insured, and speaks fluent English. | Επαγγελματίες, ασφαλισμένοι, με άνετα αγγλικά και γνώση του νησιού σαν να μεγάλωσαν εκεί — γιατί, συνήθως, εκεί μεγάλωσαν. |
| `home.why.items[3].title` | Card Payments | Πληρωμή με κάρτα |
| `home.why.items[3].body` | All major cards accepted. No processing fees. Invoice on request. | Όλες οι κάρτες δεκτές. Χωρίς επιβαρύνσεις. Τιμολόγιο κατόπιν ζήτησης. |
| `home.tours.kicker` | CURATED EXPERIENCES | ΕΠΙΛΕΓΜΕΝΕΣ ΕΜΠΕΙΡΙΕΣ |
| `home.tours.heading` | Four Ways to See the Island | Τέσσερις τρόποι να γνωρίσεις το νησί |
| `home.tours.sub` | Pair any of these with a transfer and we handle the day end-to-end. | Συνδύασε οποιαδήποτε εμπειρία με μεταφορά και φτιάχνουμε όλη σου τη μέρα. |
| `home.tours.cta` | See all tours | Δες όλες τις εμπειρίες |
| `home.fleet.kicker` | PREMIUM VEHICLES | Ο ΣΤΟΛΟΣ |
| `home.fleet.heading` | Our Mercedes-Benz Lineup | Η γκάμα Mercedes-Benz |
| `home.fleet.sub` | Every vehicle climate-controlled, newly maintained, and fitted for comfort on Santorini's narrow roads. | Κάθε αυτοκίνητο κλιματιζόμενο, πρόσφατα συντηρημένο, φτιαγμένο για τους στενούς δρόμους της Σαντορίνης. |
| `home.fleet.cta` | View the full fleet | Δες ολόκληρο τον στόλο |
| `home.testimonials.kicker` | CLIENT VOICES | ΤΑΞΙΔΙΩΤΕΣ ΛΕΝΕ |
| `home.testimonials.heading` | What Travellers Say | Τι λένε όσοι ταξίδεψαν μαζί μας |
| `home.cta_band.headline` | Book Your Santorini Transfer Today | Κλείσε τη μεταφορά σου για Σαντορίνη σήμερα |
| `home.cta_band.cta` | Start Your Booking | Ξεκίνα την κράτηση |
| `nav.home` | Home | Αρχική |
| `nav.tours` | Tours | Εμπειρίες |
| `nav.transfers` | Transfers | Μεταφορές |
| `nav.fleet` | Fleet | Στόλος |
| `nav.gallery` | Gallery | Συλλογή |
| `nav.about` | About | Η εταιρεία |
| `nav.contact` | Contact | Επικοινωνία |
| `nav.blog` | Blog | Άρθρα |
| `nav.book` | Book Now | Κλείσε τώρα |
| `transfers.hero.kicker` | GROUND TRANSPORT | ΜΕΤΑΦΟΡΕΣ |
| `transfers.hero.headline` | Transfers Handled, Arrivals Felt. | Η άφιξη γίνεται από εμάς — εσύ ξεκουράζεσαι. |
| `transfers.hero.sub` | Airport, port, hotel, wedding, or an all-day driver. Same fleet, same drivers, same fixed prices. | Αεροδρόμιο, λιμάνι, ξενοδοχείο, γάμος, ή δικός σου οδηγός για όλη τη μέρα. Ίδιος στόλος, ίδιοι οδηγοί, ίδιες σταθερές τιμές. |
| `transfers.services[0].title` | Airport Transfers | Μεταφορά από αεροδρόμιο |
| `transfers.services[0].body` | Meet-and-greet at JTR arrivals, luggage assistance, direct to your accommodation. Flight-tracked — no charge for reasonable delays. | Σε περιμένουμε στις αφίξεις του JTR με όνομα. Βοηθάμε με τις αποσκευές, σε αφήνουμε στο κατάλυμα. Χωρίς χρέωση για εύλογες καθυστερήσεις πτήσης. |
| `transfers.services[1].title` | Port Transfers | Μεταφορά από λιμάνι |
| `transfers.services[1].body` | Coordinated with cruise arrivals at Athinios. Driver waits portside with a sign. Luggage and buggy room included. | Συντονισμένη με τις αφίξεις κρουαζιερόπλοιων στον Αθηνιό. Ο οδηγός περιμένει στην αποβάθρα με πινακίδα. |
| `transfers.services[2].title` | Hotel-to-Hotel | Αλλαγή καταλύματος |
| `transfers.services[2].body` | Changing properties mid-stay? We move you and your bags door-to-door, same-day or scheduled. | Αλλάζεις ξενοδοχείο μέσα στις διακοπές; Σε μεταφέρουμε με τα πράγματά σου, αυθημερόν ή με κλείσιμο. |
| `transfers.services[3].title` | Wedding Transfers | Μεταφορές γάμου |
| `transfers.services[3].body` | Full fleet available for wedding parties — coordinated timing, ribbons optional, group bookings discounted. | Ολόκληρος ο στόλος διαθέσιμος για γαμήλια αυτοκινητοπομπή. Συντονισμός ωρών, εκπτώσεις για γκρουπ. |
| `transfers.services[4].title` | Beach & Evening | Παραλία & βραδινή έξοδος |
| `transfers.services[4].body` | Daytime beach runs, evening club transfers, late-night returns. Safe, sober, on-time. | Μέρες στην παραλία, βραδινές εξόδους, επιστροφές αργά. Ασφαλώς, νηφάλια, στην ώρα τους. |
| `transfers.services[5].title` | 24-Hour Driver | Οδηγός για 24 ώρες |
| `transfers.services[5].body` | Your dedicated driver and Mercedes for the day. Set the itinerary as you go, stop where you want, no meter running. | Δικός σου οδηγός και Mercedes για όλη τη μέρα. Φτιάχνεις το πρόγραμμα στην πορεία, χωρίς ταξίμετρο. |
| `fleet.hero.kicker` | THE FLEET | Ο ΣΤΟΛΟΣ |
| `fleet.hero.headline` | Mercedes-Benz, Across the Size Spectrum. | Mercedes-Benz, σε κάθε μέγεθος. |
| `fleet.hero.sub` | Newly maintained, fully insured, climate-controlled. Chosen for comfort on narrow island roads. | Πρόσφατα συντηρημένα, πλήρως ασφαλισμένα, με κλιματισμό. Επιλεγμένα για άνεση στους στενούς δρόμους του νησιού. |
| `fleet.vehicles[0].model` | Mercedes-Benz E-Class | Mercedes-Benz E-Class |
| `fleet.vehicles[0].capacity` | Up to 3 passengers | Έως 3 επιβάτες |
| `fleet.vehicles[0].luggage` | 2 large + 2 carry-on | 2 μεγάλες + 2 χειραποσκευές |
| `fleet.vehicles[0].ideal` | Airport runs, couples, business travel. | Αφίξεις αεροδρομίου, ζευγάρια, ταξίδια εργασίας. |
| `fleet.vehicles[0].note` | The default for singles and pairs. Leather, quiet cabin, generous legroom. | Η βασική επιλογή για μονά και ζευγάρια. Δερμάτινο σαλόνι, ησυχία, άνεση. |
| `fleet.vehicles[1].model` | Mercedes-Benz V-Class | Mercedes-Benz V-Class |
| `fleet.vehicles[1].capacity` | Up to 7 passengers | Έως 7 επιβάτες |
| `fleet.vehicles[1].luggage` | 5 large + 5 carry-on | 5 μεγάλες + 5 χειραποσκευές |
| `fleet.vehicles[1].ideal` | Families, small groups, wedding-party rides. | Οικογένειες, μικρές ομάδες, γαμήλιες μεταφορές. |
| `fleet.vehicles[1].note` | Luxury MPV. Walk-up entry, individual seats, huge boot. | Luxury MPV. Είσοδος όρθιος, ανεξάρτητα καθίσματα, μεγάλο πορτμπαγκάζ. |
| `fleet.vehicles[2].model` | Mercedes-Benz Sprinter 12 | Mercedes-Benz Sprinter 12 |
| `fleet.vehicles[2].capacity` | Up to 12 passengers | Έως 12 επιβάτες |
| `fleet.vehicles[2].luggage` | 10+ large pieces | 10+ μεγάλα κομμάτια |
| `fleet.vehicles[2].ideal` | Wedding groups, corporate arrivals, friend trips. | Γαμήλια γκρουπ, εταιρικές αφίξεις, ταξίδια με φίλους. |
| `fleet.vehicles[2].note` | Leather captain seats, air-conditioning, Wi-Fi available. | Δερμάτινα captain καθίσματα, κλιματισμός, Wi-Fi κατόπιν ζήτησης. |
| `fleet.vehicles[3].model` | Mercedes-Benz Sprinter 20 | Mercedes-Benz Sprinter 20 |
| `fleet.vehicles[3].capacity` | Up to 20 passengers | Έως 20 επιβάτες |
| `fleet.vehicles[3].luggage` | Full group capacity | Πλήρης χωρητικότητα γκρουπ |
| `fleet.vehicles[3].ideal` | Extended families, events, conference shuttles. | Εκτεταμένες οικογένειες, εκδηλώσεις, συνεδριακές μεταφορές. |
| `fleet.vehicles[3].note` | Our largest. Fleet-maintained, backed by a second vehicle if needed. | Το μεγαλύτερο όχημά μας. Πλήρως συντηρημένο, με δεύτερο όχημα υποστήριξης εφόσον χρειαστεί. |
| `about.hero.kicker` | ABOUT US | Η ΕΤΑΙΡΕΙΑ |
| `about.hero.headline` | Built on the Island. Run by Locals. | Χτισμένη στο νησί. Απ' τους ντόπιους. |
| `about.hero.sub` | Santorini Imperial is a small team of licensed operators who happen to love the island enough to show up at 3am so you don't have to worry about your ride. | Η Santorini Imperial είναι μια μικρή ομάδα εξουσιοδοτημένων επαγγελματιών που αγαπάνε το νησί αρκετά ώστε να σηκώνονται στις 3 τα ξημερώματα για να μη σε νοιάζει η μεταφορά σου. |
| `about.pillars[0].title` | Local | Ντόπιοι |
| `about.pillars[0].body` | We live here. Every driver, every guide, every booking confirmation. You are never routed through a foreign call centre. | Εδώ ζούμε. Κάθε οδηγός, κάθε ξεναγός, κάθε επιβεβαίωση κράτησης. Δεν περνάς ποτέ από ξένο call centre. |
| `about.pillars[1].title` | Mercedes only | Μόνο Mercedes |
| `about.pillars[1].body` | A single, maintained fleet — because consistency is what separates a ride from a transfer. | Ένας συντηρημένος στόλος — γιατί η συνέπεια είναι που κάνει μια μεταφορά μεταφορά. |
| `about.pillars[2].title` | Fixed-price, always | Πάντα σταθερές τιμές |
| `about.pillars[2].body` | The quote is the price. No surge hours, no surprise luggage fees, no change at the door. | Η προσφορά είναι η τιμή. Χωρίς surge, χωρίς εκπλήξεις αποσκευών, χωρίς αλλαγή στην πόρτα. |
| `contact.hero.kicker` | GET IN TOUCH | ΕΠΙΚΟΙΝΩΝΙΑ |
| `contact.hero.headline` | Tell Us Your Plan. | Πες μας το πλάνο σου. |
| `contact.hero.sub` | Fill the form or reach us directly — we reply within the hour during daylight and within four hours overnight. | Συμπλήρωσε τη φόρμα ή γράψε μας κατευθείαν — απαντάμε μέσα σε μία ώρα τη μέρα και τέσσερις τη νύχτα. |
| `contact.channels.phone` | Phone / WhatsApp / Viber | Τηλέφωνο / WhatsApp / Viber |
| `contact.channels.email` | Email | Email |
| `contact.channels.socials` | Socials | Social media |
