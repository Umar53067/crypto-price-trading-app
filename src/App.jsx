import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCryptoData, setFilteredCryptoData] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(response => {
        setCryptoData(response.data);
      })
      .catch(error => {
        console.error('Error fetching crypto data:', error);
      });
  }, []);

  useEffect(() => {
    setFilteredCryptoData(
      cryptoData.filter(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [cryptoData, searchQuery]);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Crypto Price Tracker</h1>
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            placeholder="Search Cryptocurrency"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-64 px-4 py-2 border border-gray-300 rounded-md mr-4"
          />
        </div>
        {!cryptoData.length && <p className="text-gray-600 mt-4 text-center">Loading...</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCryptoData.map(crypto => (
                <tr key={crypto.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{crypto.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${crypto.current_price}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.price_change_percentage_24h}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${crypto.market_cap}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
