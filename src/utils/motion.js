/**
 * motion.js — Canonical animation system for Lightemotion
 *
 * Philosophy:
 *  - One viewport trigger per element: animate once on first enter, never replay.
 *  - Transform + opacity only (GPU-composited).
 *  - Subtle, premium motion. No bounces, no rotations, no dramatic translations.
 *  - All durations 0.7–0.8 s, eased with the architectural cubic-bezier.
 *  - prefers-reduced-motion must be handled at the component level via
 *    Framer Motion's `useReducedMotion()`.
 *
 * Usage pattern:
 *   <motion.div variants={revealHeading} initial="hidden" whileInView="visible" viewport={viewport}>
 *
 * For staggered grids, wrap children in a parent that uses `staggerContainer`:
 *   <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport}>
 *     {items.map(i => <motion.li key={i} variants={revealCard} />)}
 *   </motion.ul>
 */

// ─── Shared constants ─────────────────────────────────────────────────────────

export const EASE = [0.22, 1, 0.36, 1];

/**
 * Default viewport config — fire once, when 20% of the element is visible.
 * Use `viewportLow` for large sections that are hard to scroll 20% into view.
 */
export const viewport      = { once: true, amount: 0.2  };
export const viewportLow   = { once: true, amount: 0.1  };
export const viewportHigh  = { once: true, amount: 0.4  };

// ─── Named reveal variants (by element type) ──────────────────────────────────

/** Eyebrow labels — fade up 12 px */
export const revealEyebrow = {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.7, ease: EASE } },
};

/** Headings — fade up 24 px */
export const revealHeading = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.8, ease: EASE } },
};

/** Body paragraphs — fade up 16 px */
export const revealParagraph = {
    hidden:  { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.75, ease: EASE } },
};

/** Buttons / CTAs — fade up 20 px */
export const revealButton = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.7, ease: EASE } },
};

/** Cards / grid items — fade up 32 px (used as stagger child) */
export const revealCard = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.75, ease: EASE } },
};

/** Images — fade in + very subtle scale from 1.04 → 1 */
export const revealImage = {
    hidden:  { opacity: 0, scale: 1.04 },
    visible: { opacity: 1, scale: 1,    transition: { duration: 0.8,  ease: EASE } },
};

/** Section-level block (large containers) — fade up 24 px */
export const revealSection = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.8, ease: EASE } },
};

/** Footer logo / large wordmark — very soft fade only */
export const revealFooterLogo = {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.9, ease: EASE } },
};

// ─── Stagger container ────────────────────────────────────────────────────────

/**
 * Wraps a list of `revealCard` (or any) children and staggers them.
 * Apply to the parent; children pick up variants automatically.
 */
export const staggerContainer = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1 } },
};

/**
 * Tighter stagger for text blocks within a single section header area.
 */
export const staggerFast = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Legacy aliases (kept for backward compatibility) ─────────────────────────
// These mirror the old export names used across the codebase so that
// components can be updated one-by-one without breaking.

/** @deprecated use revealCard instead */
export const imageRevealVariants = revealCard;

/** @deprecated use revealSection + viewport spread instead */
export const imageReveal = {
    initial:    revealImage.hidden,
    whileInView: revealImage.visible,
    viewport,
    transition: revealImage.visible.transition,
};

/** @deprecated use revealSection instead */
export const sharedReveal = revealSection;

/** @deprecated use staggerContainer instead */
export const sharedStagger = staggerContainer;

/** @deprecated use viewport instead */
export const sectionViewport = viewport;
