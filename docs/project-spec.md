## CrowdPulse Project Specification

## Problem (Core Idea)

Event organizers guess what the crowd wants. Party-goers have no voice in who plays where.

CrowdPulse gives the crowd a stage. Users craft dream lineups for real venues — ordered lists of DJs they believe would sound perfect one after another — and publish them publicly. Other users vote and comment. The most loved lineups rise to the top. Promoters and venues finally see what people actually want to hear.

## Users

- **The Curator**: A music-obsessed party-goer who has strong opinions about lineups and loves envisioning the perfect event. Creates and shares lineups.
- **The Voter**: A casual fan who browses trending lineups, upvotes the ones they'd actually attend, and joins the conversation in comments.
- **The Tastemaker**: A power user who is known in the community for consistently popular lineups.

## Features

### A. Lineups

The core entity of CrowdPulse. A lineup is an ordered list of DJs tied to a specific venue and vibe.

- Create a lineup by selecting a venue, choosing a vibe tag, and building an ordered DJ list
- Lineup has a title (e.g. "Perfect Sunset at Kalemegdan")
- DJ order matters — the sequence is part of the creative vision
- Locked after publishing (edits would invalidate existing votes)
- Creator can delete their own lineup
- Public by default — anyone browsing the app can see it

### B. Venues

- Venue search powered by **Google Places API**
- Every lineup must be tied to a venue
- Venue data stored locally after first lookup (name, city, country, coordinates)
- Venues are searchable and browsable — clicking a venue shows all lineups created for it

### C. Vibe Tags

Predefined tags that describe the energy or setting of the event. Each lineup has one vibe tag.

Starting vibe tags:
- Sunset
- Sunrise
- Midnight
- Beach
- Rooftop
- Warehouse
- Underground
- Open Air
- Festival
- Intimate

### D. DJ Search

- Powered by the **Spotify API** — search artists by name and get back their photo, name, and genres
- Users search, select, and reorder DJs via drag-and-drop
- DJ entry stores: Spotify artist ID, name, image URL, genres
- Minimum 1 DJ, no hard maximum (reasonable UX cap around 10–12 for MVP)

### E. Voting

- Upvote only
- Registered users only (no anonymous votes)
- One vote per lineup per user
- Vote count is public and displayed prominently on lineup cards

### F. Comments

- Users can comment on any lineup
- Registered users only
- Comments are flat (no threading for MVP)
- Goal: stir community conversation around lineups

### G. Trending Feed

- Primary view of the app — a global feed of lineups sorted by vote count
- Filterable by vibe tag or venue (secondary exploration paths)
- Lineup cards show: venue, city, vibe tag, DJ list preview, vote count, comment count, creator

### H. Sharing

- Native share sheet on mobile (Web Share API)
- Copy link fallback
- Deep links structured for social previews (Open Graph metadata with venue, vibe, top DJ)
- Share to Instagram Stories, Twitter/X, WhatsApp

### I. Notifications

In-app (bell icon) and email.

Triggers:
- Someone upvotes your lineup
- Someone comments on your lineup

Email notifications use a daily digest model to avoid spam (one email per day summarizing activity), with option to unsubscribe.

### J. Authentication

- Social login only (no email/password)
- **Google OAuth**
- **Apple OAuth**
- Handled via NextAuth v5

## Data

Rough data model — not final:

**USER**
- id
- name
- email
- avatarUrl
- provider (`google` | `apple`)
- createdAt

**LINEUP**
- id
- title
- venueId
- vibeTag (enum)
- voteCount (denormalized for fast sorting)
- creatorId (→ User)
- createdAt

**VENUE** (cached from Google Places)
- id
- googlePlaceId
- name
- city
- country
- lat
- lng

**LINEUP_DJ** (ordered join)
- id
- lineupId (→ Lineup)
- spotifyArtistId
- name
- imageUrl
- genres (array)
- position (integer, 1-based ordering)

**VOTE**
- id
- lineupId (→ Lineup)
- userId (→ User)
- createdAt
- unique constraint on (lineupId, userId)

**COMMENT**
- id
- lineupId (→ Lineup)
- userId (→ User)
- content
- createdAt

**NOTIFICATION**
- id
- recipientId (→ User)
- type (`vote` | `comment`)
- lineupId (→ Lineup)
- actorId (→ User, who triggered it)
- read (boolean)
- createdAt

## Tech Stack

**Framework**
Next.js (App Router) with TypeScript

- Mobile-first web app, SSR for fast initial loads and SEO
- API routes for Spotify search, Google Places, voting, notifications
- One codebase, one repo

**Database & ORM**
Neon (PostgreSQL) + Prisma ORM

- Prisma for schema management and queries
- IMPORTANT: Never use `db push` — always create and run migrations
- Redis (Upstash) for rate limiting votes and caching trending feed

**Authentication**
NextAuth v5

- Google OAuth
- Apple OAuth

**External APIs**
- Spotify Web API — artist search
- Google Places API — venue search and autocomplete

**Email**
Resend — transactional emails and daily notification digests

**CSS & UI**
Tailwind CSS v4 + ShadCN UI

**Hosting**
Vercel — natural fit for Next.js, edge functions for fast global feed

## UI/UX

**General**

- Mobile-first, fully responsive web app
- Dark mode by default — fits the nightlife/club aesthetic
- Bold, energetic feel — not sterile or corporate
- Clean cards, strong typography, subtle glow accents
- Reference: Resident Advisor meets Product Hunt

**Core Screens**

1. **Feed (Home)** — Trending lineups globally. Filter chips for vibe tags. Each card shows venue, city, vibe, DJ avatars in order, vote + comment counts.
2. **Lineup Detail** — Full DJ list with Spotify artist photos, vibe/venue info, upvote button, comments section, share button.
3. **Create Lineup** — Step flow: (1) Search & select venue → (2) Pick vibe tag → (3) Search & add DJs, drag to reorder → (4) Add title → Publish.
4. **Venue Page** — All lineups for a given venue, sorted by votes.
5. **Profile** — User's created lineups and upvoted lineups.
6. **Notifications** — Bell icon with unread count. List of vote/comment activity.

**Lineup Card**

- Venue name + city
- Vibe tag badge
- DJ list: numbered avatars (Spotify images) in order
- Vote count (prominent) + upvote button
- Comment count
- Creator avatar + name
- Share icon

**Mobile Interactions**

- Swipe-friendly feed
- Bottom sheet for lineup creation steps
- Native share sheet for sharing
- Toast notifications for actions (voted, comment posted, lineup published)
- Loading skeletons on feed

**Responsive**

- Mobile-first layout
- Desktop: wider cards, optional sidebar for filters
- Sidebar becomes bottom nav on mobile
