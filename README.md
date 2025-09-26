# Game Hub (Mobile)

A responsive cross‑platform (iOS / Android / Web) mobile application for discovering, filtering, and exploring video games. Built with Expo (React Native), TypeScript, and modern navigation + animation tooling. This repository contains the mobile version of the project.

> If you are looking for the web version, it is available here:  
> **Web App Repository:** [Game-Hub-Web](https://github.com/KovinthKrishna/Game-Hub-Web)

---

## Features

- Browse games with mobile-optimized UI and smooth navigation
- Filter and search functionality
- Theming and system color scheme support
- Persistent local storage for user preferences (Async Storage)
- API-driven data layer (Axios abstraction)
- Firebase integration (authentication / services as configured)
- Strongly typed with TypeScript
- Built using Expo Router for file-based navigation

---

## Technologies used

| Layer            | Technology                       |
| ---------------- | -------------------------------- |
| Framework        | React Native (Expo) + TypeScript |
| Navigation       | Expo Router                      |
| Build/Runtime    | Expo                             |
| HTTP Client      | Axios                            |
| Icons            | @expo/vector-icons               |
| State/Storage    | React hooks + Async Storage      |
| Backend Services | Firebase                         |

---

## Environment Variables

The project uses Expo. To safely expose variables to the app at runtime, prefix them with `EXPO_PUBLIC_`.

Create a .env (or .env.local) in the project root.

### Expected Variables

| Variable                                   | Description                    | Example                |
| ------------------------------------------ | ------------------------------ | ---------------------- |
| `EXPO_PUBLIC_RAWG_API_KEY`                 | API key for RAWG game database | `your_api_key_here`    |
| `EXPO_PUBLIC_FIREBASE_API_KEY`             | Firebase API key               | `xxxxxxxxxxxxxxxxxxxx` |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase project ID            | `yourapp`              |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID             | `1234567890`           |
| `EXPO_PUBLIC_FIREBASE_APP_ID`              | Firebase app ID                | `1:123:web:abc123`     |

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm / yarn / pnpm

Confirm versions:

```bash
node -v
npm -v
```

### Installation

```bash
git clone https://github.com/KovinthKrishna/Game-Hub-Mobile.git
cd Game-Hub-Mobile
npm install
```

### Configure Environment

Create a `.env` and add required variables (see [Environment Variables](#environment-variables)).

### Running in Development

```bash
npm start
```

Then:

- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan the QR code in Expo Go (on a physical device)

---

## Project Structure

```
.
├── app/                    # Expo Router entry + route segments
├── components/             # Reusable UI components
├── context/                # React context providers (e.g., theme, auth, settings)
├── services/               # API client
├── hooks/                  # Custom hooks
├── interfaces/             # TypeScript interfaces
├── utils/                  # Helper utilities
├── firebaseConfig.ts
├── app.json
├── tsconfig.json
├── declarations.d.ts
├── package.json
```

## Web Version

This is the mobile implementation of Game Hub.  
Looking for the web experience? Visit the companion repository: [Game-Hub-Web](https://github.com/KovinthKrishna/Game-Hub-Web)
