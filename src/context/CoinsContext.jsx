import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CoinsContext = createContext();

export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (!context) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
};

export const CoinsProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialized, setInitialized] = useState(false); // Track if initial load is done

  // Initial fetch on mount
  useEffect(() => {
    fetchAllCoins(1, 'usd');
  }, []); // Empty dependency array for initial load only

  const fetchAllCoins = async (page = 1, currency = 'usd') => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: currency,
            order: 'market_cap_desc',
            per_page: 100, // Fetch more coins per page
            page: page,
            sparkline: false,
          },
        }
      );

      if (page === 1) {
        setAllCoins(response.data);
      } else {
        setAllCoins(prev => [...prev, ...response.data]);
      }

      setHasMore(response.data.length === 100);
      setCurrentPage(page);
      if (page === 1) {
        setInitialized(true);
      }
    } catch (error) {
      console.error('Error fetching all coins:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchCoins = (searchTerm) => {
    if (!searchTerm.trim()) return [];
    
    return allCoins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const loadMoreCoins = (currency = 'usd') => {
    if (!loading && hasMore) {
      fetchAllCoins(currentPage + 1, currency);
    }
  };

  const value = {
    allCoins,
    loading,
    hasMore,
    initialized,
    fetchAllCoins,
    searchCoins,
    loadMoreCoins,
  };

  return (
    <CoinsContext.Provider value={value}>
      {children}
    </CoinsContext.Provider>
  );
}; 