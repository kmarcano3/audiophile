# Audiophile E-Commerce Site

A multi-page e-commerce front end for a fictional high-end audio retailer, built
as a portfolio project from the [Frontend Mentor Audiophile challenge](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx).

Browse headphones, speakers, and earphones, add items to a persistent cart, and
run through a full checkout flow with form validation and an order summary.

## Tech Stack

- **[Next.js 14](https://nextjs.org/)** (Pages Router) with **[TypeScript](https://www.typescriptlang.org/)**
- **[MUI v5](https://mui.com/)** for components and theming, with [Emotion](https://emotion.sh/) SSR caching
- **[Redux Toolkit](https://redux-toolkit.js.org/)** + **[redux-persist](https://github.com/rt2zz/redux-persist)** for cart state that survives reloads

## Features

- **Product catalog** — category pages for headphones, speakers, and earphones,
  plus a dynamic `[slug]` route for individual product detail pages
- **Responsive imagery** — every product ships mobile, tablet, and desktop assets
- **Persistent cart** — quantities merge when re-adding a product, and an item at
  a count of 1 leaves the cart entirely rather than dropping to 0
- **Checkout** — billing, shipping, and payment forms with e-Money and Cash on
  Delivery options, a live order summary with 8.25% sales tax and free
  shipping, and an order confirmation view

## Getting Started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint via next lint
```

## Project Structure

```
components/        Shared UI, plus home/ and shared/ subfolders
data/data.json     Product catalog (source of truth for all pages)
pages/             Routes: index, headphones, speakers, earphones,
                   checkout, and the dynamic [slug] product page
store/             Redux store, cart slice, and typed hooks
types/             Shared TypeScript types
utility/           Emotion cache setup and product helpers
public/assets/     Product and category imagery
```

## Credits

Design and assets from [Frontend Mentor](https://www.frontendmentor.io/).
Implementation by [Kaila Marcano](https://github.com/kmarcano3).
