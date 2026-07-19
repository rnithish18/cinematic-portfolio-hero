# Cinematic Portfolio Hero

A fullscreen, sticky video hero built with Next.js App Router, Three.js and GSAP.

## Design concept

- **Palette** — near-black void (`#0a0908`) with warm amber (`#ff8a3d`) and ember
  (`#c1541c`) practical light, a faint cool monitor-blue rim (`#4a6cff`), and
  warm white text/particles (`#fff4e8`).
- **Type** — Fraunces (display serif) for the name, Inter for body copy,
  JetBrains Mono for the small-caps eyebrow.
- **Signature element** — the eyebrow reads like a film slate/timecode
  (`REC · 00:04 · Interaction Engineer`), ticking in sync with the actual
  video's playhead — a detail that ties the UI directly to the medium
  (a talking-head recording) instead of a generic numbered badge.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` produces a production build.

> Note: `next/font/google` fetches Fraunces / Inter / JetBrains Mono from
> Google Fonts at build time, so an internet connection is required for
> `npm install`/`npm run build` the first time (fonts are cached after that).

## Structure

```
app/
  layout.tsx          Root layout, loads Fraunces/Inter/JetBrains Mono
  page.tsx             Renders <VideoIntro /> + a placeholder next section
  page.module.css
  globals.css          Design tokens (colors, type, easing) as CSS variables
components/
  VideoIntro.tsx        Hero: video layers, GSAP entrance timeline, controls
  VideoIntro.module.css Gradients, glassmorphism, typography, responsive rules
  CinematicLayer.tsx    Three.js bokeh/particle overlay with mouse parallax
public/videos/hero.mp4  The uploaded talking-head video (used twice: sharp
                        foreground + blurred ambient background)
```

## Swap in your own content

- Replace `public/videos/hero.mp4` with your own clip (same filename, or
  update the two `src="/videos/hero.mp4"` references in `VideoIntro.tsx`).
- Edit the name, tagline and subtitle directly in `VideoIntro.tsx`.
- Colors and easing curves are centralized as CSS variables in
  `app/globals.css` — change them once, everything updates.

## Notes on the implementation

- The **frame** (foreground video) sits inset from the viewport edges with
  rounded corners; the **ambient** layer is the same video, scaled up and
  blurred, filling the full viewport behind it — the blurred color bleeds
  past the frame's edges the way Apple's TV/Music UIs do.
- **CinematicLayer** renders ~90 additive-blended points on a transparent
  canvas, offsets them with per-particle sine/cosine phases each frame, and
  eases the camera toward the pointer position for a slow parallax drift.
  It disposes its geometry/material/texture/renderer and cancels its
  animation frame on unmount.
- The GSAP entrance timeline runs inside a `gsap.context()` scoped to the
  hero, so it's cleaned up correctly if the component unmounts.
- `prefers-reduced-motion` is respected: the particle drift and the CSS
  pulse/scroll animations are disabled for users who request reduced motion.
