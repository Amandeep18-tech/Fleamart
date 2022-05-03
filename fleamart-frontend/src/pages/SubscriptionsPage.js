// This file builds up the UI Page for showing the subscriptions for the signed in user
import React, { useState } from 'react';
import axios from '../AxiosConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useContext } from 'react';
import { AccountContext } from '../Account';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Sidebar from '../components/Sidebar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/material';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';

const Form = styled('form')({
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '0 50px',
  textAlign: 'center',
  height: 'auto',
});

const Input = styled(TextField)({
  margin: '8px 0px',
  width: '100%',
});

const SubmitButton = styled(Button)({
  border: '1px solid #00c6ff',
  backgroundColor: '#0072ff',
  color: '#ffffff',
  width: '100%',
  margin: '5vh 0vh',
});

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
  backgroundColor: '#ffffff',
});

const SubscriptionsPage = () => {
  const { logout, fetchSession } = useContext(AccountContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const allCategories = ['Furniture', 'Electronics', 'Others'];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchSession()
      .then((data) => {
        setName(data['custom:firstname'] + ' ' + data['custom:lastname']);
        setEmail(data.email);
        loadSubscriptions(data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const loadSubscriptions = async (email) => {
    setLoading(true);
    try {
      const response = await axios.get(`topics?email=${email}`, {
        mode: 'no-cors',
      });

      if (response.status === 200) {
        setSubscriptions(response.data.topics);
        let temp = allCategories;
        temp = temp.filter((item) => !response.data.topics.includes(item));
        setCategories(temp);
      }
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  const handleSubscribe = (e) => {
    e.preventDefault();
    axios
      .post(
        'subscribe',
        { email: email, topic: category },
        {
          mode: 'no-cors',
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setMessage(
            'Subscription Added! Please check your mail and Confirm it'
          );
          setOpen(true);
          loadSubscriptions(email);
          setCategory('');
        }
      })
      .catch((error) => console.log(error));
  };

  const handleUnSubscribe = (i) => {
    axios
      .post(
        'unsubscribe',
        { email: email, topic: subscriptions[i] },
        {
          mode: 'no-cors',
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setMessage('Subscription Removed!');
          setOpen(true);
          loadSubscriptions(email);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <Navbar name={name} logout={logout} />
      <Container>
        <Sidebar sx={{ gridColumn: '1 / span 1' }} />
        <Main>
          {loading && <div>Loading</div>}
          {!loading &&
            subscriptions.map((subscription, i) => {
              return (
                <Card
                  key={i}
                  sx={{ display: 'flex', padding: '0 5vh', margin: '2vh 5vh' }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {subscription}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <SubmitButton
                      variant='contained'
                      onClick={() => handleUnSubscribe(i)}
                    >
                      UnSubscribe
                    </SubmitButton>
                  </CardActions>
                </Card>
              );
            })}
          {categories.length !== 0 ? (
            <Form>
              <Typography
                sx={{ margin: '5vh' }}
                gutterBottom
                variant='h5'
                component='div'
              >
                Add Subscriptions
              </Typography>
              <Input
                select
                label='Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categories.map((item, i) => {
                  return (
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Input>
              <SubmitButton variant='contained' onClick={handleSubscribe}>
                SUBSCRIBE
              </SubmitButton>
            </Form>
          ) : null}
        </Main>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={action}
        />
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default SubscriptionsPage;
