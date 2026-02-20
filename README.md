SimpleRef: Full-Stack Affiliate Link Tracker
SimpleRef is a high-performance referral link generator built with Next.js, Tailwind CSS, and Supabase. It allows users to transform long destination URLs into trackable short links and monitor click analytics in real-time.

✨ Key Features
Dynamic Link Generation: Creates unique, random short codes for any URL.

Real-time Analytics: Tracks every click and updates the dashboard instantly using Supabase.

Performant Redirects: Utilizes Next.js Dynamic Routes for near-instant server-side redirection.

Modern UI: Responsive, "startup-style" interface built with Tailwind CSS v4.

🛠️ Tech Stack
Frontend: Next.js (App Router), React, Tailwind CSS.

Backend/Database: Supabase (PostgreSQL).

Deployment: Vercel (Ready for deployment).

🏗️ Technical Implementation
Server Components: Used for the /ref/[code] route to handle logic on the server, ensuring faster redirects and better SEO.

Environment Variables: Securely managed API keys using .env.local to prevent sensitive data leaks.

Asynchronous State Management: Leveraged async/await and React useEffect hooks to sync frontend UI with database states.

🚀 Getting Started
Clone and Install:

Bash
git clone [your-repo-link]
cd simpleref
npm install
Set up Environment Variables:
Create a .env.local file and add your Supabase credentials:

Plaintext
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
Run the Development Server:

Bash
npm run dev