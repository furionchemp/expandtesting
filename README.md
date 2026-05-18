# Expand Testing

This repository contains Playwright end-to-end UI test practice for https://practice.expandtesting.com/.

## Tech Stack

- Node.js
- Playwright (`@playwright/test`)
- TypeScript

## Project Structure

- `pages/` - Page Object classes
- `tests/` - Test specs
- `playwright.config.ts` - Playwright configuration

## Install

```bash
npm install
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/trackcalorie.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

## Show HTML Report

```bash
npx playwright show-report
```
