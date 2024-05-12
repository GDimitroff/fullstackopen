import Weather from './Weather';

const Country = ({ country }) => {
  const countryName = country.name.common;
  const capital = country.capital[0];

  return (
    <div>
      <div>
        <h1>{countryName}</h1>
        <div>capital {capital}</div>
        <div>area {country.area}</div>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={`Flag of ${countryName}`}
          width='100'
        />
      </div>
      <Weather location={capital} />
    </div>
  );
};

export default Country;
