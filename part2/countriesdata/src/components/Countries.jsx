import { filterCountries } from '../utils/helpers';
import Country from './Country';

const Countries = ({ countries, filter, onSelectCountry }) => {
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
      {filteredCountries.map((country) => (
        <div key={country.name.common}>
          <span>{country.name.common} </span>
          <button onClick={() => onSelectCountry(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
