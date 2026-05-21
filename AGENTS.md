# LIGHTEMOTION FRONTEND RULES

## Project Type

Luxury architectural lighting website built with:

- React
- Vite
- SCSS architecture
- Framer Motion
- React Router

---

# Design Philosophy

The UI should feel:

- premium
- minimal
- editorial
- architectural
- calm
- whitespace-driven
- timeless

Avoid:

- startup SaaS UI
- glassmorphism
- random gradients
- excessive borders
- over-animation
- card-heavy layouts
- generic template styling
- flashy interactions

---

# Frontend Architecture

The project uses:

- mobile-first architecture
- min-width breakpoints
- SCSS design token system
- reusable typography system
- reusable spacing system

Always use:

- variables from `variables.scss`
- mixins from `mixins.scss`
- existing typography tokens
- existing spacing scale
- existing transitions
- existing color system

Never hardcode:

- colors
- spacing
- typography
- border radius
- transitions

unless absolutely necessary.

Before introducing new values:

- search for existing tokens first
- reuse existing utilities whenever possible
- maintain consistency with existing design language

If no suitable token exists:

- use the smallest possible custom value
- keep it visually aligned with existing design patterns

---

# Project Structure

Follow the existing folder architecture.

Use:

- `components/home` for homepage sections
- `layout` for shared layout components
- `pages` for route-level pages
- existing styles architecture already established in the project

Do not:

- create random folders
- duplicate structures
- introduce parallel styling systems
- create isolated architecture patterns

---

# SCSS Architecture

The project uses:

- abstracts
- base
- components

Maintain existing architecture.

Do not place component styles in global files unless they are:

- reusable utilities
- typography tokens
- spacing tokens
- global resets
- shared mixins

Keep styles modular and scalable.

---

# Responsive Rules

Base styles = mobile.

Enhance progressively using:

- md
- lg
- xl

Do not use:

- desktop-first overrides
- max-width breakpoint architecture
- unnecessary xs overrides

Layouts should remain:

- fluid
- scalable
- clean
- uncluttered

across all screen sizes.

---

# Typography Philosophy

Typography should feel:

- elegant
- breathable
- editorial
- refined
- easy to read

Avoid:

- overly tight letter spacing
- oversized mobile typography
- aggressive scaling
- cluttered text blocks
- heavy font weights everywhere

Typography hierarchy should feel:

- calm
- restrained
- intentional

Letter spacing should remain normal unless explicitly required.

---

# Styling Rules

Use:

- sharp edges
- editorial whitespace
- restrained motion
- clean alignment
- strong visual rhythm

Maintain visual hierarchy primarily through:

- spacing
- typography
- layout composition

Prefer invisible structure over excessive borders or dividers.

Avoid:

- random shadows
- unnecessary gradients
- decorative UI noise
- excessive icons
- unnecessary cards
- overly layered interfaces
- floating UI patterns

---

# Section Philosophy

Each section should:

- have clear visual hierarchy
- maintain strong whitespace rhythm
- feel focused and uncluttered
- communicate quickly
- guide the eye naturally

Avoid trying to say too much inside one section.

Sections should feel:

- intentional
- breathable
- premium
- cinematic

---

# Motion Rules

Primary motion language:

- opacity
- translateY

Motion should feel:

- subtle
- smooth
- restrained
- cinematic

Use Framer Motion for reveal animations.

Keep motion:

- performant
- minimal
- purposeful

Avoid:

- bounce
- aggressive scale
- flashy animation
- excessive parallax
- chaotic motion systems
- distracting hover effects

Animation should enhance content, not dominate it.

---

# Performance Rules

The website is media-heavy.

Always:

- optimize layout structure
- avoid unnecessary re-renders
- lazy load media where appropriate
- keep animations performant
- avoid excessive DOM nesting
- minimize unnecessary state usage

Images and videos should remain performance-conscious.

Prefer lightweight rendering patterns.

---

# Media Rules

Use responsive media handling.

Desktop and mobile videos/images should load separately when needed.

Avoid:

