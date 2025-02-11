# QuizCraft - Interactive Learning Platform

A comprehensive platform for managing hackathons, quizzes, and technical assessments with reward distribution.

## Project Implementation Plan

### Phase 1: Initial Setup and Core Structure

1. **Project Structure**

   ```
   frontend/
   ├── app/
   │   ├── (auth)/
   │   │   ├── login/
   │   │   └── register/
   │   ├── (dashboard)/
   │   │   ├── profile/
   │   │   ├── hackathons/
   │   │   └── quizzes/
   │   ├── (protocol)/
   │   │   ├── register/
   │   │   └── dashboard/
   │   ├── layout.tsx
   │   └── page.tsx
   ├── components/
   │   ├── ui/
   │   ├── auth/
   │   ├── dashboard/
   │   ├── hackathon/
   │   ├── quiz/
   │   └── protocol/
   ├── lib/
   │   ├── utils/
   │   └── hooks/
   ├── types/
   └── styles/
   ```

2. **Core Dependencies**
   - Next.js 14 (App Router)
   - TypeScript
   - Tailwind CSS
   - Shadcn UI
   - Framer Motion
   - Zustand (State Management)
   - React Hook Form + Zod
   - NextAuth.js

### Phase 2: Authentication & User Management

1. **Authentication System**

   - Login/Register pages
   - OAuth integration
   - Session management
   - Protected routes

2. **User Profiles**
   - Profile creation
   - Dashboard layout
   - Settings management

### Phase 3: Protocol Management

1. **Protocol Registration**
   - Registration form
   - Staff management
   - Protocol dashboard

### Phase 4: Quiz System

1. **Quiz Creation**

   - Quiz builder interface
   - Question management
   - Timer configuration
   - Reward setup

2. **Quiz Taking**
   - Timed interface
   - Auto-submission
   - Result calculation

### Phase 5: Hackathon System

1. **Hackathon Management**
   - Event creation
   - Team formation
   - Project submission
   - Judging interface

### Phase 6: Leaderboard & Rewards

1. **Scoring System**
   - Point calculation
   - Ranking algorithm
   - Reward distribution

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   NEXT_PUBLIC_API_URL=
   NEXTAUTH_SECRET=
   NEXTAUTH_URL=
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Authentication**: NextAuth.js
- **API Integration**: TanStack Query

## Features

- 🎮 Interactive Quiz Interface
- 🏆 Hackathon Management
- 👥 Team Formation
- 💰 Reward Distribution
- 📊 Real-time Leaderboard
- 🔐 Secure Authentication
- 📱 Responsive Design
- ⚡ Real-time Updates

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
├── components/             # Reusable components
├── lib/                    # Utility functions and hooks
├── types/                  # TypeScript type definitions
└── styles/                # Global styles and themes
```

## Development Guidelines

- Mobile-first approach
- Component-based architecture
- Type-safe development
- Performance optimization
- Accessibility compliance

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
