// This file builds up the UI Page for creating a New listing.
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
import DropzoneComponent from '../components/DropzoneComponent';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/material';

const FlexContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});

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
  backgroundColor: '#f7f7f7',
});

const PostPage = () => {
  const { logout, fetchSession } = useContext(AccountContext);
  const [name, setName] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [currency] = useState('CAD');
  const [condition, setCondition] = useState('');
  const [status] = useState('Available');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [contact, setContact] = useState('');
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSession()
      .then((data) => {
        setName(data['custom:firstname'] + ' ' + data['custom:lastname']);
        setCity(data['custom:city']);
        setCountry(data['custom:country']);
        setContact(data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const onCreateListing = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', name);
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('currency', currency);
    formData.append('city', city);
    formData.append('country', country);
    formData.append('sellerContact1', contact);
    formData.append('productCategory', category);
    formData.append('condition', condition);
    formData.append('status', status);
    files.forEach((file) => formData.append('images', file));

    axios
      .post('listing', formData, {
        mode: 'no-cors',
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 201) {
          axios
            .post(
              'notify',
              {
                topic: category,
                message: `New Post Created in ${category} Category! Please visit fleaMART!`,
              },
              {
                mode: 'no-cors',
              }
            )
            .then((response) => {
              if (response.status === 200) {
                setMessage('Listing Created!');
                setOpen(true);
                setTimeout(() => {
                  navigate('/listings/profile');
                }, 1500);
              }
            })
            .catch((error) => console.log(error));
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
          <Form encType='multipart/form'>
            <Input
              type='text'
              placeholder='Product Name'
              label='Product Name'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <Input
              select
              label='Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <MenuItem value='Furniture'>Furniture</MenuItem>
              <MenuItem value='Electronics'>Electronics</MenuItem>
              <MenuItem value='Others'>Others</MenuItem>
            </Input>
            <Input
              type='text'
              placeholder='Product Description'
              label='Product Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              required
            />
            <FlexContainer>
              <Input
                type='text'
                placeholder='Price'
                label='Price'
                style={{ marginRight: '5px' }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <Input
                type='text'
                placeholder='Currency'
                label='Currency'
                value={currency}
                disabled
                required
              />
            </FlexContainer>
            <Input
              select
              label='Condition'
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              <MenuItem value='New'>New</MenuItem>
              <MenuItem value='Used - Fair'>Used - Fair</MenuItem>
              <MenuItem value='Factory Refurbished'>
                Factory Refurbished
              </MenuItem>
            </Input>
            <FlexContainer>
              <Input
                type='text'
                placeholder='City'
                label='City'
                style={{ marginRight: '5px' }}
                value={city}
                disabled
                required
              />
              <Input
                type='text'
                placeholder='Country'
                label='Country'
                value={country}
                disabled
                required
              />
            </FlexContainer>
            <DropzoneComponent files={files} setFiles={setFiles} />
            <SubmitButton variant='contained' onClick={onCreateListing}>
              CREATE LISTING
            </SubmitButton>
          </Form>
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

export default PostPage;
