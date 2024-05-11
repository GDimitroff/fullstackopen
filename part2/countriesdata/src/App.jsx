import { useState, useEffect } from 'react';

import countryService from './services/countries';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  if (countries === null) return <p>Loading...</p>;

  return (
    <section>
      <Filter
        filter={filter}
        onFilterChange={setFilter}
      />
      <Countries
        countries={countries}
        filter={filter}
      />
    </section>
  );
};

export default App;
