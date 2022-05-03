// This file builds up the UI Page for showing the details of a particular Listing
import React from 'react';
import { styled } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../Account';
import Carousel from 'react-material-ui-carousel';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Description from '../components/Description';
import { useParams } from 'react-router-dom';
import axios from '../AxiosConfig';

const Container = styled('div')({
  display: 'grid',
  height: '100vh',
  gridTemplateColumns: '1fr 3fr',
  textAlign: 'center',
});

const ListingPage = () => {
  const { logout, fetchSession } = useContext(AccountContext);
  const [name, SetName] = useState('');
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState({});

  useEffect(() => {
    fetchSession()
      .then(async (data) => {
        SetName(data['custom:firstname'] + ' ' + data['custom:lastname']);
        try {
          const response = await axios.get(`listing/${params.id}`);
          setListing(response.data.bodyObject);
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
      {loading && <div>Loading</div>}
      {!loading && (
        <Container>
          <Description listing={listing} sx={{ gridColumn: '1 / span 1' }} />
          <Carousel
            sx={{ gridColumn: '2 / span 1', backgroundColor: '#f7f7f7' }}
            navButtonsAlwaysVisible={true}
            indicators={false}
            autoPlay={false}
          >
            {listing.imageUrls.map((image, i) => (
              <img
                key={i}
                style={{
                  maxHeight: '100vh',
                  maxWidth: '100%',
                  padding: '10vh',
                }}
                src={image.url}
              />
            ))}
          </Carousel>
        </Container>
      )}

      <Footer />
    </React.Fragment>
  );
};

export default ListingPage;
