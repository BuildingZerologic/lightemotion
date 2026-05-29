# Product Images — `src/assets/products/`

This directory contains Vite-optimized product family images, resolved at build time via `import.meta.glob()`.

---

## Folder Structure

Each product family has its own folder named after its **slug**:

```
src/assets/products/
├── led-glorious-r2-downlight/
│    ├── led-glorious-r2-downlight-1.webp     ← REQUIRED: main/default card image
│    ├── led-glorious-r2-downlight-hover.webp ← REQUIRED: hover image (desktop)
│    ├── led-glorious-r2-downlight-2.webp     ← OPTIONAL: gallery image 2
│    └── led-glorious-r2-downlight-3.webp     ← OPTIONAL: gallery image 3
│
├── led-glorious-pro-downlight/
│    ├── led-glorious-pro-downlight-1.webp
│    ├── led-glorious-pro-downlight-hover.webp
│    └── ...
└── ...
```

---

## Naming Convention

| Filename pattern           | Role                                    |
|----------------------------|-----------------------------------------|
| `{slug}-1.webp`            | **Main image** — shown on product cards |
| `{slug}-hover.webp`        | **Hover image** — desktop hover state   |
| `{slug}-2.webp`            | Gallery image 2 (detail page)           |
| `{slug}-3.webp`            | Gallery image 3 (detail page)           |
| `{slug}-N.webp`            | Gallery image N (unlimited)             |

> **Important:** The filename MUST start with the exact slug of the product family folder,
> followed by `-1`, `-2`, `-hover`, etc. No spaces, all lowercase.

---

## How Images Are Resolved

The `src/utils/productImages.js` utility uses `import.meta.glob()` to scan this directory at build time.  
Images are automatically mapped to product families by slug — no manual imports needed.

**Fallback chain (if a Vite asset is not found):**
1. Vite asset from `src/assets/products/{slug}/{slug}-1.webp`
2. Legacy public URL `/images/products/families/{slug}/thumbnail.webp`
3. Legacy thumbnail path from product data
4. Global fallback `/flexiblestrips.jpg`

---

## Adding New Images

1. Place `.webp` files inside the matching `{slug}/` folder
2. Follow the naming convention above exactly
3. Vite will automatically pick them up on next dev/build — no code changes needed

---

## Notes

- `.gitkeep` files are placeholders that allow empty folders to be tracked in Git
- Delete `.gitkeep` once you add real images to a folder
- Only `.webp` format is scanned by the registry (other formats fall through to legacy paths)