- loading desktop-heavy assets on mobile
- oversized background videos
- unoptimized media rendering

Maintain cinematic visual quality while staying performant.

---

# Routing

The project uses:

- React Router
- createBrowserRouter architecture

Keep pages:

- modular
- route-safe
- scalable

Do not introduce outdated routing patterns.

---

# Browser Safety

All layouts and interactions must be:

- Safari safe
- responsive
- production-ready

Avoid risky CSS features unless necessary.

Prefer stable modern CSS patterns.

Test layout logic against Safari rendering behavior.

---

# Code Quality

Keep code:

- modular
- scalable
- readable
- production-ready

Use:

- semantic HTML structure
- clean component composition
- reusable abstractions
- consistent naming

Avoid:

- unnecessary wrappers
- duplicated styles
- deeply nested JSX
- oversized components
- unnecessary complexity

Frontend implementation should feel suitable for a premium luxury ecommerce experience.

---

# Existing References

Use existing Hero section and About section as primary coding references.

Match their:

- spacing rhythm
- typography usage
- animation behavior
- layout structure
- SCSS organization
- visual restraint

New sections should feel like they belong to the same design system.

---

# Agent Execution Rules

Before making changes:

- inspect existing components first
- inspect existing SCSS structure first
- inspect reusable utilities before creating new ones
- understand current spacing and typography patterns
- reuse existing abstractions whenever possible

Do not:

- rewrite unrelated files
- introduce unnecessary dependencies
- refactor unrelated architecture
- replace established systems without explicit instruction

Prefer minimal targeted changes.

---

# File Modification Rules

When editing files:

- modify only files related to the requested task
- preserve existing naming conventions
- preserve import structure unless necessary
- preserve routing architecture
- maintain compatibility with current project patterns

Avoid broad refactors unless explicitly requested.

---

# Component Creation Rules

When creating new components:

- keep components focused and modular
- avoid oversized files
- separate structure and styling cleanly
- follow existing folder conventions
- maintain consistency with current architecture

Prefer reusable composition patterns over duplicated markup.

---

# Validation Rules

After implementing changes:

- ensure build passes
- ensure no unused imports
- ensure no console errors
- verify responsive behavior
- verify Safari-safe rendering
- verify animations remain performant
- verify spacing consistency with existing design system

Do not leave incomplete placeholder logic unless explicitly requested.

---

# Output Rules For Coding Agents

After completing a task, always summarize:

1. files changed
2. what was implemented
3. important architectural decisions
4. reusable patterns added
5. assumptions made
6. possible follow-up improvements

Keep explanations concise and technical.

---

# Final Philosophy

This project should feel like a luxury architectural brand experience.

Everything should feel:

- calm
- refined
- intentional
- spacious
- cinematic
- timeless

The experience should rely on:

- composition
- typography
- rhythm
- restraint
- whitespace

rather than decorative UI techniques.

---

# Accessibility Rules

All UI must be accessible and usable.

Always:

- use semantic HTML
- preserve keyboard navigation
- maintain visible focus states
- use meaningful alt text for images
- avoid empty interactive elements
- ensure buttons and links have clear labels
- maintain sufficient color contrast
- avoid motion that could feel disorienting

Do not:

- remove focus outlines without replacing them
- use divs as buttons or links
- rely only on color to communicate meaning
- hide important content from screen readers unnecessarily

Interactive elements must be reachable and understandable by keyboard and assistive technologies.

---

# SEO / Semantic Rules

Pages and sections should use clean semantic structure.

Always:

- use one clear `h1` per page
- maintain logical heading hierarchy
- use semantic landmarks where appropriate
- use descriptive link text
- keep content crawlable
- avoid unnecessary text hidden inside images
- use meaningful page titles and metadata where applicable

Use semantic elements such as:

- `main`
- `section`
- `article`
- `header`
- `footer`
- `nav`

Avoid:

- heading levels chosen only for visual size
- generic links like “click here”
- non-semantic wrapper-heavy markup
- inaccessible image-only content

Structure should support both search engines and assistive technologies.