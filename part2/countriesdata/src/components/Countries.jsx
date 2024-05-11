import { filterCountries } from '../utils/helpers';
import Country from './Country';

const Countries = ({ countries, filter }) => {
  const filteredCountries = filterCountries(countries, filter);

  if (filter.trim().length === 0) {
    return null;
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  }

  if (filteredCountries.length > 10) {
    return 'Too many matches, specify another filter';
  }

  return (
    <div>
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
