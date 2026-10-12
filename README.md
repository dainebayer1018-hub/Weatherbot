# Photography Portfolio

A fast, responsive one-page portfolio site for a photography business. Plain HTML, CSS and JavaScript, so there's no build step and it can be hosted anywhere (GitHub Pages, Netlify, Vercel, or any web host).

## Sections

- **Hero**: full-screen feature image with call-to-action buttons
- **Portfolio**: filterable gallery (Weddings, Portraits, Family, Events, Landscape) with a full-screen lightbox (keyboard arrows / Esc supported)
- **About**: your story, photo and quick stats
- **Services & Pricing**: three packages; "Enquire" pre-fills the contact form
- **Testimonials**
- **Contact**: booking enquiry form plus email, phone and location
- **Footer**: social links

## Preview locally

Open `index.html` in a browser, or run a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Make it yours

| What | Where |
| --- | --- |
| Business name, your name, city, bio, prices, testimonials | `index.html` (search for "Studio Name", "Your Name", "Your City") |
| Gallery photos | Add images to `images/` and list them in `js/photos.js` |
| Hero image | `.hero-bg` `background-image` in `index.html` |
| About photo | `.about-photo img` in `index.html` |
| Email / phone / social links | Contact section and footer in `index.html` |
| Colors and fonts | CSS variables at the top of `css/styles.css` |

All images currently point to `picsum.photos` placeholders; swap them for your own work.

**Image tips:** export JPGs at about 1600px on the long edge (2400px for the hero) and around 75–80% quality to keep the site fast. Set `tall: true` in `js/photos.js` for vertical shots.

## Contact form

By default the form uses a `mailto:` action, which opens the visitor's email app. To receive submissions straight to your inbox, create a free form at [Formspree](https://formspree.io) and change the form's `action` to your endpoint (e.g. `https://formspree.io/f/xxxxxx`). The script detects this and submits in the background with a thank-you message.

## Publish on GitHub Pages

1. Push to GitHub.
2. Repository **Settings → Pages**, choose the branch and `/ (root)` folder.
3. Your site will be live at `https://<username>.github.io/<repo>/`.
