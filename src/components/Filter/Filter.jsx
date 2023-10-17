import { FilterContainer, InputItem, LabelInput } from './Filter.styled';

const Filter = ({ stateValue, stateFromFilter }) => {
  const handleChange = evt => {
    stateFromFilter(evt.target.value);
  };

  return (
    <FilterContainer>
      <LabelInput>Find contacts by name</LabelInput>
      {/* <InputItem type="text" value={stateValue} onChange={stateFromFilter} /> */}
      <InputItem type="text" value={stateValue} onChange={handleChange} />
    </FilterContainer>
  );
};
export { Filter };
