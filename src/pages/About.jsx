import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="container mt-5 pt-5 about-page">
      <div className="row">
        <div className="col-12">
          <div className="card bg-dark text-light about-card">
            <div className="card-body">
              <h1 className="text-center mb-4">About CryptoDash</h1>
              
              <div className="row">
                <div className="col-md-8 mx-auto">
                  <h3 className="mb-3">What is CryptoDash?</h3>
                  <p className="lead">
                    CryptoDash is a modern, responsive cryptocurrency price-tracking web application 
                    that helps users monitor live cryptocurrency prices in real-time. Built with a 
                    focus on user experience and clean design, it provides comprehensive market data 
                    without requiring any backend infrastructure or user authentication.
                  </p>
                  
                  <h3 className="mb-3 mt-4">Key Features</h3>
                  <ul className="list-group list-group-flush bg-transparent">
                    <li className="list-group-item bg-transparent text-light border-secondary">
                      <strong>Real-time Data:</strong> Live cryptocurrency prices from CoinGecko API
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary">
                      <strong>Multiple Currencies:</strong> Support for USD, INR, and EUR
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary">
                      <strong>Interactive Charts:</strong> 7-day sparkline charts for price visualization
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary">
                      <strong>Watchlist:</strong> Save favorite cryptocurrencies locally
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary">
                      <strong>Search Functionality:</strong> Filter coins by name or symbol
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary">
                      <strong>Responsive Design:</strong> Works seamlessly on all devices
                    </li>
                  </ul>
                  
                  <h3 className="mb-3 mt-4">Technology Stack</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Frontend</h5>
                      <ul className="list-unstyled">
                        <li>• React.js (.jsx files)</li>
                        <li>• React Router DOM</li>
                        <li>• React Context API</li>
                        <li>• Bootstrap 5</li>
                        <li>• Custom CSS</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h5>Data & Charts</h5>
                      <ul className="list-unstyled">
                        <li>• Axios (HTTP client)</li>
                        <li>• Chart.js</li>
                        <li>• React Chart.js 2</li>
                        <li>• CoinGecko API</li>
                        <li>• LocalStorage</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="mb-3 mt-4">Data Source</h3>
                  <p>
                    All cryptocurrency data is sourced from the CoinGecko API, providing reliable 
                    and up-to-date market information including prices, market capitalization, 
                    trading volume, and price change percentages.
                  </p>
                  
                  <div className="text-center mt-4">
                    <p className="text-muted">
                      This is a portfolio project designed to demonstrate modern web development 
                      skills and cryptocurrency data integration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 