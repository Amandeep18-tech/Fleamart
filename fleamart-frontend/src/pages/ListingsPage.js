// This file builds up the UI Page for showing the details of all listings in a particular geographical location.
import React from 'react';
import Filters from '../components/Filters';
import { styled } from '@mui/system';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import PostGrid from '../components/PostGrid';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../Account';
import axios from '../AxiosConfig';

const Container = styled('div')({
  display: 'grid',
  height: 'auto',
  gridTemplateColumns: '1fr 3fr',
  textAlign: 'center',
  gridGap: '0.25rem',
  boxShadow: '0 0 6px hsl(210 14% 90%)',
  minHeight: '100vh',
});

const Main = styled('main')({
  gridColumn: '2 / span 1',
  backgroundColor: '#f7f7f7',
});

const HomePage = () => {
  const { logout, fetchSession } = useContext(AccountContext);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    fetchSession()
      .then(async (data) => {
        setName(data['custom:firstname'] + ' ' + data['custom:lastname']);
        setCity(data['custom:city']);
        setCountry(data['custom:country']);
        setLoading(true);
        try {
          const response = await axios.get(
            `listing?status=Available&country=${data['custom:country']}&city=${data['custom:city']}`
          );
          setListings(response.data.bodyObject);
          setFilteredListings(response.data.bodyObject);
        } catch (error) {
          console.error(error.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Navbar name={name} logout={logout} />
      <Container>
        <Sidebar sx={{ gridColumn: '1 / span 1' }} />
        <Main>
          <Filters
            location={city + ', ' + country}
            listings={listings}
            setFilteredListings={setFilteredListings}
          />
          {loading && <div>Loading</div>}
          {!loading && <PostGrid listings={filteredListings} />}
        </Main>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
