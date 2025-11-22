# SeniorSync

AI-Powered Senior Care Assistance

## About

SeniorSync is a luxurious, high-tech health monitoring dashboard for seniors. Built with React, TypeScript, and modern UI/UX design principles.

## Features

- **Activity Tracking**: Monitor daily steps, calories, and distance with interactive circular progress indicators
- **Hydration Tracker**: Track water intake with interactive glass icons
- **Medication Management**: Visual timeline showing medication schedule with missed medication alerts
- **Heart Rate Monitoring**: Beautiful charts displaying heart rate data over 24 hours
- **Voice Assistant**: Floating action button with waveform animation
- **Drill-Down Navigation**: Click any widget to view detailed information pages
- **Rich User Profile**: Enhanced header with profile dropdown and notification system

## Tech Stack

- **Framework**: React + Vite (TypeScript)
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide-React
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Routing**: React Router DOM

## Design System

- **Color Palette**: Medical Blue (#0ea5e9), with alert colors for warnings
- **Aesthetics**: Glassmorphism with backdrop blur effects
- **Typography**: Inter font family
- **Components**: Rounded corners (rounded-3xl), deep shadows, smooth transitions

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx      # Main layout with sidebar
│   │   └── TopHeader.tsx      # Enhanced header with profile dropdown
│   └── ui/                     # Widget components
├── pages/
│   ├── DoctorDashboard.tsx    # Main dashboard
│   └── details/                # Detail pages for drill-down navigation
├── data/
│   └── mockData.ts            # Mock data for the dashboard
└── lib/
    └── utils.ts               # Utility functions
```

## License

MIT
