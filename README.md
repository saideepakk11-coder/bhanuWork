# Septic Tank Cleaning Website

Static site: HTML, CSS, vanilla JS. No build step.

## Before launch
1. Search every file for `[` placeholders (`[BUSINESS NAME]`, `[DOMAIN]`, `[OWNER TO ADD ...]`) and replace or delete them.
2. Set the phone number once in `js/script.js` (`CONFIG`), and in the `tel:`/`wa.me` fallback links in `index.html` and the JSON-LD block.
3. Delete any service, sector or "Why choose us" item the owner does not confirm.
4. Replace gallery `.ph` boxes with real photos (WebP, 640x480, alt text, `loading="lazy"`).
5. Add `images/og-image.jpg` (1200x630), favicon, and an `og:image` tag.
6. Fill in `privacy.html`.

## Form
Uses Netlify Forms (`data-netlify="true"`). After the first deploy, open Netlify > Forms > Form notifications and add the owner's email. Send a test enquiry and confirm it arrives. If hosting elsewhere, point the form to Formspree or Web3Forms.

## Deploy
Push to GitHub, import the repo in Netlify (no build command, publish directory `/`), add the custom `.in` domain, enable HTTPS, then verify in Google Search Console and submit `sitemap.xml`. See the SRS document for the full checklist.

## Hero and About image
`images/hero-lorry.webp` is a cropped, AI-generated sample image taken from the design reference. It does not show your real vehicle or team. Replace it with your own photo (same file name, about 1100x920, under 150 KB) before launch. The "Servicing" card in the hero is placed over the top-right of the image, so after swapping the photo check that the card still sits well.
