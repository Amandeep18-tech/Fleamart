// This file builds up the UI Page for showing the listings created by the signed in user.
import React from 'react';
import { styled } from '@mui/system';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import MyPostGrid from '../components/MyPostGrid';
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

const ListingsPage = () => {
  const { logout, fetchSession } = useContext(AccountContext);
  const [name, SetName] = useState('');
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchSession()
      .then(async (data) => {
        SetName(data['custom:firstname'] + ' ' + data['custom:lastname']);
        try {
          const response = await axios.get(
            `listing/user/${
              data['custom:firstname'] + ' ' + data['custom:lastname']
            }`
          );
          setListings(response.data.bodyObject);
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
          {loading && <div>Loading</div>}
          {!loading && <MyPostGrid listings={listings} />}
        </Main>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default ListingsPage;
