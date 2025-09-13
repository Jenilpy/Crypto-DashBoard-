import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
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
import './Pricing.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Pricing = () => {
  const { currency } = useCurrency();
  const [coins, setCoins] = useState([]);
  const [coinImages, setCoinImages] = useState({});
  const [sparklines, setSparklines] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoins(page);
    // eslint-disable-next-line
  }, [page, currency]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const fetchCoins = async (pageToFetch = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: currency,
            order: 'market_cap_desc',
            per_page: 20,
            page: pageToFetch,
            sparkline: true,
          },
        }
      );
      if (pageToFetch === 1) {
        setCoins(response.data);
      } else {
        setCoins(prev => [...prev, ...response.data]);
      }
      // CoinGecko provides image URLs directly
      const imageMap = {};
      response.data.forEach(coin => {
        imageMap[coin.id] = coin.image;
      });
      setCoinImages(prev => ({ ...prev, ...imageMap }));
      // Sparklines are included in response
      const sparkMap = {};
      response.data.forEach(coin => {
        sparkMap[coin.id] = coin.sparkline_in_7d ? coin.sparkline_in_7d.price : [];
      });
      setSparklines(prev => ({ ...prev, ...sparkMap }));
      setHasMore(response.data.length === 20);
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      setLoading(false);
    }
  };

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



  if (loading && coins.length === 0) {
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
          <h1 className="text-center mb-4 text-light">Cryptocurrency Pricing</h1>
          
          {/* Welcome Text */}
          <div className="pricing-welcome-section">
            <p className="pricing-welcome-text">
              Welcome to the crypto pricing zone — your go-to tracker for live market data.
              Get instant access to current prices, trends, and more.
            </p>
          </div>
          
          {/* Crypto Cards Grid */}
          <div className="row">
            {coins.map((coin) => (
              <div key={coin.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card bg-dark text-light h-100 crypto-card pricing-card" onClick={() => navigate(`/crypto/${coin.id}`)}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex align-items-center gap-2">
                        {coinImages[coin.id] ? (
                          <img
                            src={coinImages[coin.id]}
                            alt={coin.name}
                            className="pricing-coin-img"
                          />
                        ) : (
                          <div className="pricing-coin-placeholder" />
                        )}
                        <div>
                          <h6 className="mb-0 fw-bold">{coin.name}</h6>
                          <small className="text-muted">{coin.symbol.toUpperCase()}</small>
                        </div>
                      </div>
                      <button
                        className={
                          watchlist.includes(coin.id)
                            ? 'pricing-watchlist-btn active'
                            : 'pricing-watchlist-btn'
                        }
                        onClick={e => { e.stopPropagation(); toggleWatchlist(coin.id); }}
                        title={watchlist.includes(coin.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        aria-label={watchlist.includes(coin.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        {watchlist.includes(coin.id) ? '\u2605' : '\u2606'}
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
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </div>
                    <div className="mb-3 pricing-sparkline-container">
                      {sparklines[coin.id] && sparklines[coin.id].length > 0 && (
                        <Line
                          data={{
                            labels: sparklines[coin.id].map((_, i) => i),
                            datasets: [
                              {
                                label: 'Price',
                                data: sparklines[coin.id],
                                borderColor: '#007bff',
                                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                                borderWidth: 1,
                                fill: true,
                                tension: 0.4,
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false }, tooltip: { enabled: false } },
                            scales: { x: { display: false }, y: { display: false } },
                            elements: { point: { radius: 0 } },
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Load More Button */}
          <div className="row">
            <div className="col-12 d-flex justify-content-center mb-5">
              {hasMore ? (
                <button
                  className="button"
                  style={{ '--clr': '#7808d0' }}
                  onClick={() => setPage(prev => prev + 1)}
                  disabled={loading}
                >
                  <span className="button__icon-wrapper">
                    <svg
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="button__icon-svg"
                      width="10"
                    >
                      <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg
                      viewBox="0 0 14 15"
                      fill="none"
                      width="10"
                      xmlns="http://www.w3.org/2000/svg"
                      className="button__icon-svg button__icon-svg--copy"
                    >
                      <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  {loading ? 'Loading...' : 'Explore More'}
                </button>
              ) : (
                <button className="button" style={{ '--clr': '#7808d0' }} disabled>
                  No More Coins
                </button>
              )}
            </div>
          </div>
        </div> {/* End of col-12 */}
      </div> {/* End of row */}
    </div> 
  );
};

export default Pricing; 