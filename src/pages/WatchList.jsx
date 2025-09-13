import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrency } from '../context/CurrencyContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './WatchList.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WatchList = () => {
  const { currency } = useCurrency();
  const [watchlistCoins, setWatchlistCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchWatchlistCoins();
  }, [currency, watchlist]);

  const fetchWatchlistCoins = async () => {
    if (watchlist.length === 0) {
      setWatchlistCoins([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const coinIds = watchlist.join(',');
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinIds}&order=market_cap_desc&sparkline=true`
      );
      setWatchlistCoins(response.data);
    } catch (error) {
      console.error('Error fetching watchlist coins:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = (coinId) => {
    setWatchlist(prev => prev.filter(id => id !== coinId));
    localStorage.setItem('watchlist', JSON.stringify(watchlist.filter(id => id !== coinId)));
  };

  const formatPrice = (price) => {
    if (currency === 'usd') {
      return `$${price.toLocaleString()}`;
    } else if (currency === 'inr') {
      return `₹${price.toLocaleString()}`;
    } else if (currency === 'eur') {
      return `€${price.toLocaleString()}`;
    }
    return price.toLocaleString();
  };

  const getSparklineData = (sparklineData) => {
    if (!sparklineData || !sparklineData.price) return null;
    
    return {
      labels: sparklineData.price.map((_, index) => index),
      datasets: [
        {
          label: 'Price',
          data: sparklineData.price,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          borderWidth: 1,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  if (loading) {
    return (
      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4 text-light">My Watchlist</h1>
          
          {watchlistCoins.length === 0 ? (
            <div className="text-center">
              <div className="card bg-dark text-light">
                <div className="card-body">
                  <h5 className="card-title">No coins in watchlist</h5>
                  <p className="card-text">
                    Add coins to your watchlist by clicking the star (☆) icon on any cryptocurrency.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {watchlistCoins.map((coin) => (
                <div key={coin.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div className="card bg-dark text-light h-100 crypto-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="watchlist-coin-img"
                          />
                          <div>
                            <h6 className="mb-0 fw-bold">{coin.name}</h6>
                            <small className="text-muted">{coin.symbol.toUpperCase()}</small>
                          </div>
                        </div>
                        <button
                          className="watchlist-remove-btn"
                          onClick={() => removeFromWatchlist(coin.id)}
                          title="Remove from Watchlist"
                          aria-label="Remove from Watchlist"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="mb-3">
                        <h5 className="fw-bold">{formatPrice(coin.current_price)}</h5>
                        <span
                          className={`badge ${
                            coin.price_change_percentage_24h > 0
                              ? 'bg-success'
                              : 'bg-danger'
                          }`}
                        >
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>
                      
                      <div className="watchlist-sparkline-container">
                        {coin.sparkline_in_7d && (
                          <Line
                            data={getSparklineData(coin.sparkline_in_7d)}
                            options={sparklineOptions}
                          />
                        )}
                      </div>
                      
                      <div className="text-muted">
                        <small>Market Cap: ${(coin.market_cap / 1e9).toFixed(2)}B</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchList; 