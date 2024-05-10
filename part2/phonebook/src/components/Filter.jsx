const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      filter shown with{' '}
      <input
        type='text'
        name='filter'
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};

export default Filter;
