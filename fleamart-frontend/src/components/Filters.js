import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useState } from 'react';

const FilterContainer = styled('section')({
  display: 'flex',
  justifyContent: 'space-between',
  height: '10vh',
});

const Filter = styled('div')({ display: 'flex' });

const Input = styled(TextField)({
  flex: 1,
  width: '150px',
  backgroundColor: 'white',
  margin: '10px',
});

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  margin: '40px 20px',
  borderRadius: '10px',
  backgroundColor: 'white',
});

const Filters = ({ location, listings, setFilteredListings }) => {
  const [category, setCategory] = useState('All');

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== 'All') {
      const filteredListings = listings.filter(
        (listings) => listings.productCategory === e.target.value
      );
      setFilteredListings(filteredListings);
    } else {
      setFilteredListings(listings);
    }
  };

  return (
    <FilterContainer>
      <Filter>
        <Input
          select
          value={category}
          label='Category'
          onChange={handleChangeCategory}
        >
          <MenuItem value='All'>All</MenuItem>
          <MenuItem value='Furniture'>Furniture</MenuItem>
          <MenuItem value='Electronics'>Electronics</MenuItem>
          <MenuItem value='Others'>Others</MenuItem>
        </Input>
      </Filter>
      <Filter>
        <FlexContainer>
          <LocationOnOutlinedIcon sx={{ width: '30px', height: '30px' }} />
          <MenuItem>{location}</MenuItem>
        </FlexContainer>
      </Filter>
    </FilterContainer>
  );
};

export default Filters;
