import { useState, useEffect } from 'react';

import countryService from './services/countries';
import Filter from './components/Filter';
import Countries from './components/Countries';
import Country from './components/Country';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then((initialCountries) => {
        setCountries(initialCountries);
      })
      .catch((error) => {
        console.log('Error:', error.message);
      });
  }, []);

  const handleFilterChange = (value) => {
    setFilter(value);
    setSelectedCountry(null);
  };

  if (countries === null) return <p>Loading...</p>;

  return (
    <section>
      <Filter
        filter={filter}
        onFilterChange={handleFilterChange}
      />
      {selectedCountry ? (
        <Country country={selectedCountry} />
      ) : (
        <Countries
          countries={countries}
          filter={filter}
          onSelectCountry={(country) => setSelectedCountry(country)}
        />
      )}
    </section>
  );
};

export default App;
