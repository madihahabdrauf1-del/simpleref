SimpleRef: Full-Stack Affiliate Link Tracker
SimpleRef is a high-performance referral link generator built with Next.js, Tailwind CSS, and Supabase. It allows users to transform long destination URLs into trackable short links and monitor click analytics in real-time.

Key Features
Dynamic Link Generation: Creates unique, random short codes for any URL.

Real-time Analytics: Tracks every click and updates the dashboard instantly using Supabase.

Performant Redirects: Utilizes Next.js Dynamic Routes for near-instant server-side redirection.

Modern UI: Responsive, "startup-style" interface built with Tailwind CSS v4.

Tech Stack
Frontend: Next.js (App Router), React, Tailwind CSS.

Backend/Database: Supabase (PostgreSQL).

Deployment: Vercel (Ready for deployment).

Technical Implementation

1. Server Components: Used for the /ref/[code] route to handle logic on the server, ensuring faster redirects and better SEO.

2. Environment Variables: Securely managed API keys using .env.local to prevent sensitive data leaks.

3. Asynchronous State Management: Leveraged async/await and React useEffect hooks to sync frontend UI with database states.