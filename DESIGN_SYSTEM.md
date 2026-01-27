# Checked Design System

This document describes the design tokens and variables used in the Checked application, based on the Figma design system export.

## Token Structure

The design system follows a hierarchical token structure:
- **Foundation Tokens**: Base values (colors, spacing, typography)
- **Semantic Tokens**: Contextual tokens that reference foundation tokens (text, icon, surface, border)

## Colors

### Foundation Colors
- `--color-foundations-white`: #ffffff
- `--color-foundations-black`: #201f19

### Primary Colors (Teal)
The primary brand color palette:
- `--Primary-50` through `--Primary-950`: Teal color scale
- Default primary: `--Primary-600` (#1c7782)
- Hover state: `--Primary-700` (#125c65)

### Neutral Colors (Slate)
Grayscale palette for text, backgrounds, and UI elements:
- `--color-neutral-50` through `--color-neutral-950`: Slate color scale

### Semantic Colors

#### Error (Red)
- `--Error-100` through `--Error-950`: Red color scale
- Default: `--Error-600` (#dc2626)

#### Information (Blue)
- `--Information-100` through `--Information-950`: Blue color scale
- Default: `--Information-600` (#2563eb)

#### Warning (Yellow)
- `--Warning-100` through `--Warning-950`: Yellow color scale
- Default: `--Warning-600` (#ca8a04)

#### Success (Green)
- `--Success-100` through `--Success-950`: Green color scale
- Default: `--Success-600` (#16a34a)

## Typography

### Font Families
- `--Font-Primary`: "Sora" (Primary font for headings and UI)
- `--Font-Secondary`: "Montserrat" (Secondary font)

### Font Weights
- `--font-weight-light`: 300
- `--font-weight-regular`: 400
- `--font-weight-semibold`: 600
- `--font-weight-bold`: 700

### Typography Scale (Mobile)

#### Headings
- **H1**: `--Font-Headings-H1-text-size` (48px), line-height: 56px
- **H2**: `--Font-Headings-H2-text-size` (40px), line-height: 48px
- **H3**: `--Font-Headings-H3-text-size` (32px), line-height: 40px
- **H4**: `--Font-Headings-H4-text-size` (28px), line-height: 32px
- **H5**: `--Font-Headings-H5-text-size` (24px), line-height: 28px
- **H6**: `--Font-Headings-H6-text-size` (20px), line-height: 24px

#### Body Text
- **Body**: `--Font-Copy-body-text-size` (16px), line-height: 20px
- **Body Large**: `--size-font-copy-body-lg-text-size` (20px), line-height: 24px
- **Body Small**: `--size-font-copy-body-sm-text-size` (14px), line-height: 16px

#### Caption
- **Caption**: `--Font-Copy-caption-text-size` (12px), line-height: 16px

### Typography Scale (Desktop)
Typography scales up on desktop (768px+):
- **H1**: 60px / 72px line-height
- **H2**: 48px / 56px line-height
- **H3**: 40px / 48px line-height
- **H4**: 32px / 40px line-height

## Spacing

### Spacing Scale
- `--spacing-spacing-0`: 0px
- `--spacing-spacing-100`: 4px
- `--spacing-spacing-200`: 8px
- `--spacing-spacing-300`: 12px
- `--spacing-spacing-400`: 16px
- `--spacing-spacing-500`: 20px
- `--spacing-spacing-600`: 24px
- `--spacing-spacing-700`: 28px
- `--spacing-spacing-800`: 32px
- `--spacing-spacing-xs`: 40px
- `--spacing-spacing-sm`: 48px
- `--spacing-spacing-md`: 56px
- `--spacing-spacing-lg`: 64px
- `--spacing-spacing-xl`: 96px
- `--spacing-spacing-2xl`: 128px
- `--spacing-spacing-3xl`: 256px

### Number Scale
Used for borders, radius, and other measurements:
- `--number-scale-0` through `--number-scale-1800`: Various pixel values
- `--number-scale-round`: 9999px (for fully rounded elements)

## Borders

### Border Width
- `--Border-Width-none`: 0
- `--Border-Width-xs`: 1px
- `--Border-Width-sm`: 2px
- `--Border-Width-md`: 4px
- `--Border-Width-lg`: 8px

### Border Radius
- `--Border-Radius-none`: 0
- `--Border-Radius-50`: 2px
- `--Border-Radius-100`: 4px
- `--Border-Radius-200`: 8px
- `--Border-Radius-300`: 12px
- `--Border-Radius-round`: 9999px

## Semantic Tokens

### Text Colors
- `--text-default-heading`: For headings on light backgrounds
- `--text-default-body`: For body text on light backgrounds
- `--text-default-caption`: For captions on light backgrounds
- `--text-default-placeholder`: For placeholder text
- `--text-on-colour-*`: Text colors for use on colored backgrounds
- `--text-primary-default`: Primary brand color for text
- `--text-primary-default-hover`: Primary color hover state
- `--text-error-default`, `--text-information-default`, etc.: Semantic text colors

### Icon Colors
- `--icon-primary-default`: Primary icon color
- `--icon-primary-default-hover`: Primary icon hover state
- `--icon-on-colour-*`: Icon colors for use on colored backgrounds
- Semantic variants: `--icon-error-default`, `--icon-information-default`, etc.

### Surface Colors
- `--surface-page`: Page background color
- `--surface-default`: Default surface color
- `--surface-secondary`: Secondary surface color
- `--surface-primary-default`: Primary button/surface color
- `--surface-primary-default-hover`: Primary hover state
- `--surface-primary-default-subtle`: Subtle primary surface
- Semantic variants: `--surface-error-default`, `--surface-information-default`, etc.

### Border Colors
- `--border-default`: Default border color
- `--border-on-colour`: Border color on colored backgrounds
- `--border-primary-default`: Primary border color
- `--border-primary-default-hover`: Primary border hover state
- `--border-primary-focus`: Primary focus state
- Semantic variants: `--border-error-default`, `--border-information-default`, etc.

## Layout

### Mobile
- `--size-frame-width`: 355px
- `--spacing-spacing-form-width`: 355px
- `--spacing-spacing-device-size-frame`: 393px
- `--spacing-spacing-form-horizontal-spacing`: 18px

### Desktop (768px+)
- `--size-frame-width`: 876px
- `--spacing-spacing-form-width`: 856px
- `--spacing-spacing-device-size-frame`: 1440px
- `--spacing-spacing-form-horizontal-spacing`: 64px

## Usage

Import the design tokens in your CSS:

```css
@import './design-tokens.css';
```

Or in JavaScript:

```javascript
import './design-tokens.css';
```

### Example Usage

```css
.my-component {
  /* Use semantic tokens when possible */
  color: var(--text-default-body);
  background-color: var(--surface-default);
  padding: var(--spacing-spacing-400);
  border-radius: var(--Border-Radius-200);
  border: var(--Border-Width-md) solid var(--border-default);
  
  /* Use foundation tokens for custom values */
  font-size: var(--Font-Copy-body-text-size);
  font-family: var(--Font-Primary);
}

.primary-button {
  background-color: var(--surface-primary-default);
  color: var(--text-primary-on-colour);
  border-radius: var(--Border-Radius-700);
}

.primary-button:hover {
  background-color: var(--surface-primary-default-hover);
}
```

## Best Practices

1. **Prefer Semantic Tokens**: Use semantic tokens (`--text-default-body`, `--surface-primary-default`) over foundation tokens when available
2. **Use Spacing Scale**: Always use spacing scale tokens instead of arbitrary values
3. **Responsive Typography**: Typography automatically scales on desktop - use the base tokens
4. **Color Consistency**: Use semantic color tokens for consistent theming
5. **Border Radius**: Use `--Border-Radius-700` (28px) for highly rounded buttons

## Token Naming Convention

Tokens follow this naming pattern:
- Foundation tokens: `--{category}-{property}-{value}` (e.g., `--Primary-600`)
- Semantic tokens: `--{category}-{context}-{state}` (e.g., `--text-primary-default`)
- Spacing: `--spacing-spacing-{value}` or `--number-scale-{value}`
- Typography: `--Font-{type}-{property}` or `--size-font-{type}-{property}`
