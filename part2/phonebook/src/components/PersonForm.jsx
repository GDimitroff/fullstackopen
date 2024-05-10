const PersonForm = ({
  newName,
  newNumber,
  onNewNameChange,
  onNewNumberChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{' '}
        <input
          name='name'
          type='text'
          value={newName}
          onChange={onNewNameChange}
        />
      </div>
      <div>
        number:{' '}
        <input
          name='number'
          type='tel'
          value={newNumber}
          onChange={onNewNumberChange}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
