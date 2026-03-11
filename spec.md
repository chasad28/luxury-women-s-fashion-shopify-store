# Specification

## Summary
**Goal:** Build a luxury women's fashion e-commerce website (Maison Élite) with a full homepage, collections/product pages, cart drawer, wishlist, and a backend for products, reviews, and newsletter subscriptions.

**Planned changes:**

### Visual Theme & Layout
- Apply luxury color palette: soft beige (#F5F0E8), ivory (#FFFFF0), champagne gold (#C9A84C), black (#0A0A0A)
- Use Playfair Display (serif) for headings and Raleway/Lato (sans-serif) for body text via Google Fonts
- Smooth scroll, fade/slide-in scroll animations, fully mobile-first responsive design (375px, 768px, 1280px)

### Navigation
- Sticky header with brand name/logo, links: Home, Shop, New Arrivals, Best Sellers, About Us, Contact
- Cart icon with item count badge, wishlist icon, hamburger menu for mobile (slide-out or full-screen)

### Homepage Sections
- **Hero:** Full-width (90vh+) lifestyle background image, luxury headline, subheadline, champagne gold/black "Shop Now" CTA with dark gradient overlay
- **Featured Collections:** 4 cards (Handbags, Purses, New Arrivals, Best Sellers) with image, title, "Explore" link, and hover animation; links to filtered collections view
- **Brand Story:** Headline ("Born from a Love of Fine Craftsmanship"), 2–3 aspirational paragraphs, optional side image
- **Product Showcase Grid:** 6–8 product cards (image, name, price) with hover effects; clicking navigates to product detail page
- **Testimonials:** 3–4 customer reviews with name, 5-star rating, and premium-toned quote
- **Trust Badges:** Three badges — Secure Checkout, Fast & Free Shipping, Premium Quality Guaranteed — with icons and labels
- **Newsletter Sign-Up:** Luxury headline, 15%-off offer copy, email input, subscribe button; saves emails to backend, shows success message

### Footer
- Brand name/logo and tagline
- Quick links: Home, Shop, New Arrivals, Best Sellers, About Us, Contact, Privacy Policy, Terms
- Social media icons (Instagram, Pinterest, Facebook, TikTok) with placeholder hrefs
- Dark background with ivory/beige text, copyright line

### Collections Page
- Responsive product grid with reactive filters: Category (Handbags, Purses, Accessories), Price sort (Low–High / High–Low), Color, Popularity (Best Sellers, New Arrivals)
- Product cards with hover animations consistent with homepage grid

### Product Detail Page
- Large image gallery with zoom on hover/click
- Product name, price, luxury description
- Color/size variant selectors, quantity selector
- "Add to Cart" and "Buy Now" buttons (black/gold styled)
- Expandable accordion: Shipping, Returns, Care Instructions
- Customer reviews section with existing reviews displayed; logged-in submission placeholder

### Cart Drawer
- Slide-in from right, triggered by cart icon
- Lists cart items (image, name, price, quantity controls, remove button)
- Shows subtotal and "Proceed to Checkout" CTA (placeholder confirmation flow)
- Cart state persists across page navigations within the session

### Wishlist
- Heart icon on product cards and product detail pages to add/remove items
- Dedicated Wishlist page listing saved items (image, name, price, "Add to Cart" button)
- Wishlist state persisted in frontend state

### Backend (Motoko)
- **Products:** id, name, description, price, category, colors, images, stock, isBestSeller, isNewArrival — list with optional filters (category, color, sort), fetch by ID
- **Product Reviews:** productId, reviewer, rating, comment, timestamp — submit and retrieve per product
- **Newsletter Subscribers:** email, timestamp — subscribe endpoint
- All data persisted in stable variables across canister upgrades

**User-visible outcome:** Users can browse a fully styled luxury fashion storefront, explore collections and product detail pages, manage a cart drawer and wishlist, read and submit reviews, and subscribe to a newsletter — all within a single-page React app backed by a Motoko canister.
