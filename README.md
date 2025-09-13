# CryptoDash - Cryptocurrency Price Tracker

A modern, responsive cryptocurrency price-tracking web application built with React.js, featuring real-time market data from the CoinGecko API.

## 🚀 Features

- **Real-time Data**: Live cryptocurrency prices and market data
- **Multiple Currencies**: Support for USD, INR, and EUR
- **Interactive Charts**: 7-day sparkline charts using Chart.js
- **Watchlist**: Save favorite cryptocurrencies locally
- **Search Functionality**: Filter coins by name or symbol
- **Responsive Design**: Works seamlessly on all devices
- **Dark Theme**: Modern dark UI with glowing effects

## 🛠️ Technology Stack

### Frontend
- **React.js** (.jsx files)
- **React Router DOM** - Client-side routing
- **React Context API** - Global state management
- **Bootstrap 5** - UI framework
- **Custom CSS** - Dark theme styling

### Data & Charts
- **Axios** - HTTP client for API calls
- **Chart.js** - Interactive charts
- **React Chart.js 2** - React wrapper for Chart.js
- **CoinGecko API** - Cryptocurrency data source
- **LocalStorage** - Client-side data persistence

## 📱 Pages

1. **Home** - Top 10 cryptocurrencies in table format with search
2. **Pricing** - Extended cryptocurrency list in card grid with load more
3. **WatchList** - User's favorited cryptocurrencies
4. **About** - Project information and tech stack
5. **Sign Up** - Static registration form (demo only)

## 🎯 Key Features Explained

### Home Page
- Displays top 10 cryptocurrencies by market cap
- Real-time price updates
- 24-hour price change indicators
- 7-day sparkline charts
- Search functionality
- Add/remove from watchlist

### Pricing Page
- Card-based layout for better visualization
- Load more functionality (20 coins per page)
- Same features as Home page
- Responsive grid layout

### WatchList
- Locally stored favorite cryptocurrencies
- Persistent across browser sessions
- Remove coins from watchlist
- Real-time price updates

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CryptoDash
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📊 API Integration

The application uses the CoinGecko API for real-time cryptocurrency data:

- **Base URL**: `https://api.coingecko.com/api/v3`
- **Endpoints Used**:
  - `/coins/markets` - Get market data for cryptocurrencies
  - Parameters: `vs_currency`, `order`, `per_page`, `page`, `sparkline`

## 🎨 Design Features

- **Dark Theme**: Modern dark UI with gradient backgrounds
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Hover effects and transitions
- **Professional Layout**: Clean and intuitive interface
- **Glowing Effects**: Subtle glow effects on interactive elements

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔧 Customization

### Styling
- Main styles: `src/index.css`
- Component-specific styles: `src/App.css`
- Bootstrap classes for layout and components

### Adding New Features
- New components can be added to `src/components/`
- Context providers in `src/context/`
- Routes can be added in `src/App.jsx`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please open an issue in the repository.

---

**Note**: This is a portfolio project designed to demonstrate modern web development skills and cryptocurrency data integration. No actual authentication or backend functionality is implemented.
