# ADVAIT — Website

Hand-coded site (no build step). Open `index.html` directly, or deploy the
whole folder as-is to any static host (currently on Vercel).

## Folder structure

```
index.html              Entire site — one page, all sections
robots.txt               Search-engine crawl rules
sitemap.xml               Search-engine sitemap
css/
  style.css               All styling
js/
  script.js                All behaviour/animation (GSAP, Lenis, image
                            fallback resolver, ambient audio, project
                            filters/carousel, nav, etc.)
assets/
  images/                  Project photos, hero image, press images,
                            og-cover.jpg (social share preview image)
  icons/                   Logo files (advait-logo.svg is the one in use;
                            the other 3 are earlier unused versions, kept
                            for reference)
  favicon/                 favicon.ico + PNG sizes + apple-touch-icon.png
  audio/                   Background ambient track
  fonts/                   Empty — fonts are loaded from Google Fonts
                            (Fraunces, Inter, Tiro Devanagari Hindi) via
                            <link> in index.html, not self-hosted. Kept
                            as a placeholder in case fonts are ever
                            self-hosted later.
  videos/                  Empty, reserved (not currently used)
```

## Before going live (custom domain)

The site currently lives at the free Vercel preview URL
`https://advaitstudio.vercel.app/`. Several tags need an *absolute* URL
with the real domain — this can't be made automatic because the tags are
read by WhatsApp/Facebook/Google's own crawlers, which only read the raw
HTML and never run JavaScript.

Once the final domain is purchased and connected, find-and-replace this
exact string in the 3 files below:

```
https://advaitstudio.vercel.app
```

| File | What's there |
|---|---|
| `index.html` | `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`, and the JSON-LD `url`/`image` fields (all in the `<head>`, grouped under one comment block) |
| `robots.txt` | The `Sitemap:` line |
| `sitemap.xml` | The `<loc>` value |

Every one of these lines is marked with a `DOMAIN CONFIG` comment so
they're easy to find even without this file.

## Notes for whoever edits this next

- Every image reference uses a real file path — nothing is base64-embedded
  in `index.html` (it used to be; those were extracted to keep the file
  editable).
- `js/script.js` has a dormant image-fallback resolver (`[data-asset]` /
  `ASSETS` / `resolve()`) that isn't currently used by any element on the
  page, but is left intact and path-correct in case it's wired up again.
- Filenames with spaces are used throughout `assets/images/` (matching
  how the client's own files are named) — always keep spaces URL-encoded
  (`%20`) in HTML `src`/`href` attributes, as the existing code does.
