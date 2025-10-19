# CivicCheck Design Guidelines

## Design Approach
**System:** Material Design 3 + Trust-Focused Customization  
**Rationale:** Information-dense credibility tool requiring clarity, hierarchy, and user trust. Material Design provides strong data presentation patterns while allowing customization for civic/trust branding.

## Core Design Principles
1. **Credibility First:** Visual design reinforces trustworthiness and objectivity
2. **Clarity Over Decoration:** Every element serves information hierarchy
3. **Responsive Trust:** Maintain professional appearance across all devices

## Color Palette

**Light Mode:**
- Primary: 210 80% 45% (professional blue)
- Surface: 0 0% 98% (soft white background)
- Card Background: 0 0% 100% (pure white cards)
- Text Primary: 220 20% 15%
- Text Secondary: 220 15% 45%
- Success (Likely True): 145 65% 42%
- Warning (Unverified): 40 85% 55%
- Error (Possibly False): 355 75% 50%
- Accent: 210 85% 55% (CTA blue)

**Dark Mode:**
- Primary: 210 75% 55%
- Surface: 220 15% 12%
- Card Background: 220 12% 15%
- Text Primary: 0 0% 95%
- Text Secondary: 220 10% 65%
- Success: 145 55% 48%
- Warning: 40 75% 60%
- Error: 355 65% 55%

## Typography
**Fonts:** Inter (primary), system-ui fallback
- Hero/H1: 2.5rem (40px), weight 700
- Section Headers: 1.75rem (28px), weight 600
- Card Titles: 1.25rem (20px), weight 600
- Body: 1rem (16px), weight 400, line-height 1.6
- Small/Meta: 0.875rem (14px), weight 500

## Layout System
**Spacing Scale:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Section padding: py-12 (mobile), py-20 (desktop)
- Card padding: p-6 (mobile), p-8 (desktop)
- Component gaps: gap-4 (tight), gap-8 (comfortable)
- Container max-width: max-w-4xl (centered content)

## Component Library

### Navigation Bar
- Fixed top, backdrop-blur with subtle shadow
- Logo: "CivicCheck" with shield/checkmark icon (left)
- Dark mode toggle (right)
- Height: h-16, px-6 spacing
- Border bottom: 1px subtle border

### Hero/Input Section
- No large hero image (function-focused)
- Centered layout with max-w-3xl
- Prominent heading: "Verify News Credibility with AI"
- Subheading explaining purpose (2 lines max)
- Generous top padding: pt-24 (below fixed nav)

### Text Input Area
- Large textarea: min-h-48, rounded-xl borders
- Placeholder: "Paste news headline, article excerpt, or social media post..."
- Character counter (bottom right, subtle)
- Focus state: ring-2 ring-primary
- Background: card surface color

### Check Button
- Prominent CTA: Large rounded-full button
- px-12 py-4, text-lg weight-600
- Primary blue with hover lift (subtle transform)
- Loading state: spinning icon + "Analyzing..."

### Results Card
- Elevated card: rounded-2xl, shadow-lg
- Verdict badge at top: pill-shaped, status color, weight-600
- Reasoning section: prose formatting, comfortable line-height
- Sources list: clickable links with external icon
- Confidence meter: horizontal bar showing AI certainty
- Smooth slide-up animation on display (0.3s ease)

### Recent Checks Section
- Below main content, max 3 recent items
- Compact cards in grid: grid-cols-1 md:grid-cols-3
- Truncated text with expand option
- Timestamp display (relative: "2 mins ago")

### Footer
- Simple centered layout
- Links: About, How It Works, Privacy
- Disclaimer: "AI-assisted analysis, not definitive fact-checking"
- Social sharing options (optional)

## Interactions & Animations
**Use sparingly:**
- Card slide-up on results: translateY + opacity
- Button hover: subtle scale (1.02) + shadow increase
- Focus rings: 2px offset for accessibility
- Loading spinner: rotating icon only
- **No**: parallax, scroll animations, page transitions

## Accessibility
- WCAG AA contrast ratios minimum
- Dark mode maintains full contrast standards
- Focus indicators on all interactive elements
- Semantic HTML: proper heading hierarchy
- ARIA labels for verdict status

## Images
**No hero image required** - this is a utility-focused tool where function precedes visual storytelling. The interface should feel professional and efficient, not marketing-driven.

**Optional illustrative elements:**
- Small credibility badge icons (SVG, not photos)
- Fact-check source logos (if linking to Snopes, PolitiFact, etc.)
- Information graphics explaining AI analysis (diagrams, not photos)

## Mobile Considerations
- Stack all content to single column
- Textarea full-width with comfortable padding
- Results card: full-width, reduced padding (p-6)
- Navigation: hamburger menu for additional links
- Touch targets: minimum 44px height for buttons

## Trust Signals
- Subtle "Powered by OpenAI" badge
- Disclaimer visible but not alarming
- Clear explanation of AI limitations
- Professional, neutral tone throughout
- No aggressive calls-to-action