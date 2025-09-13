import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
import './CryptoDetails.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const currencySymbols = {
  usd: '$',
  inr: '₹',
  eur: '€',
};

const CryptoDetails = () => {
  const { id } = useParams();
  const { currency } = useCurrency();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );
        setCoin(response.data);
      } catch (err) {
        setError('Failed to fetch coin details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  if (loading) {
    return (
      <div className="crypto-details-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !coin) {
    return <div className="crypto-details-error">{error || 'Coin not found.'}</div>;
  }

  const formatPrice = (price) => {
    if (typeof price !== 'number') return '-';
    const symbol = currencySymbols[currency] || '';
    return symbol + price.toLocaleString();
  };

  const marketData = coin.market_data;
  const priceChange = marketData?.price_change_percentage_24h_in_currency?.[currency];
  const priceChangeClass = priceChange > 0 ? 'crypto-details-badge-up' : 'crypto-details-badge-down';

  // Extra stats
  const circulating = marketData?.circulating_supply;
  const total = marketData?.total_supply;
  const ath = marketData?.ath?.[currency];
  const volume = marketData?.total_volume?.[currency];

  return (
    <div className="crypto-details-container">
      {/* Hero Section */}
      <div className="crypto-details-hero card bg-dark text-light">
        <div className="crypto-details-hero-content">
          <img src={coin.image?.large} alt={coin.name} className="crypto-details-coin-img" />
          <div>
            <h1 className="crypto-details-title">{coin.name} <span className="crypto-details-symbol">{coin.symbol?.toUpperCase()}</span></h1>
            <div className="crypto-details-rank">Rank #{coin.market_cap_rank}</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="crypto-details-stats card bg-dark text-light">
        <div className="crypto-details-stats-grid">
          <div className="crypto-details-stat">
            <div className="crypto-details-stat-label">Current Price</div>
            <div className="crypto-details-stat-value">{formatPrice(marketData?.current_price?.[currency])}</div>
          </div>
          <div className="crypto-details-stat">
            <div className="crypto-details-stat-label">Market Cap</div>
            <div className="crypto-details-stat-value">{formatPrice(marketData?.market_cap?.[currency])}</div>
          </div>
          <div className="crypto-details-stat">
            <div className="crypto-details-stat-label">24h High</div>
            <div className="crypto-details-stat-value">{formatPrice(marketData?.high_24h?.[currency])}</div>
          </div>
          <div className="crypto-details-stat">
            <div className="crypto-details-stat-label">24h Low</div>
            <div className="crypto-details-stat-value">{formatPrice(marketData?.low_24h?.[currency])}</div>
          </div>
          <div className="crypto-details-stat">
            <div className="crypto-details-stat-label">24h Change</div>
            <div className={`crypto-details-badge ${priceChangeClass}`}>{priceChange ? priceChange.toFixed(2) + '%' : '-'}</div>
          </div>
          <div className="crypto-details-stat">
            <div className="crypto-details-stat-label">Circulating Supply</div>
            <div className="crypto-details-stat-value">{circulating ? circulating.toLocaleString() : '-'}</div>
          </div>
          <div className="crypto-details-stat">
            <div className="crypto-details-stat-label">Total Supply</div>
            <div className="crypto-details-stat-value">{total ? total.toLocaleString() : '-'}</div>
          </div>
          <div className="crypto-details-stat">
            <div className="crypto-details-stat-label">All-Time High</div>
            <div className="crypto-details-stat-value">{formatPrice(ath)}</div>
          </div>
          <div className="crypto-details-stat">
            <div className="crypto-details-stat-label">24h Volume</div>
            <div className="crypto-details-stat-value">{formatPrice(volume)}</div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      {coin.description?.en && (
        <div className="crypto-details-description card bg-dark text-light">
          <div className="crypto-details-description-header">About {coin.name}</div>
          <div className="crypto-details-description-text" dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ').slice(0, 3).join('. ') + '.' }} />
        </div>
      )}
    </div>
  );
};

export default CryptoDetails; 