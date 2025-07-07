# Noezis

A modern social media platform focused on high-quality discussions, knowledge sharing, and rational discourse. Inspired by Quora and LessWrong, Noezis aims to create a space where users can engage in meaningful conversations, share expertise, and explore complex topics in depth.

## Core Features (MVP)

- Rich text discussion threads
- Basic commenting system
- User profiles
- Topic categorization
- Basic search
- Authentication
- Voting system

## Tech Stack

### Frontend

- [x] Next.js 15 (App Router)
- [x] React 19
- [x] TypeScript
- [x] Tailwind CSS
- [x] Shadcn/ui
- [x] Lucide Icons
- [x] React Icons
- [ ] TipTap Editor
- [x] React Query
- [ ] Framer Motion
- [x] React Hook Form
- [x] Zod (Form Validation)

### Backend

- [x] tRPC
- [x] Drizzle ORM
- [x] PostgreSQL
- [x] NextAuth.js
- [ ] Redis (Caching)
- [ ] Elasticsearch (Search)

### DevOps & Tools

- [x] Bun (Package Manager & Runtime)
- [x] ESLint
- [x] Prettier
- [ ] Jest
- [ ] Cypress

## MVP Development Roadmap (3 Weeks)

### Week 1 (Core Foundation)

Day 1:

- [x] Project initialization with Next.js
- [x] Setup TypeScript and ESLint
- [x] Implement authentication with NextAuth
- [x] Create basic layout and theme system
- [x] Create homepage with card layout
- [x] Setup basic navigation and routing

Day 2:

- [x] Design and implement user profile schema
- [x] Design the profile page
- [x] Mobile profile page
- [x] navbar design and footer
- [x] show all info in profile page

Day 3:

- [x] Mobile navbar
- [x] Mobile responsive (hero section)
- [x] improve theme
- [x] Add email Auth ?
      bugs:
- [x] The profle page is wider

Day 4:

- [x] Make all home componenets (quick takes, question, answer, post)
- [x] mobile home page:

Day 5:

- [x] Edit profile info page (or mode)

Day 6:

- [x] add posts and all pages in profiel
- [x] add explore page
- [x] better navbar and notification icon for mobile
- [x] optmizie the queries and caching (react query/trpc/drizzle)

Day 7:

- [x] notifications page
- [x] make the modals and dialog for creating posts and quick takes
- [ ] Add zustand as state managment
      bugs:
- [ ] form values not updated

Day 8:

- [ ] add text editor
- [ ] trpc procedures for creating and fetching posts and quick takes

Day 9:

- [ ] fetch posts and quick takes in profile and home page
- [ ] add comments and nested comments

Day 10:

- [ ] modals and dialogs for createing q/a
- [ ] implemting the q/a creating and fetching them

Day 11:

- [ ] whats trending page
- [ ] implement follower/following system

Day 12:

- [ ] add search functionality
- [ ] design the settings page

Day 13:

- [ ] add spaces
- [ ] Advanced Topic hierarchy

Day 14:

- [ ] add realtime optimization (Alby)
- [ ] design the messages page and implement it

Day 15:

- [ ] design the control page for post versioning and implement it
- [ ] add role based access

Day 16:

- [ ] design the admin dashboard and implement it
- [ ] add the admin dashboard

Day 17:

- [ ] Media upload and management (video player)
- [ ] add statistic to admin dashboard

Day 18:

- [ ] add karma system
- [ ] add bookmarks and reading later system

Day 19:

- [ ] user activity
- [ ] user achevments

FEATURES (1 week)

Day 20:

- [ ] draft for posts
- [ ] add redis for caching

Day 21:

- [ ] Content flagging system
- [ ] Advanced moderation tools (perspectiveapi)

Day 22:

- [ ] Advanced search with Elasticsearch

Day 24:

- [ ] Tag system with synonyms
- [ ] Trending keywords

Day 25:

- [ ] Custom feeds
- [ ] Content recommendation engine

Day 26:

- [ ] framer motions animations

Day 27:

- [ ] unit testing

## Getting Started

```bash
# Clone the repository
git clone https://github.com/1sma31l/noezis.git

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start the development server
npm run dev

```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Quora and LessWrong
- Built with modern web technologies
- Focused on fostering meaningful discussions

---

_Note: This is a work in progress. Features and timelines may change as development progresses._
