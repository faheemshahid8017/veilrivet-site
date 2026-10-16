# Veilrivet (static site)

GitHub Pages se live hai: https://faheemshahid8017.github.io/veilrivet-site/

Har push ke saath Actions apne aap redeploy kar deta hai.

## Kya hai ye

Plain static mirror - sirf HTML/CSS/JS. Ismein koi Node backend nahi hai.

## Pages par kya kaam karta hai

- Home, pricing, login, signup, dashboard, brand-profile, admin - sab pages render hoti hain
- Clean URLs (/pricing) folder-based index.html se chalte hain
- local-nav.js Next.js RSC prefetch ko rokta hai taake static hosting pe bhi navigation theek rahe

## Pages par kya NAHI kaam karta

Login/signup aur saara /api/* backend Node + Supabase par chalta hai. GitHub Pages sirf
static files serve karta hai, isliye:

- sign up / sign in / sign out - nahi chalega
- brand profile save/load, file uploads - nahi chalega

In features ke liye backend alag host (Vercel / Render / Fly.io) par chahiye.

## Local test


ode server.js original mirror ke saath chalta tha; Pages build ke liye koi server nahi chahiye,
bas static files serve karein.
