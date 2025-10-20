# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML website for Batmex Group, a construction and logistics company. The project consists of a single, self-contained HTML file (`main.html`) with embedded CSS and JavaScript for a modern, responsive landing page.

## Architecture

- **Single-file architecture**: All HTML, CSS, and JavaScript code is contained within `main.html`
- **No build process**: The site can be served directly from any web server or opened in a browser
- **Responsive design**: Mobile-first approach with CSS Grid and Flexbox
- **Vanilla JavaScript**: No external frameworks or dependencies

## Key Components

- **Header/Navigation**: Fixed header with mobile hamburger menu
- **Hero Section**: Animated landing area with statistics cards
- **Services Section**: Grid-based service cards with hover effects
- **Interactive Features**: Smooth scrolling, mobile menu toggle, scroll-based animations

## Development Commands

Since this is a static HTML project, there are no build commands. To work with the project:

- **View the site**: Open `main.html` directly in a web browser
- **Live development**: Use any static file server (e.g., `python -m http.server` or VS Code Live Server extension)
- **No dependencies**: No package.json, node_modules, or build tools required

## Styling Approach

- **CSS-in-HTML**: All styles are embedded in the `<style>` tag
- **CSS Custom Properties**: Uses CSS variables for consistent theming
- **Modern CSS**: Utilizes Grid, Flexbox, backdrop-filter, and CSS animations
- **Color Scheme**: Dark theme with orange gradient accents (#ff6b35, #f7931e)

## JavaScript Features

- Mobile menu toggle functionality
- Smooth scrolling navigation
- Dynamic header background on scroll
- Intersection Observer for scroll-based animations
- Event delegation for navigation links

## Responsive Breakpoints

- Mobile: max-width 768px
- Desktop: Above 768px
- Uses CSS Grid with auto-fit for flexible layouts