# Checked - Self-Health Assessment Tool

A mobile-first React application built to replicate the Figma design perfectly, using a comprehensive design system with tokens, variables, and components.

## Features

- Clean, modern mobile design
- **Design System Integration**: Full implementation of Figma design tokens and variables
- Teal color scheme with semantic color tokens
- Typography system with consistent font sizes and weights
- Spacing scale for consistent layouts
- Responsive layout
- Google Sign-in button with official logo
- Email authentication option
- Pagination indicators for onboarding flow

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Design System

This project implements a comprehensive design system based on the Figma design tokens:

- **Design Tokens**: All colors, typography, spacing, and component variables are defined in `src/design-tokens.css`
- **CSS Variables**: Uses CSS custom properties for easy theming and consistency
- **Component Standards**: Buttons, inputs, and other components follow design system specifications
- **Responsive Design**: Mobile-first approach with consistent spacing and layout tokens

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation of all available tokens and variables.

### Key Design Details

- **Logo**: Teal circular icon with upward trending line graph and arrow
- **Primary Color**: `--color-primary` (#14B8A6)
- **Typography**: System fonts with defined size and weight scales
- **Layout**: Centered, mobile-first design with max-width of 375px
- **Buttons**: Highly rounded (28px border-radius) using `--radius-button` token

## Project Structure

```
checked-test-app/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Component styles (uses design tokens)
│   ├── design-tokens.css    # Design system tokens and variables
│   ├── index.css            # Global styles
│   ├── main.jsx             # Application entry point
│   └── assets/
│       └── checked-logo.png # Checked logo image
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies and scripts
├── DESIGN_SYSTEM.md         # Design system documentation
└── README.md                # This file
```
