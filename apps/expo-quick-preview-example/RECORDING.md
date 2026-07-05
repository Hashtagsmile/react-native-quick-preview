# Recording demo GIFs

A step-by-step guide to capturing the GIFs used in the README. The app shows the library
in two real contexts — record from **Feed** and **Shop**.

## What the demo covers

| Tab | Shows |
| --- | --- |
| **Feed** | An Instagram-style feed: long-press a photo → **popover** peek of the post → tap to open the full post. |
| **Shop** | An e-commerce store: long-press a product → **sheet** quick-view (price, rating, CTA) → tap to open the product page. |
| **API** | The code entry points — hook, static `QuickPreview`, headless `QuickPreviewComponent`, and `QuickPreviewScrollView`. |

Feed and Shop show the two variants (popover / sheet) in genuinely different real-world
contexts — that contrast is the whole pitch.

## Prerequisites

- Node 20 (`nvm use 20`)
- iOS Simulator (Xcode) and/or an Android emulator
- [`gifski`](https://gif.ski) for high-quality GIFs: `brew install gifski`
- `ffmpeg` for cropping/scaling: `brew install ffmpeg`

## 1. Run the app

```bash
# from the repo root
npm run example -- -c        # -c clears the Metro cache (do this after any dep change)
# then press  i  (iOS simulator)  or  a  (Android emulator)
```

Turn on the touch indicator so long-presses are visible in the recording:
**Simulator → I/O → Input → (enable) “Show Touches”** on Android, or on iOS use the
accessibility touch-highlight / a Simulator that renders touches. A visible touch is
essential — a long-press is invisible otherwise and the GIF looks like magic.

## 2. Record

- **iOS Simulator:** File → Record Screen (or `⌘R`), stop to save an `.mov`.
- **Android emulator:** the "..." toolbar → Record, or `adb shell screenrecord`.

Keep each clip **2–4 seconds**. Record a little extra and trim in conversion.

## 3. The shots (in priority order)

### Hero — side by side (record this first)
Open the iOS Simulator **and** the Android emulator, place them side by side, and do the
**same long-press on a Feed photo** on both. This is the one asset no competitor can show.
Record the screen region covering both. Caption it: *"Same code. iOS + Android."*

### Feed peek → post (the social use case)
On **Feed**: long-press a photo → the post peek appears (popover) → tap the peek to open the
full post. This is the "why you'd want it in your feed" shot.

### Shop quick-view → product (the commerce use case)
On **Shop**: long-press a product → the bottom-sheet quick-view slides up (price, rating,
"View details") → tap it to open the product page. Shows the sheet variant in context.

### Present from anywhere
On **API → Static**: tap **Run this example**. Overlay the code caption
`QuickPreview.present(<Card/>)` — the point is that it's a plain function call.

### Scrollable preview
On **API → Scrollable content**: tap **Run this example**, scroll the content, then drag from
the top to dismiss.

## 4. Convert to GIF

From an `.mov`:

```bash
# extract frames → gifski (best quality/size)
ffmpeg -i recording.mov -vf "fps=24,scale=800:-1:flags=lanczos" -f image2 frames/%04d.png
gifski --fps 24 --width 800 -o demo.gif frames/*.png
rm -rf frames
```

Aim for **< 2 MB** per GIF so the README/npm page loads fast. For the side-by-side hero,
1000–1200px wide is fine; for single-device shots, 400–480px.

## 5. Add to the README

Put GIFs in the repo (e.g. `docs/gifs/`) and reference them with a raw GitHub URL so they
render on npm too:

```md
![Same code on iOS and Android](https://raw.githubusercontent.com/Hashtagsmile/react-native-quick-preview/main/docs/gifs/hero.gif)
```

npm only renders images (not video), so ship the `.gif`. On GitHub you can additionally
drop an `.mp4` for a sharper, smaller inline player.
