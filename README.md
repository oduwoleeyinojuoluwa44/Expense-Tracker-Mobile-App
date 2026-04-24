# Expense Tracker Mobile App

React Native + Expo mobile app for tracking personal finances, modeled directly from the Figma design system for the project.

## Overview

This app focuses on a premium finance experience with clean analytics, budget management, and ledger views.

Implemented screens include:

- Overview dashboard
- Budgets & limits
- Insights
- Ledgers / expenses
- Settings
- Add transaction
- Security verification

## Design Source

UI is implemented from the Figma file:

- `Expense-tracker-app--Community-`
- File key: `IRCMly9Uedv7d5rOfyKpz8`
- Budget section based on node: `11:3265`

The budget screen follows the Figma section structure and visual treatment (header, action row, category cards, savings card, and bottom nav).

## Tech Stack

- Expo SDK 54
- React 19 + React Native 0.81
- Expo Router (file-based routing)
- TypeScript
- `expo-linear-gradient` for gradient surfaces/progress
- `react-native-svg` for vector ring graphics
- Google Fonts (`Inter`, `Manrope`)

## Project Structure

- `src/app/` route entry files
- `src/screens/` screen containers
- `src/components/figma/` reusable Figma-style UI components
- `src/data/` screen data and content maps
- `src/constants/figma.ts` design tokens and color constants

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start Expo:

```bash
npx expo start
```

3. Open on device:

- Scan QR code in Expo Go (SDK 54 compatible)
- Or run emulator from Expo CLI options

## Available Scripts

- `npm run start` - start development server
- `npm run android` - open Android target
- `npm run ios` - open iOS target
- `npm run web` - open web target
- `npm run lint` - run lint checks

## Notes

- This repository is focused on matching the provided Figma visuals without placeholder tabs for missing screens.
- Navigation items are only included when a corresponding working screen exists in the app.
