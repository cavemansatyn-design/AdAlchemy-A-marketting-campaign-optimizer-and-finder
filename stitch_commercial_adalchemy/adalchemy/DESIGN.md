---
name: AdAlchemy
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c4c6cf'
  on-secondary: '#2d3037'
  secondary-container: '#464950'
  on-secondary-container: '#b6b8c1'
  tertiary: '#bacfff'
  on-tertiary: '#002e69'
  tertiary-container: '#8eb3ff'
  on-tertiary-container: '#004291'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e0e2eb'
  secondary-fixed-dim: '#c4c6cf'
  on-secondary-fixed: '#191c22'
  on-secondary-fixed-variant: '#44474e'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a41'
  on-tertiary-fixed-variant: '#004493'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-mono:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for the elite marketing strategist who demands both the analytical rigor of a financial terminal and the aesthetic grace of a high-end editorial publication. It balances heavy data density with expansive, luxurious white space (or "dark space"). 

The aesthetic is **Modern Editorial Glassmorphism**. It utilizes deep, obsidian-layered surfaces to provide a sense of infinite depth. Cultural infusion is achieved through high-fidelity, low-contrast patterns inspired by the intricate line art of Madhubani and Warli traditions. These patterns act as "digital watermarks" within glass containers or as subtle textures on the base background, reinforcing a sense of heritage, craftsmanship, and sophisticated intelligence without distracting from the data.

## Colors

This design system is "Dark Mode First," prioritizing eye comfort for long-duration strategic analysis.
- **Base Surfaces:** The foundational layer uses Obsidian (#050505). Elevated containers use Deep Charcoal (#0F0F12).
- **Intelligence Gold:** Reserved for high-value metrics, achievement scores, and primary calls to action. It represents the "Alchemy" of turning raw data into gold.
- **Functional Palette:** Success, Risk, and Momentum colors are used exclusively for data visualization trends (e.g., ROAS increases, churn alerts, or market velocity).
- **Textural Overlays:** Heritage patterns should be rendered in a stroke color just 2-3% lighter than the background, creating a tactile, "etched" feeling.

## Typography

The typography strategy creates a clear distinction between **Storytelling** and **Analysis**.
- **The Serif (Playfair Display):** Used for section headers, editorial insights, and high-level campaign names. This brings an authoritative, premium feel to the platform.
- **The Sans (Geist):** A technical, precise typeface used for all UI controls, data tables, and metrics. Its geometric purity ensures legibility even at high densities.
- **Data Mono:** Use the monospaced stylistic sets of Geist for numerical values in tables to ensure tabular alignment and a "terminal" feel.

## Layout & Spacing

This design system uses a **12-column Fluid Grid** with generous margins to maintain an editorial feel. 
- **The "Wrapped" Aesthetic:** Significant vertical spacing (64px+) between major sections creates a narrative flow, preventing the data-rich environment from feeling cluttered.
- **Responsive Behavior:** On desktop, use wide 48px margins to frame the content like a premium magazine spread. On mobile, collapse to a single column with 16px margins, but maintain the large Serif headlines to preserve brand character.
- **Density Controls:** Provide three density settings for data tables: "Editorial" (Spacious), "Standard", and "Terminal" (Compact).

## Elevation & Depth

Depth is communicated through **Glassmorphic Stacking** rather than traditional drop shadows.
- **Level 0 (Base):** Deep Obsidian (#050505).
- **Level 1 (Card):** Charcoal (#0F0F12) with a 1px inner border (10% white opacity).
- **Level 2 (Overlay/Modal):** Semi-transparent Charcoal with a 20px Backdrop Blur.
- **The Heritage Layer:** Subtle Warli or Madhubani line art is placed between Level 0 and Level 1. The card's glass effect should subtly distort the patterns underneath, creating a sense of physical materials.

## Shapes

The shape language is sophisticated and modern. 
- **Standard Radius:** 16px (rounded-lg) for main data cards and containers.
- **Interactive Radius:** 8px (rounded-md) for buttons and input fields to provide a sharper, more professional feel compared to the softer containers.
- **The "Gold Thread":** Use 2px tall Intelligence Gold lines to separate logical sections within a card or to highlight the "active" state of a navigation item.

## Components

- **Intelligence Cards:** Large containers with a subtle gradient stroke. They feature a Serif title in the top left and a "Confidence Score" in Intelligence Gold in the top right.
- **Action Buttons:** Primary buttons are solid Intelligence Gold with black text. Secondary buttons use a "ghost" style with a 1px Slate Grey border.
- **Data Chips:** Small, low-contrast capsules used for tagging campaign types or platforms (e.g., "Instagram", "Search").
- **Analytical Inputs:** Dark, recessed fields with gold focus states. Use Geist for all input text to maintain technical clarity.
- **Pattern Overlays:** A specialized component that renders SVG heritage patterns at 3% opacity. These should be used sparingly, primarily in the hero section or behind key performance cards.
- **The "Pulse" Indicator:** A small, animated glow in Success Emerald or Risk Ruby used next to real-time metrics to indicate live data streaming.