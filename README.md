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

- [ ] design/ the modal for the post/answer/question/quick take
- [ ] add text editor for the post/answer/question/quick take
- [ ] backend/add the post/answer/question/quick take
- [ ] add the post/answer/question/quick pages and implement nested comments

Day 7:

- [ ] implement follower/following system
- [ ] design explore page
- [ ] add the post/answer/question/quick take from follwing in home page

Day 8:

- [ ] add realtime optimization (Alby)
- [ ] design the notification page
- [ ] add search functionality

Day 9:

- [ ] whats trending page
- [ ] design the settings page
- [ ] draft for posts

Day 10:

- [ ] design the messages page and implement it
- [ ] add spaces

Day 11:

- [ ] design the control page for post versioning and implement it
- [ ] add role based access

Day 12:

- [ ] design the admin dashboard and implement it
- [ ] add the admin dashboard

Day 13:

- [ ] add statistic to admin dashboard

Day 14:

- [ ] add karma system
- [ ] add bookmarks and reading later system

Day 15:

- [ ] user activity
- [ ] user achevments

FEATURES (1 week)

Day 16:

- [ ] add redis for caching

---

## Future Features (Post-MVP)

### Enhanced Discussion

- Nested comments with infinite depth
- Rich text editor with markdown support
- Real-time updates
- Draft saving
- Post versioning

### User Experience

- Karma/reputation system
- User achievements
- Notifications system
- Following system
- Bookmarks and reading lists

### Content Organization

- Advanced topic hierarchy
- Tag system with synonyms
- Custom feeds
- Content recommendation engine

### Platform Features

- Advanced search with Elasticsearch
- Media upload and management
- Analytics dashboard
- API for third-party integrations
- Mobile app

### Moderation & Administration

- Advanced moderation tools
- User roles and permissions
- Content flagging system
- Automated content moderation
- Admin dashboard

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/noezis.git

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env

# Start the development server
bun dev

# Start the database
./start-database.sh
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
