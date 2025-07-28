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
- [x] TanStack Query
- [x] Tailwind CSS
- [x] Shadcn/ui
- [x] Lucide Icons
- [x] React Icons
- [x] React Hook Form
- [x] Zod (Form Validation)
- [x] TipTap Editor
- [ ] Framer Motion

### Backend

- [x] tRPC
- [x] Drizzle ORM
- [x] PostgreSQL
- [x] NextAuth.js
- [ ] Elasticsearch (Search)
- [ ] Redis (Caching)

### DevOps & Tools

- [x] Bun (Package Manager & Runtime)
- [x] ESLint
- [x] Prettier
- [ ] Jest
- [ ] Cypress

## MVP Development Roadmap (3 Weeks)

### Week 1 (Core Foundation - User centeric)

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

- [x] Add posts and all pages in profiel
- [x] Add explore page
- [x] Better navbar and notification icon for mobile
- [x] Optimize the queries and caching (react query/trpc/drizzle)

Day 7:

- [x] notifications page
- [x] make the modals and dialog for creating posts and quick takes
- [x] Add zustand as state managment
      bugs:
- [x] form values not updated

### Week 2 (Features and Posts modules)

Day 8:

- [x] Add text editor
- [x] tRPC procedures for creating

Day 9:

- [x] Fetch posts in profile and home page

Day 10:

- [x] Refactor the code to make zustand only responsible for the clinet state (I AM STUPID)

Day 11:

- [x] fix editor reset bug
- [x] refactor the code to make it more readable and maintainable

Day 12:

- [x] restructure the components folder
- [x] fix some bugs

Day 13:

- [x] add quick takes

Day 14:

- [ ] add questions
- [ ] add answers

day 15:

- [ ] figure out best tables design for all content types and reactions
- [ ] Add comments and nested comments along with a page for each content type
- [ ] add shares button and the more options modal

Day 16:

- [ ] Use more polymorphic design for all content types
- [ ] Genrate the html on post submit so you dont have to deal with window undefined
- [ ] Design the settings page

Day 17:

- [ ] Add better feed system
- [ ] Implement follower/following system

Day 18 (HARD):

- [ ] Design the messages page and implement it
- [ ] Add notifications

Day 19 (Explore page):

- [ ] Advanced Topic hierarchy
- [ ] Advanced search with Elasticsearch

Day 20:

- [ ] Design the control page for post versioning and implement it
- [ ] Add role based access

Day 21:

- [ ] Design the admin dashboard and implement it
- [ ] Add statistic to admin dashboard

Day 22:

- [ ] Add karma system
- [ ] Add bookmarks and reading later system (save)
- [ ] User activity
- [ ] User achevments

### Week 3 (FEATURES)

Day 24:

- [ ] Draft for posts
- [ ] Add redis for caching

Day 25:

- [ ] Content flagging system and user repporting
- [ ] Advanced moderation tools (PerspectiveAPI)

Day 26:

- [ ] SEO
- [ ] Trending keywords (What is trending)
- [ ] Tag system with synonyms

Day 27:

- [ ] Custom feeds
- [ ] Content recommendation engine

Day 28:

- [ ] Framer motions animations

Day 29:

- [ ] Logging system and monitoring (Axiom, Vercel)
- [ ] integration testing

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
