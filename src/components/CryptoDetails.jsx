import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCurrency } from '../context/CurrencyContext';
import { Line } from 'react-chartjs-2';
import './CryptoDetails.css';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoDetails = () => {
  const { id } = useParams();
  const { currency } = useCurrency();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [chartLoading, setChartLoading] = useState(true);

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
        let msg = 'Failed to fetch coin details.';
        if (err.response && err.response.status === 429) {
          msg = 'You are being rate limited by CoinGecko. Please wait a minute and try again.';
        } else if (err.response && err.response.data && err.response.data.error) {
          msg = err.response.data.error;
        } else if (err.message) {
          msg = err.message;
        }
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id, currency]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setChartLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=7&interval=hourly`
        );
        const prices = response.data.prices;
        setChartData({
          labels: prices.map(price => {
            const date = new Date(price[0]);
            return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:00`;
          }),
          datasets: [
            {
              label: 'Price',
              data: prices.map(price => price[1]),
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        let msg = 'Failed to load chart data.';
        if (err.response && err.response.status === 429) {
          msg = 'You are being rate limited by CoinGecko. Please wait a minute and try again.';
        } else if (err.response && err.response.data && err.response.data.error) {
          msg = err.response.data.error;
        } else if (err.message) {
          msg = err.message;
        }
        setChartData(null);
        setError(msg);
      } finally {
        setChartLoading(false);
      }
    };
    fetchChartData();
  }, [id, currency]);

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

  if (error || !coin) {
    return <div className="container mt-5 pt-5 text-danger">{error || 'Coin not found.'}</div>;
  }

  const formatPrice = (price) => {
    if (currency === 'usd') {
      return `$${price?.toLocaleString()}`;
    } else if (currency === 'inr') {
      return `₹${price?.toLocaleString()}`;
    } else if (currency === 'eur') {
      return `€${price?.toLocaleString()}`;
    }
    return price?.toLocaleString();
  };

  const marketData = coin.market_data;

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-light mb-4">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <img src={coin.image?.large} alt={coin.name} className="crypto-details-coin-img me-3" />
                <div>
                  <h2 className="mb-0 fw-bold">{coin.name}</h2>
                  <div className="text-muted">{coin.symbol?.toUpperCase()}</div>
                </div>
              </div>
              <ul className="list-group list-group-flush bg-dark">
                <li className="list-group-item bg-dark text-light">
                  <strong>Market Rank:</strong> {coin.market_cap_rank}
                </li>
                <li className="list-group-item bg-dark text-light">
                  <strong>Current Price:</strong> {formatPrice(marketData?.current_price?.[currency])}
                </li>
                <li className="list-group-item bg-dark text-light">
                  <strong>Market Cap:</strong> {formatPrice(marketData?.market_cap?.[currency])}
                </li>
                <li className="list-group-item bg-dark text-light">
                  <strong>24h High:</strong> {formatPrice(marketData?.high_24h?.[currency])}
                </li>
                <li className="list-group-item bg-dark text-light">
                  <strong>24h Low:</strong> {formatPrice(marketData?.low_24h?.[currency])}
                </li>
              </ul>
            </div>
          </div>
          <div className="card bg-dark text-light mb-4">
            <div className="card-body">
              <h4 className="mb-3">7-Day Price Chart</h4>
              {chartLoading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : chartData ? (
                <div className="crypto-details-chart-container">
                  <Line data={chartData} options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { x: { display: false }, y: { display: true } },
                  }} />
                </div>
              ) : (
                <div className="text-danger">Failed to load chart data.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails; 