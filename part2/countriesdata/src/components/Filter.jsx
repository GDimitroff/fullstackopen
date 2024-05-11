const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      <form>
        <label htmlFor='country'>find countries </label>
        <input
          id='country'
          name='country'
          type='text'
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Filter;
