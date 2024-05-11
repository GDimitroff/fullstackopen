export const filterCountries = (countries, filter) => {
  if (filter.trim().length === 0) return countries;

  return countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
};
