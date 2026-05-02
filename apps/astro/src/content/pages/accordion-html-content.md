---
title: Accordion HTML Content Fixture
description: Build fixture proving accordion htmlContent validates through app content schemas.
fixture: true
blocks:
  - type: hero
    title: Accordion HTML Content Fixture
    subtitle: Validates trusted accordion HTML strings through Astro content.
    size: sm
    center: true
  - type: accordion
    items:
      - title: Content-only item
        content: Content-only accordion item
      - title: HTML-only item
        htmlContent: '<strong data-phase-18="trusted">Trusted HTML</strong>'
      - title: Both content fields item
        content: Plain fallback content remains serializable.
        htmlContent: '<em data-phase-18="precedence">Trusted HTML wins later</em>'
      - title: Empty HTML item
        htmlContent: ""
---

This page is a build fixture for validating accordion item schema shapes.
