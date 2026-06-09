/**
 * servicesAnimations.js — Deprecated shim.
 *
 * All animation logic has moved to src/utils/motion.js.
 * This file re-exports aliases so existing imports continue to work
 * while the individual components are being updated.
 *
 * @deprecated Import directly from "../../utils/motion" instead.
 */
export { revealSection as reveal, staggerContainer as staggerReveal } from "../../utils/motion";
