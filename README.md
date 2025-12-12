# 🦠 COVID-19 Global Tracker

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://kennybecerra.github.io/covid_tracker/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/kennybecerra/covid_tracker)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

**🌐 [View Live Application](https://kennybecerra.github.io/covid_tracker/)**

## 📋 Overview

A comprehensive, real-time COVID-19 data visualization dashboard built with modern React architecture. This application provides interactive charts, 3D globe visualization, country-specific statistics, and historical trend analysis for global COVID-19 data.

## ✨ Features

- 📊 **Interactive Data Visualizations**: Multi-line charts, bar charts, and world map with zoom/pan controls
- 🌍 **3D Globe View**: Interactive 3D globe powered by WebGL showing global COVID-19 data
- 🗺️ **World Map**: Zoomable and draggable Mercator projection with hover tooltips
- 📱 **Responsive Design**: Centered layout optimized for all screen sizes
- 🎨 **Modern UI**: Clean interface with smooth animations using React Spring
- 📈 **Historical Data**: Track trends with customizable time ranges
- 🔍 **Country Comparison**: Compare up to 5 countries side-by-side
- ⚡ **Smart Caching**: 1-hour API response caching for improved performance
- 📋 **Sortable Tables**: Interactive tables with pagination and horizontal scrolling
- 🎯 **Real-time Data**: Live statistics from disease.sh API

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18.2** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety across the entire codebase
- **Vite 7.1** - Lightning-fast development server and build tool

### **Data Visualization**
- **@visx 3.12** - Low-level visualization primitives for React
  - Axes, scales, shapes, tooltips, and geo projections
- **React Globe.gl 2.37** - 3D globe visualization with WebGL
- **Three.js 0.182** - 3D graphics library powering the globe
- **Topojson Client 3.1** - Geographic data processing
- **D3 Geo 3.1** - Geographic projections and transformations

### **UI & Styling**
- **Ant Design 5.1** - Theme provider and configuration
- **React Spring 9.7** - Physics-based animations for smooth transitions
- **SCSS/Sass 1.93** - Advanced CSS preprocessing with modern module syntax
- **CSS Modules** - Component-scoped styling

### **Utilities & Data**
- **Numeral.js 2.0** - Number formatting (1,000,000 → 1M)
- **Day.js 1.11** - Lightweight date manipulation
- **React Router DOM 5.2** - Client-side routing

### **Development Tools**
- **ESLint 8.57** - Code linting with TypeScript support
- **Prettier 3.6** - Automated code formatting
- **TypeScript ESLint 8.45** - TypeScript-specific linting rules

### **Build & Deployment**
- **GitHub Pages 6.3** - Static site hosting
- **Vite Build System** - Optimized production builds with code splitting

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/kennybecerra/covid_tracker.git

# Navigate to project directory
cd covid_tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server on port 3002
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
npm run deploy       # Deploy to GitHub Pages
```

## 📊 Data Sources

- **Disease.sh API** - Comprehensive COVID-19 statistics
  - Global statistics and country-level data
  - Historical timeline data (30+ days)
  - Testing and recovery information
  - API responses cached for 1 hour

## 🏗️ Project Structure

```
src/
├── api/                    # API integration with caching
│   └── covid.ts           # COVID-19 API client
├── components/
│   ├── Charts/            # Chart components (@visx)
│   │   ├── MultiLineChart.tsx
│   │   ├── VaccinationProgress.tsx
│   │   └── WorldMap.tsx
│   ├── CovidSections/     # Dashboard sections
│   │   ├── DailyCasesChart.tsx
│   │   ├── GlobalSummary.tsx
│   │   ├── TopCountriesTable.tsx
│   │   ├── VaccinationSection.tsx
│   │   └── WorldMapSection.tsx
│   ├── Globe/             # 3D globe visualization
│   │   └── Globe.tsx
│   ├── header/            # Navigation header
│   └── Layout/            # Layout components
│       └── CovidLayout.tsx
├── routes/
│   └── Map/               # 3D globe page
├── redux/                 # Redux store (legacy - minimal usage)
└── utility/               # Helper utilities

```

## 🎯 Key Features Implementation

### **API Caching**
- In-memory cache with 1-hour TTL
- Reduces API calls and improves performance
- Automatic cache expiration and cleanup

### **Interactive Visualizations**
- Zoom and pan controls on world map
- Hover tooltips with detailed statistics
- Animated bar charts with React Spring
- Multi-line charts for historical trends

### **Responsive Layout**
- Centered container with max-width: 1200px
- Grid layout adapts to mobile screens
- Sticky table columns for horizontal scrolling

### **Data Presentation**
- Sortable columns with ascending/descending order
- Pagination with configurable items per page (5, 10, 20, 50)
- Country selection dropdown for comparisons
- Number formatting with abbreviations (1M, 1K)

## 🌐 Pages

1. **Overview** (`/`) - Dashboard with global summary, charts, and tables
2. **Map** (`/map`) - 3D interactive globe visualization

## 👨‍💻 Author

**Kenny Becerra**
- GitHub: [@kennybecerra](https://github.com/kennybecerra)

---

⭐ If you found this project helpful, please consider giving it a star!
