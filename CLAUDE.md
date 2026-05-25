# Skip the Ship — Product Vision & Development Guidelines

## What This App Is

Skip the Ship is a **small group shore excursion concierge** for cruise passengers. Its single purpose is to surface the best small group experiences at each port of call — experiences that travelers would not easily find by going directly to Viator or booking through the cruise line.

The app is not a general cruise planning tool. It is not a Viator wrapper. It is not a large-group excursion finder.

## Core Value Proposition

Most cruise passengers default to Viator or ship-sold excursions, which are dominated by large-group bus tours and heavily marketed aggregator results. Skip the Ship exists to surface:

- Local independent operators who don't dominate Viator search results
- Small-boat charters, private wilderness guides, and family-run tour companies
- Hidden-gem experiences that reward travelers who do real research
- Tours where the small group size is part of the experience itself, not an afterthought

If an excursion could just as easily be found as the top Viator result, it is probably not the right fit for this app.

## Small Group Definition

**Maximum group size: 12 people.** This is hardcoded as a non-negotiable baseline filter applied to every search result. It is not a user preference toggle — it is the app's identity.

- Excursions with `maxGroupSize > 12` are silently excluded from all results
- Excursions with `maxGroupSize: null` are venue-based or self-guided and are exempt from the filter
- This threshold is based on the travel industry standard for "small group" experiences and should not be changed without deliberate product discussion

## Data Standards

Every excursion entry in `PORT_DATA` must meet these standards before shipping:

**Operator**: Each excursion should represent a real, named operator. The operator's name should be reflected in the title or description. A mix of operators per port is required — no port should have all excursions pointing to the same aggregator.

**Booking URL**: Prefer the operator's own website over aggregator links. Viator is acceptable as a fallback when no direct booking URL exists, but it should not be the default. GetYourGuide, Airbnb Experiences, and direct operator sites are all valid sources.

**Ratings and reviews**: All `rating` and `reviews` values must come from a real, verifiable source — TripAdvisor, Google Maps, Viator, or GetYourGuide. Placeholder or estimated values are not acceptable for production. Document the source when the value is not obvious.

**Group size**: `maxGroupSize` must reflect the operator's actual stated capacity for the tour format, not a generic assumption. Default to `12` only when the operator does not publish a group size and the tour type is consistent with small group guiding.

**Descriptions**: Write from the traveler's perspective. Emphasize what makes the experience distinctive, not just what happens. Avoid generic marketing language.

## What Belongs in This App

Good candidates:
- Sea kayaking with a local outfitter (6–8 people)
- A naturalist-guided wildlife float with a small operator
- A private floatplane charter to a remote glacier
- A local chef's market and cooking experience
- A small-boat sailing charter run by the captain-owner

Poor candidates:
- A 50-person catamaran party cruise
- A ship-sold bus tour to a famous waterfall
- Any excursion whose primary differentiator is price or convenience over experience quality

## Architecture Notes

- Single-file React SPA: all application code lives in `src/main.jsx`
- No backend, no API integrations, no external data dependencies
- All excursion data is hardcoded in the `PORT_DATA` constant
- Filtering logic is in `filterAndRank()` — the `maxGroupSize` baseline filter lives here
- Navigation is managed via a `screen` string state in the `App` component; there is no router library
- The app is intentionally simple by design — avoid adding complexity that isn't required by a specific user need
