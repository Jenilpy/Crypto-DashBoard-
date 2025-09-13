import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useCoins } from '../context/CoinsContext';
import './Home.css';

const Home = () => {
  const { currency } = useCurrency();
  const { allCoins, loading, initialized, fetchAllCoins, searchCoins } = useCoins();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch if we don't have coins or if currency changed and we have coins
    if (allCoins.length === 0 || (initialized && currency !== 'usd')) {
      fetchAllCoins(1, currency);
    }
  }, [currency, fetchAllCoins, allCoins.length, initialized]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Get top 10 coins for display
  const topCoins = allCoins.slice(0, 10);

  const toggleWatchlist = (coinId) => {
    setWatchlist(prev => {
      if (prev.includes(coinId)) {
        return prev.filter(id => id !== coinId);
      } else {
        return [...prev, coinId];
      }
    });
  };

  const formatPrice = (price) => {
    if (currency === 'usd') {
      return `$${Number(price).toLocaleString()}`;
    } else if (currency === 'inr') {
      return `₹${Number(price).toLocaleString()}`;
    } else if (currency === 'eur') {
      return `€${Number(price).toLocaleString()}`;
    }
    return Number(price).toLocaleString();
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `${(marketCap / 1e6).toFixed(2)}M`;
    }
    return Number(marketCap).toLocaleString();
  };

  // Auto-suggest functionality
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      setIsSearching(true);
      const results = searchCoins(value);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  // Use search results if searching, otherwise use top coins
  const displayCoins = isSearching ? searchResults : topCoins;

  // Don't render content if we're still loading and not initialized
  if (loading && !initialized) {
    return (
      <div className="home-loading">
        <div className="home-spinner"></div>
      </div>
    );
  }



  return (
    <div className="home-hero-section">
      <div className="home-container">
        <div className="home-hero-content">
          <h1 className="home-title">
            Largest <br /> Crypto Marketplace
          </h1>
          <p className="home-subtitle">
            Step into the future of finance! Join the world's leading <br />cryptocurrency marketplace and unlock endless possibilities
          </p>
          <div className="home-search-bar">
            <input
              type="text"
              className="home-search-input"
              placeholder="Search crypto.."
              aria-label="Search cryptocurrencies by name or symbol"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="home-search-btn"
              disabled={!searchTerm.trim()}
            >
              Search
            </button>
          </div>
        </div>
        <div className="home-table-section">
          <table className="home-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>24H Change</th>
                <th>Market Cap</th>
                <th>Watchlist</th>
              </tr>
            </thead>
            <tbody>
              {displayCoins.map((coin) => (
                <tr key={coin.id} className="home-table-row" onClick={() => navigate(`/crypto/${coin.id}`)}>
                  <td className="home-table-rank">{coin.market_cap_rank}</td>
                  <td>
                    <div className="home-coin-info">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="home-coin-img"
                      />
                      <div className="home-coin-name">{coin.name}</div>
                      <div className="home-coin-symbol">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </td>
                  <td className="home-table-price">{formatPrice(coin.current_price)}</td>
                  <td className={
                    coin.price_change_percentage_24h > 0
                      ? 'home-price-up'
                      : 'home-price-down'
                  }>
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className="home-table-marketcap">{formatMarketCap(coin.market_cap)}</td>
                  <td className="home-table-watchlist">
                    <button
                      className={
                        watchlist.includes(coin.id)
                          ? 'home-watchlist-btn active'
                          : 'home-watchlist-btn'
                      }
                      onClick={e => { e.stopPropagation(); toggleWatchlist(coin.id); }}
                      title={watchlist.includes(coin.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      aria-label={watchlist.includes(coin.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    >
                      {watchlist.includes(coin.id) ? '\u2605' : '\u2606'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home; 